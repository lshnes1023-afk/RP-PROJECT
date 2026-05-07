const navItems = document.querySelectorAll(".nav-item");
const searchInput = document.querySelector("#searchInput");
const resetSearch = document.querySelector("#resetSearch");
const scenarioList = document.querySelector("#scenarioList");
const uploadForm = document.querySelector("#uploadForm");
const uploadNote = document.querySelector("#uploadNote");
const commentForm = document.querySelector("#commentForm");
const discussionList = document.querySelector("#discussionList");
const practiceButton = document.querySelector("#practiceButton");
const coachFeed = document.querySelector("#coachFeed");
const toast = document.querySelector("#toast");

const detailTitle = document.querySelector("#detailTitle");
const detailStatus = document.querySelector("#detailStatus");
const detailTags = document.querySelector("#detailTags");
const detailSummary = document.querySelector("#detailSummary");
const detailQuote = document.querySelector("#detailQuote");
const detailFacts = document.querySelector("#detailFacts");
const detailFlow = document.querySelector("#detailFlow");
const detailScript = document.querySelector("#detailScript");
const materialImage = document.querySelector("#materialImage");
const materialBadge = document.querySelector("#materialBadge");
const materialTitle = document.querySelector("#materialTitle");
const materialCaption = document.querySelector("#materialCaption");
const materialPoints = document.querySelector("#materialPoints");
const factCheckScore = document.querySelector("#factCheckScore");
const factChecks = document.querySelector("#factChecks");
const sendToAi = document.querySelector("#sendToAi");
const goDiscussion = document.querySelector("#goDiscussion");

