# GPT Integration Setup

이 프로젝트의 AI RP 연습실은 두 단계로 동작합니다.

1. GitHub Pages: 정적 사이트라서 OpenAI 키를 숨길 서버가 없습니다. 그래서 데모 고객 응답으로 연습합니다.
2. Vercel 같은 서버 API 배포: `api/rp-practice.js`가 OpenAI Responses API를 호출해 실제 GPT 고객 응답을 반환합니다.

OpenAI API 키는 절대 브라우저 코드나 GitHub 저장소에 넣지 않습니다.

## 1. 환경변수

로컬 개발용 `.env` 파일에는 아래 값을 둡니다.

```env
OPENAI_API_KEY=replace_with_your_openai_api_key
OPENAI_MODEL=gpt-5-nano
OPENAI_RP_SYSTEM_PROMPT=You are an AI customer for Korean insurance roleplay practice. Stay realistic, ask follow-up questions, and provide concise coaching feedback.
```

실제 키가 들어간 `.env`는 `.gitignore`에 포함되어 GitHub에 올라가지 않습니다.

## 2. 현재 연결 구조

```text
AI RP 연습실 화면
-> POST api/rp-practice
-> OpenAI Responses API
-> { reply, coaching, nextFocus } 반환
```

GitHub Pages에서는 `api/rp-practice`가 존재하지 않으므로 자동으로 데모 고객 응답으로 전환됩니다.

## 3. 실제 GPT 고객으로 배포하는 방법

1. GitHub 저장소를 Vercel에 연결합니다.
2. Vercel 프로젝트의 Environment Variables에 `OPENAI_API_KEY`와 `OPENAI_MODEL`을 등록합니다.
3. 배포 후 AI RP 연습실에서 고객 성별, 나이대, 반응을 선택합니다.
4. 상담자 답변을 입력하면 `api/rp-practice.js`가 GPT 고객 응답과 코칭을 반환합니다.

## 4. 개발 메모

- 서버 함수: `api/rp-practice.js`
- 프론트 연결: `app.js`의 `requestAiCustomerReply()`
- 기본 모델: `OPENAI_MODEL`이 없으면 `gpt-5-nano`
- 비용 관리를 위해 `max_output_tokens`를 낮게 두고, 응답은 짧은 고객 발화와 짧은 코칭으로 제한합니다.
