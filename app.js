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

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((button) => button.classList.remove("active"));
    item.classList.add("active");
  });
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

  if (!title) {
    uploadNote.textContent = "RP 제목을 먼저 입력해 주세요.";
    return;
  }

  const card = document.createElement("article");
  card.className = "scenario-card";
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
  summary.textContent = `임시 등록 · ${memoInput.value.trim() ? "메모 포함" : "메모 없음"}`;

  const openButton = document.createElement("button");
  openButton.className = "mini-button";
  openButton.type = "button";
  openButton.textContent = "열기";

  meta.append(type, level);
  body.append(meta, heading, summary);
  card.append(accent, body, openButton);

  scenarioList?.prepend(card);
  uploadNote.textContent = "임시 RP가 추천 목록에 추가되었습니다. 다음 단계에서 DB 저장으로 연결합니다.";
  uploadForm.reset();
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