const rpLibrary = {
  "insurance-basics": {
    title: "보험이란 무엇일까요?",
    status: "문서 기반 예시",
    tags: ["보험 기초", "고객 공감 도입", "초급", "자산/건강 리스크"],
    summary:
      "보험을 보이지 않는 약속으로 설명하고, 고객이 체감하기 쉬운 화재·질병 사례를 통해 보험의 필요성을 이해하도록 돕는 RP입니다.",
    quote:
      "보험은 배송되는 물건이 아니라 보이지 않는 약속을 사는 것입니다. 그래서 가입해놓고도 왜 필요했는지 잊기 쉽습니다.",
    facts: [
      "보험은 감당하기 어려운 리스크를 미리 준비하는 장치라는 관점으로 설명합니다.",
      "리스크를 자산 리스크와 건강 리스크로 나누면 고객 이해도가 높아집니다.",
      "건강보험의 진단비는 병원비뿐 아니라 소득 공백과 가족 생활비를 지키는 긴급 자금으로 설명할 수 있습니다.",
      "보험료와 보장 예시는 상품, 담보, 연령, 직업, 고지사항에 따라 달라지므로 실제 제안 전에는 반드시 산출 기준을 확인해야 합니다.",
    ],
    flow: [
      "도입: 보험이 정말 필요한지 고객이 가진 의문을 먼저 인정합니다.",
      "자산 리스크: 화재, 자연재해, 배상 책임처럼 한 번에 큰돈이 필요한 상황을 제시합니다.",
      "건강 리스크: 암, 뇌출혈, 급성 심근경색처럼 치료비와 소득 공백이 동시에 생기는 상황을 설명합니다.",
      "원리 설명: 여러 사람이 조금씩 모아 큰 사고를 겪은 사람을 돕는 공동부담 구조를 짚습니다.",
      "마무리: 보험은 불행을 막는 상품이 아니라 경제적 붕괴를 막는 안전장치라고 정리합니다.",
    ],
    script: [
      { speaker: "고객", text: "보험이 꼭 필요한 건가요? 당장 없어도 큰일 나는 건 아니잖아요." },
      { speaker: "상담자", text: "맞습니다. 보험은 눈에 보이는 물건이 아니라, 큰 변수가 생겼을 때 내 가족의 생활을 지키는 약속에 가깝습니다." },
      { speaker: "상담자", text: "예를 들어 집에 화재가 나거나, 갑자기 암 진단으로 일을 쉬게 되면 치료비보다 더 무서운 게 생활비 공백입니다." },
    ],
    material: {
      badge: "보험 기초 자료",
      image:
        "https://images.pexels.com/photos/7731373/pexels-photo-7731373.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "가족의 재무 상담 장면",
      title: "보험은 보이지 않는 약속을 시각화하는 상담입니다",
      caption:
        "고객이 보험을 상품이 아닌 리스크 관리 장치로 이해하도록, 자산 리스크와 건강 리스크를 한 화면에서 비교합니다.",
      points: ["자산 리스크: 화재, 자연재해, 배상 책임", "건강 리스크: 치료비와 소득 공백", "핵심 메시지: 가족 경제를 지키는 안전장치"],
    },
    checks: [
      { level: "확인", title: "문서 기반", text: "업로드한 Word 문서의 핵심 문장을 바탕으로 요약했습니다." },
      { level: "주의", title: "보험료 예시", text: "월 보험료와 보장 금액은 상품, 연령, 담보, 직업, 고지사항에 따라 달라질 수 있습니다." },
      { level: "보강", title: "공식 근거", text: "다음 단계에서는 생명보험협회·손해보험협회 등 공식 자료 링크를 팩트체크에 연결할 수 있습니다." },
    ],
    checkScore: "자료 기반",
    aiPrompt:
      "고객이 '보험이 꼭 필요한가요?'라고 묻는 상황으로 시작해 자산 리스크와 건강 리스크를 쉽게 설명하는 연습을 진행합니다.",
  },
  "needs-discovery": {
    title: "신규 고객 니즈 환기 RP",
    status: "샘플 시나리오",
    tags: ["보장 분석", "중급", "질문 흐름"],
    summary:
      "처음 만난 고객이 자신의 보장 공백을 스스로 말하도록 질문 순서를 설계하는 RP입니다.",
    quote: "지금 가입한 보험이 충분한지보다, 어떤 상황이 오면 가장 걱정되는지를 먼저 여쭤보겠습니다.",
    facts: [
      "초기 상담에서는 상품 설명보다 고객의 걱정, 가족 구조, 소득 공백 가능성을 먼저 확인합니다.",
      "기존 증권 분석 전에는 고객이 느끼는 우선순위를 정리해야 상담 몰입도가 올라갑니다.",
      "질문은 넓게 시작해 생활비, 치료비, 부채, 가족 책임 순서로 좁혀가는 방식이 좋습니다.",
    ],
    flow: [
      "현재 가장 걱정되는 재무 상황을 묻습니다.",
      "가족에게 영향을 줄 수 있는 소득 공백 기간을 상상하게 합니다.",
      "기존 보장에 대한 확신 정도를 확인합니다.",
      "증권 분석의 필요성을 고객 언어로 정리합니다.",
    ],
    script: [
      { speaker: "상담자", text: "가장 먼저 여쭤보고 싶은 건 가입한 상품명이 아니라, 어떤 상황이 가장 걱정되시는지입니다." },
      { speaker: "고객", text: "아프면 병원비도 걱정이고, 일을 못 하면 생활비도 걱정이죠." },
      { speaker: "상담자", text: "그 두 가지를 기준으로 지금 보장이 충분한지 같이 확인해보겠습니다." },
    ],
    material: {
      badge: "니즈 분석 자료",
      image:
        "https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "상담자가 고객과 자료를 검토하는 장면",
      title: "질문은 상품이 아니라 걱정에서 시작합니다",
      caption: "고객의 가족 구조, 소득 책임, 치료비 걱정을 먼저 정리하면 보장 분석의 설득력이 커집니다.",
      points: ["가족 책임 확인", "소득 공백 기간 질문", "기존 보장 확신도 점검"],
    },
    checks: [
      { level: "확인", title: "상담 흐름", text: "상품 설명 전 고객 상황 확인을 우선하는 구조입니다." },
      { level: "주의", title: "개인정보", text: "건강 정보와 가족 정보는 동의와 보안 기준을 지켜 수집해야 합니다." },
      { level: "보강", title: "자료 연결", text: "향후 증권 이미지와 보장 분석표를 함께 표시할 수 있습니다." },
    ],
    checkScore: "상담 기준",
    aiPrompt: "신규 고객이 보장 분석에 소극적인 상황에서 니즈를 환기하는 질문 연습을 진행합니다.",
  },
  "objection-steps": {
    title: "거절 처리 3단계 스크립트",
    status: "샘플 시나리오",
    tags: ["거절 처리", "고급", "상담 전환"],
    summary:
      "고객이 보험료 부담, 생각해보겠다는 반응, 가족과 상의하겠다는 반응을 보일 때 대화를 끊지 않는 RP입니다.",
    quote: "그렇게 느끼시는 게 당연합니다. 그럼 부담되는 지점이 금액인지, 필요성인지 먼저 나눠서 봐도 될까요?",
    facts: [
      "거절 처리의 첫 단계는 반박이 아니라 감정 인정입니다.",
      "거절 사유를 금액, 필요성, 신뢰, 타이밍으로 구분하면 다음 질문이 명확해집니다.",
      "대안 제시는 고객의 우선순위를 다시 확인한 뒤 최소 보장부터 설계하는 흐름이 안정적입니다.",
    ],
    flow: [
      "고객 반응을 그대로 인정합니다.",
      "부담의 원인을 한 문장 질문으로 분류합니다.",
      "가장 중요한 위험부터 다시 우선순위를 잡습니다.",
      "선택 가능한 대안을 제시하고 다음 행동을 합의합니다.",
    ],
    script: [
      { speaker: "고객", text: "보험료가 부담돼서 조금 더 생각해보고 싶어요." },
      { speaker: "상담자", text: "그렇게 느끼실 수 있습니다. 부담되는 부분이 금액인지, 필요성인지 먼저 나눠서 봐도 될까요?" },
      { speaker: "상담자", text: "가장 지키고 싶은 위험부터 남기고, 우선순위가 낮은 부분은 조정해보겠습니다." },
    ],
    material: {
      badge: "거절 처리 자료",
      image:
        "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "상담 중 메모를 확인하는 장면",
      title: "거절은 반대가 아니라 추가 질문의 신호입니다",
      caption: "감정 인정, 사유 분류, 우선순위 재정렬 순서로 상담의 흐름을 유지합니다.",
      points: ["감정 인정", "거절 사유 분류", "대안 제시와 다음 행동 합의"],
    },
    checks: [
      { level: "확인", title: "대화 원칙", text: "반박보다 인정과 분류 질문을 앞세우는 구조입니다." },
      { level: "주의", title: "불완전판매 방지", text: "부담을 낮추기 위해 핵심 보장을 과도하게 축소하지 않도록 주의해야 합니다." },
      { level: "보강", title: "관리자 검수", text: "실제 적용 전 금지 표현과 설명 의무 항목을 검수할 수 있습니다." },
    ],
    checkScore: "검수 필요",
    aiPrompt: "고객이 '보험료가 부담됩니다'라고 말하는 상황에서 감정 인정 후 질문으로 전환하는 연습을 진행합니다.",
  },
  "final-check": {
    title: "계약 전 최종 확인 콜",
    status: "샘플 시나리오",
    tags: ["마감 상담", "초급", "확인 콜"],
    summary:
      "가입 전 고객이 마지막으로 이해해야 할 보장 목적, 납입 여력, 고지사항, 유지 계획을 점검하는 RP입니다.",
    quote: "오늘은 가입을 서두르기보다, 이 보장이 어떤 상황을 막기 위한 것인지 마지막으로 확인하겠습니다.",
    facts: [
      "계약 전 확인은 상품 장점 반복보다 고객 이해 여부 확인이 우선입니다.",
      "고지사항, 납입 기간, 보험료 유지 가능성은 반드시 고객 언어로 재확인해야 합니다.",
      "마지막 콜은 고객이 스스로 선택 이유를 말할 수 있게 만드는 것이 목표입니다.",
    ],
    flow: [
      "가입 목적을 고객 말로 다시 확인합니다.",
      "보장 범위와 제외될 수 있는 상황을 쉬운 말로 점검합니다.",
      "보험료 유지 가능성과 납입 계획을 확인합니다.",
      "고객의 최종 질문을 받고 다음 절차를 안내합니다.",
    ],
    script: [
      { speaker: "상담자", text: "오늘은 가입을 서두르기보다, 이 보장이 어떤 상황을 막기 위한 것인지 마지막으로 확인하겠습니다." },
      { speaker: "고객", text: "제가 이해한 게 맞는지 다시 한번 듣고 싶어요." },
      { speaker: "상담자", text: "좋습니다. 보장 목적, 납입 계획, 고지사항 순서로 짧게 정리해드리겠습니다." },
    ],
    material: {
      badge: "마감 상담 자료",
      image:
        "https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "계약 전 문서를 확인하는 장면",
      title: "계약 전에는 고객의 이해를 먼저 확인합니다",
      caption: "보장 목적, 제외될 수 있는 상황, 납입 여력을 고객 언어로 다시 정리하는 마지막 체크 화면입니다.",
      points: ["가입 목적 재확인", "보장 범위와 유의사항 점검", "납입 유지 가능성 확인"],
    },
    checks: [
      { level: "확인", title: "설명 의무", text: "계약 전 중요 사항을 다시 확인하는 흐름입니다." },
      { level: "주의", title: "고지사항", text: "건강 상태, 직업, 병력 등 고지사항은 실제 절차에 맞춰 정확히 확인해야 합니다." },
      { level: "보강", title: "체크리스트", text: "향후 전자서명 전 확인 체크리스트와 연결할 수 있습니다." },
    ],
    checkScore: "절차 기반",
    aiPrompt: "계약 전 고객이 불안해하는 상황에서 보장 목적과 유지 계획을 차분히 확인하는 연습을 진행합니다.",
  },
};

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 3600);
}

