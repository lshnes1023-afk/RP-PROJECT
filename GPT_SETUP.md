# GPT Integration Setup

이 프로젝트에서 GPT 기반 RP 연습실을 붙이려면 정적 GitHub Pages만으로는 부족합니다.
OpenAI API Key를 브라우저에 넣으면 노출되므로, 반드시 서버 API를 한 겹 두어야 합니다.

## 1. 환경변수

로컬 개발용 `.env` 파일:

```env
OPENAI_API_KEY=replace_with_your_openai_api_key
OPENAI_MODEL=gpt-5-nano
OPENAI_RP_SYSTEM_PROMPT=You are an AI customer for Korean insurance roleplay practice. Stay realistic, ask follow-up questions, and give concise coaching feedback after the user responds.
```

실제 키는 GitHub에 올리지 않습니다.

## 2. 권장 구조

```text
사용자 브라우저
-> /api/rp-practice
-> OpenAI Responses API
-> AI 고객 응답과 코칭 결과 반환
```

## 3. 서버 API 예시

Vercel 또는 Next.js API Route에서 사용하는 형태:

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { rpTitle, scenario, userMessage } = await request.json();

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5-nano",
    instructions: process.env.OPENAI_RP_SYSTEM_PROMPT,
    input: `
RP 제목: ${rpTitle}
상황: ${scenario}
사용자 답변: ${userMessage}

AI 고객 역할로 자연스럽게 응답하고, 마지막에 상담 피드백을 짧게 제공해줘.
`,
  });

  return Response.json({
    reply: response.output_text,
  });
}
```

## 4. 다음 구현 순서

1. GitHub Pages에서 Vercel 또는 Next.js 배포로 전환
2. `/api/rp-practice` 서버 API 생성
3. OpenAI API Key를 Vercel 환경변수에 등록
4. 현재 AI 연습실 UI에서 `/api/rp-practice` 호출
5. Supabase에 연습 기록과 피드백 저장
6. 이후 Realtime API로 음성 RP 연습 확장
