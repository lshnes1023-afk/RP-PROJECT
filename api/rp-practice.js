const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(raw || "{}");
}

function cleanText(value, maxLength = 1800) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function buildPersonaLine(persona = {}) {
  const gender = persona.genderText || (persona.gender === "male" ? "남성" : "여성");
  const age = persona.ageText || (persona.age ? `${persona.age}대` : "30대");
  const mood = persona.moodText || persona.description || "보험 상담에 신중한 고객";

  return `${gender} ${age}, 현재 반응: ${mood}`;
}

function buildPrompt(body) {
  const facts = Array.isArray(body.materialFacts) ? body.materialFacts.map((item) => `- ${cleanText(item, 240)}`).join("\n") : "";
  const goals = Array.isArray(body.learningGoals) ? body.learningGoals.map((item) => `- ${cleanText(item, 240)}`).join("\n") : "";
  const questions = Array.isArray(body.keyQuestions) ? body.keyQuestions.map((item) => `- ${cleanText(item, 240)}`).join("\n") : "";
  const history = Array.isArray(body.history)
    ? body.history
        .slice(-8)
        .map((item) => `${cleanText(item.role, 30)}: ${cleanText(item.text, 400)}`)
        .join("\n")
    : "";

  return `
RP 제목: ${cleanText(body.rpTitle, 120)}
교육 주제: ${cleanText(body.scenario, 900)}
AI 고객 페르소나: ${buildPersonaLine(body.persona)}

교육 목표:
${goals || "- 고객의 걱정을 인정하고 질문으로 상담을 이어간다."}

상담자가 활용해야 할 질문 방향:
${questions || "- 고객이 무엇을 걱정하는지 확인한다."}

팩트체크 기준:
${facts || "- 상품명, 보장 금액, 보험료는 단정하지 않는다. 실제 약관과 산출 기준 확인을 전제로 말한다."}

이전 대화:
${history || "아직 이전 대화가 없습니다."}

상담자 발화:
${cleanText(body.userMessage, 1200)}
`;
}

function buildInstructions(persona) {
  const basePrompt =
    process.env.OPENAI_RP_SYSTEM_PROMPT ||
    "You are an AI customer for Korean insurance roleplay practice. Stay realistic, ask follow-up questions, and provide concise coaching feedback.";

  return `${basePrompt}

역할:
- 너는 보험을 배우는 상담자를 상대하는 한국어 RP 고객이다.
- 상담자가 말하면 실제 고객처럼 짧게 반응하고, 필요하면 의문이나 걱정을 이어서 말한다.
- 성별, 나이대, 반응 성향은 이 페르소나를 따른다: ${buildPersonaLine(persona)}

응답 규칙:
- reply는 고객의 말만 작성한다. 상담자나 강사처럼 설명하지 않는다.
- coaching은 상담자에게 주는 짧은 피드백이다.
- 보험 상품명, 보험료, 보장 금액, 지급 가능성을 확정적으로 말하지 않는다.
- 고객에게 과장된 불안감을 주거나 가입을 압박하지 않는다.
- 한국어로 답한다.
- JSON만 반환한다.`;
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string") {
    return payload.output_text.trim();
  }

  const chunks = [];

  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

function parseModelJson(text) {
  const trimmed = text.trim();
  const withoutFence = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

  try {
    return JSON.parse(withoutFence);
  } catch (error) {
    return {
      reply: withoutFence,
      coaching: "응답은 받았지만 코칭 형식이 맞지 않아 고객 답변만 표시했습니다.",
      nextFocus: "고객의 걱정을 인정하고 다음 질문으로 연결하기",
    };
  }
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, { error: "method_not_allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return sendJson(res, 503, {
      error: "missing_openai_api_key",
      message: "OPENAI_API_KEY 환경변수가 서버에 설정되어 있지 않습니다.",
    });
  }

  try {
    const body = await readJsonBody(req);

    if (!cleanText(body.userMessage, 1200)) {
      return sendJson(res, 400, { error: "missing_user_message" });
    }

    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-nano",
        instructions: buildInstructions(body.persona),
        input: buildPrompt(body),
        max_output_tokens: 700,
        text: {
          format: {
            type: "json_schema",
            name: "rp_practice_response",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                reply: {
                  type: "string",
                  description: "AI 고객이 상담자에게 하는 실제 고객 발화",
                },
                coaching: {
                  type: "string",
                  description: "상담자에게 주는 짧은 코칭 피드백",
                },
                nextFocus: {
                  type: "string",
                  description: "다음 턴에서 상담자가 집중할 포인트",
                },
              },
              required: ["reply", "coaching", "nextFocus"],
            },
          },
          verbosity: "low",
        },
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return sendJson(res, response.status, {
        error: "openai_error",
        message: payload.error?.message || "OpenAI 응답 생성에 실패했습니다.",
      });
    }

    const result = parseModelJson(extractOutputText(payload));

    return sendJson(res, 200, {
      reply: cleanText(result.reply, 700),
      coaching: cleanText(result.coaching, 700),
      nextFocus: cleanText(result.nextFocus, 300),
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: "rp_practice_failed",
      message: "AI 고객 응답 처리 중 오류가 발생했습니다.",
    });
  }
};