function replaceList(list, values) {
  list.replaceChildren();

  values.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    list.append(item);
  });
}

function renderTags(tags) {
  detailTags.replaceChildren();

  tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    detailTags.append(chip);
  });
}

function renderScript(lines) {
  detailScript.replaceChildren();

  lines.forEach((line) => {
    const row = document.createElement("p");
    const speaker = document.createElement("strong");
    speaker.textContent = line.speaker;
    row.append(speaker, line.text);
    detailScript.append(row);
  });
}

function renderMaterial(material) {
  materialImage.src = material.image;
  materialImage.alt = material.alt;
  materialBadge.textContent = material.badge;
  materialTitle.textContent = material.title;
  materialCaption.textContent = material.caption;
  replaceList(materialPoints, material.points);
}

function renderChecks(checks, score) {
  factChecks.replaceChildren();
  factCheckScore.textContent = score;

  checks.forEach((check) => {
    const item = document.createElement("article");
    const level = document.createElement("span");
    const title = document.createElement("strong");
    const text = document.createElement("p");

    level.textContent = check.level;
    title.textContent = check.title;
    text.textContent = check.text;
    item.append(level, title, text);
    factChecks.append(item);
  });
}

function setActiveRp(id) {
  document.querySelectorAll(".scenario-card, .featured-rp").forEach((card) => {
    card.classList.toggle("active", card.dataset.rpId === id);
  });
}

