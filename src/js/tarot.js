// 오늘의 마음 힐링 카드 (타로) 모듈

const tarotCards = [
  {
    title: "The Comma (쉼표)",
    icon: "fa-solid fa-quote-right",
    message: "멈추는 것은 포기가 아니라 나아갈 방향을 찾는 지혜입니다. 오늘 하루는 무언가 성취해야 한다는 강박을 내려놓고 온전히 비워진 쉼표를 감상하세요.",
    tip: "의암호 호숫가 벤치에 가만히 앉아 물결을 5분 동안 바라보세요."
  },
  {
    title: "The Seed (씨앗)",
    icon: "fa-solid fa-seedling",
    message: "땅속에 묻힌 씨앗은 아무 변화가 없어 보이지만, 차가운 흙을 뚫고 싹을 틔울 힘을 묵묵히 모으는 중입니다. 당신도 지금 힘찬 준비의 기간을 지나는 중입니다.",
    tip: "김유정문학촌 시골길을 걸으며 기와지붕 틈으로 돋은 새싹을 찾아보세요."
  },
  {
    title: "The Breeze (봄바람)",
    icon: "fa-solid fa-wind",
    message: "얼어붙은 나뭇가지에도 어김없이 따뜻한 봄바람이 찾아옵니다. 당신의 마음에 맺혀있던 서릿발도 머지않아 부드러운 온기로 녹아내릴 것입니다.",
    tip: "공지천 의암공원의 큰 버드나무 그늘 아래서 바람의 온기를 느껴보세요."
  },
  {
    title: "The Lantern (등불)",
    icon: "fa-solid fa-lightbulb",
    message: "가장 짙은 어둠이 지나야 비로소 찬란한 해돋이가 시작됩니다. 지금의 막막함은 새로운 아침이 눈앞에 다가왔음을 뜻하는 우주의 신호입니다.",
    tip: "해 질 무렵 구봉산 카페 야외 테라스에 앉아 시내의 야경 불빛을 조용히 바라보세요."
  },
  {
    title: "The Bridge (다리)",
    icon: "fa-solid fa-bridge",
    message: "모든 짐을 혼자서 질 필요는 없습니다. 세상을 향해 조그만 용기를 내어 손을 내밀면, 생각보다 훨씬 많은 온기가 다리를 건너 당신에게 도착할 것입니다.",
    tip: "춘천 청년 커뮤니티인 '춘뿌리' 인스타그램이나 모집 공고를 한번 살펴보세요."
  }
];

export function renderTarotSection(container) {
  // Select a random card
  let selectedCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];

  container.innerHTML = `
    <div class="tarot-section-box">
      <div class="section-title-wrap" style="flex-direction: column; gap: 8px;">
        <h3 class="section-title">🌸 오늘의 마음 힐링 카드</h3>
        <p class="section-desc">지친 마음을 어루만져 줄 위로의 한 마디. 카드를 선택해 보세요.</p>
      </div>

      <div class="tarot-card-wrap" id="tarot-card-trigger">
        <div class="tarot-card-inner">
          
          <!-- Card Front (Default: Navy & Star pattern) -->
          <div class="tarot-card-front">
            <div class="tarot-card-front-pattern">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>Click to open</span>
            </div>
          </div>

          <!-- Card Back (Revealed healing contents) -->
          <div class="tarot-card-back">
            <i class="${selectedCard.icon} card-illustration"></i>
            <h4 class="tarot-card-title">${selectedCard.title}</h4>
            <p class="tarot-card-msg">"${selectedCard.message}"</p>
            <div style="margin-top: 15px; font-size: 0.8rem; border-top: 1px dashed var(--color-border); padding-top: 12px; color: var(--color-secondary);">
              <strong>💡 오늘의 춘천 힐링 처방:</strong><br>
              ${selectedCard.tip}
            </div>
          </div>

        </div>
      </div>

      <div id="tarot-actions-area" class="hidden">
        <button class="btn-secondary tarot-reset-btn" id="btn-tarot-redraw">
          <i class="fa-solid fa-rotate-right"></i> 다른 카드 뽑기
        </button>
      </div>
    </div>
  `;

  const cardWrap = container.querySelector("#tarot-card-trigger");
  const actionsArea = container.querySelector("#tarot-actions-area");
  const redrawBtn = container.querySelector("#btn-tarot-redraw");

  cardWrap.addEventListener("click", () => {
    if (!cardWrap.classList.contains("flipped")) {
      cardWrap.classList.add("flipped");
      actionsArea.classList.remove("hidden");
      // Add standard dynamic animation effect on text load
      const toast = document.querySelector("#toast");
      if (toast) {
        showToast("마음 카드가 펼쳐졌습니다. 잠시 음미해보세요.");
      }
    }
  });

  redrawBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Smooth transition back
    cardWrap.classList.remove("flipped");
    actionsArea.classList.add("hidden");
    
    // Choose a new card after flip animation completes
    setTimeout(() => {
      renderTarotSection(container);
    }, 400);
  });
}

// Toast helper inside tarot
function showToast(msg) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2500);
}