function renderRpDetail(id, shouldScroll = true) {
  const detail = rpLibrary[id];

  if (!detail) {
    showToast("아직 상세 내용이 연결되지 않은 RP입니다.");
    return;
  }

  detailTitle.textContent = detail.title;
  detailStatus.textContent = detail.status;
  detailSummary.textContent = detail.summary;
  detailQuote.textContent = detail.quote;
  renderTags(detail.tags);
  replaceList(detailFacts, detail.facts);
  replaceList(detailFlow, detail.flow);
  renderScript(detail.script);
  renderMaterial(detail.material);
  renderChecks(detail.checks, detail.checkScore);
  setActiveRp(id);

  sendToAi.dataset.rpId = id;

  if (shouldScroll) {
    document.querySelector("#rpDetail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((button) => button.classList.remove("active"));
    item.classList.add("active");

    const target = item.dataset.target;
    if (target) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

document.addEventListener("click", (event) => {
  const notice = event.target.closest(".notice-trigger");
  if (notice) {
    showToast(notice.dataset.notice);
    return;
  }

  const opener = event.target.closest(".rp-open");
  if (opener) {
    renderRpDetail(opener.dataset.rpId);
    return;
  }

  const card = event.target.closest(".scenario-card[data-rp-id], .featured-rp[data-rp-id]");
  if (card && !event.target.closest("a, button, input, select, textarea")) {
    renderRpDetail(card.dataset.rpId);
  }
});

function filterScenarios(value) {
  const query = value.trim().toLowerCase();

  document.querySelectorAll(".scenario-card, .featured-rp").forEach((card) => {
    const target = card.dataset.title?.toLowerCase() ?? "";
    card.hidden = query.length > 0 && !target.includes(query);
  });
}

searchInput?.addEventListener("input", (event) => {
  filterScenarios(event.target.value);
});

resetSearch?.addEventListener("click", () => {
  if (searchInput) {
    searchInput.value = "";
  }
  filterScenarios("");
});

uploadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#rpTitle");
  const typeInput = document.querySelector("#rpType");
  const memoInput = document.querySelector("#rpMemo");
  const title = titleInput.value.trim();
  const memo = memoInput.value.trim();

  if (!title) {
    uploadNote.textContent = "RP 제목을 먼저 입력해 주세요.";
    return;
  }

  const id = `custom-${Date.now()}`;
  rpLibrary[id] = {
    title,
    status: "임시 등록",
    tags: [typeInput.value, "신규", "작성 중"],
    summary: memo || "방금 등록한 임시 RP입니다. 다음 단계에서 파일 업로드와 DB 저장으로 연결합니다.",
    quote: memo || "상세 스크립트를 입력하면 이 영역에 대표 문장이 표시됩니다.",
    facts: [
      "현재는 브라우저 화면에만 임시 추가됩니다.",
      "Supabase 연결 후에는 업로드한 RP 파일, 이미지, 팩트, 댓글을 저장할 수 있습니다.",
      "관리자 승인 절차를 붙이면 검수된 RP만 라이브러리에 공개할 수 있습니다.",
    ],
    flow: [
      "RP 제목과 분류를 입력합니다.",
      "고객 상황, 목표, 핵심 질문을 정리합니다.",
      "관리자 검토 후 라이브러리에 공개합니다.",
    ],
    script: [
      { speaker: "상담자", text: memo || "고객 상황을 입력하면 이곳에 RP 대화 예시가 표시됩니다." },
      { speaker: "고객", text: "이 상황에서 제가 어떤 선택을 해야 할지 궁금합니다." },
    ],
    material: {
      badge: "임시 자료",
      image:
        "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "자료 대시보드 화면",
      title: "업로드 자료가 연결될 예정입니다",
      caption: "파일 업로드를 붙이면 RP별 자료화면, 그림, 팩트체크 항목을 자동으로 구성할 수 있습니다.",
      points: ["문서 요약", "관련 이미지", "팩트체크 항목"],
    },
    checks: [
      { level: "작성", title: "임시 저장", text: "현재는 브라우저에서만 확인되는 임시 데이터입니다." },
      { level: "예정", title: "DB 연결", text: "Supabase 연결 후 자료와 팩트체크가 영구 저장됩니다." },
    ],
    checkScore: "작성 중",
    aiPrompt: `${title} 상황을 기준으로 고객 역할 AI 연습을 준비합니다.`,
  };

  const card = document.createElement("article");
  card.className = "scenario-card";
  card.dataset.rpId = id;
  card.dataset.title = `${title} ${typeInput.value} 신규`;

  const accent = document.createElement("i");
  accent.className = "accent wine";

  const body = document.createElement("div");
  const meta = document.createElement("div");
  meta.className = "meta";

  const type = document.createElement("span");
  type.textContent = typeInput.value;
  const level = document.createElement("span");
  level.textContent = "신규";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const summary = document.createElement("p");
  summary.textContent = `임시 등록 · ${memo ? "메모 포함" : "메모 없음"}`;

  const openButton = document.createElement("button");
  openButton.className = "mini-button rp-open";
  openButton.type = "button";
  openButton.dataset.rpId = id;
  openButton.textContent = "열기";

  meta.append(type, level);
  body.append(meta, heading, summary);
  card.append(accent, body, openButton);

  scenarioList?.prepend(card);
  uploadNote.textContent = "임시 RP가 목록에 추가되었고, 상세 패널도 열렸습니다. 다음 단계에서 DB 저장으로 연결합니다.";
  uploadForm.reset();
  renderRpDetail(id);
});

commentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#commentInput");
  const value = input.value.trim();

  if (!value) {
    return;
  }

  const item = document.createElement("article");
  const body = document.createElement("div");
  const tag = document.createElement("span");
  tag.className = "pill";
  tag.textContent = "새의견";

  const heading = document.createElement("h3");
  heading.textContent = value;

  const count = document.createElement("strong");
  count.textContent = "1";

  body.append(tag, heading);
  item.append(body, count);

  discussionList?.prepend(item);
  input.value = "";
  showToast("의견 주제가 추가되었습니다. 실제 저장은 DB 연결 후 반영됩니다.");
});

practiceButton?.addEventListener("click", () => {
  const isHidden = coachFeed?.hasAttribute("hidden");

  if (isHidden) {
    coachFeed.removeAttribute("hidden");
    practiceButton.textContent = "연습 흐름 닫기";
  } else {
    coachFeed?.setAttribute("hidden", "");
    practiceButton.textContent = "연습 흐름 보기";
  }
});

sendToAi?.addEventListener("click", () => {
  const detail = rpLibrary[sendToAi.dataset.rpId || "insurance-basics"];

  if (coachFeed) {
    coachFeed.removeAttribute("hidden");
    coachFeed.replaceChildren();

    const customer = document.createElement("p");
    const customerLabel = document.createElement("b");
    customerLabel.textContent = "고객:";
    customer.append(customerLabel, " 보험이 꼭 필요한 건지 아직 잘 모르겠어요.");

    const coach = document.createElement("p");
    const coachLabel = document.createElement("b");
    coachLabel.textContent = "AI 코치:";
    coach.append(coachLabel, ` ${detail.aiPrompt}`);

    coachFeed.append(customer, coach);
  }

  document.querySelector("#ai-practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

goDiscussion?.addEventListener("click", () => {
  document.querySelector("#discussion")?.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#commentInput")?.focus();
});

renderRpDetail("insurance-basics", false);
