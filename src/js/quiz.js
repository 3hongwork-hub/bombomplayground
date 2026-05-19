// 마음 온도 자가진단 모듈
export function renderQuizView(container, navigateTo) {
  const questions = [
    {
      q: "아침에 눈을 뜨고 가장 먼저 드는 느낌은 무엇인가요?",
      options: [
        { text: "온몸이 천근만근 무겁고 다시 깊이 잠들고 싶다.", score: 1 },
        { text: "오늘 하루를 또 어떻게 메꿔야 할지 막막하고 한숨이 난다.", score: 2 },
        { text: "남들은 바쁘게 사는데 나만 멈춰있다는 조급함이 든다.", score: 3 },
        { text: "충분히 쉰 덕분에 마음이 평안하고 차분하다.", score: 4 }
      ]
    },
    {
      q: "요즘 나의 하루 일과 중 타인과의 대화나 교류는 어떤가요?",
      options: [
        { text: "거의 대화가 없고 혼자 방 안에 머무는 시간이 대부분이다.", score: 1 },
        { text: "편의점 점원 등 사무적인 대화 외에는 속마음을 나눌 상대가 없다.", score: 2 },
        { text: "SNS나 커뮤니티 글은 자주 보지만 실제 만남은 피로하게 느껴진다.", score: 3 },
        { text: "가족이나 오랜 친구와 소소하지만 편안한 대화를 종종 나눈다.", score: 4 }
      ]
    },
    {
      q: "만약 오늘 나에게 어떠한 제한도 없는 하루가 주어진다면?",
      options: [
        { text: "침대에서 꼼짝하지 않고 무기력하게 스마트폰만 볼 것 같다.", score: 1 },
        { text: "나에게 어울리지 않는 복잡한 도심을 피해 훌쩍 떠나 숨고 싶다.", score: 2 },
        { text: "조용한 숲이나 호수가 보이는 카페에서 혼자 커피를 마시고 싶다.", score: 3 },
        { text: "가까운 공원으로 가 산책을 하거나 따뜻한 햇빛을 온전히 쬐고 싶다.", score: 4 }
      ]
    },
    {
      q: "현재 나의 '구직 활동'이나 '미래 준비'에 대한 생각은 어떤가요?",
      options: [
        { text: "생각하는 것 자체만으로도 가슴이 턱 막히고 극심한 회피감이 든다.", score: 1 },
        { text: "무언가 해야 함은 알지만 어디서부터 어떻게 시작할지 전혀 모르겠다.", score: 2 },
        { text: "준비가 부족하다는 생각에 나 자신을 채찍질하며 불안해한다.", score: 3 },
        { text: "나만의 속도가 있다고 생각하고 당장은 휴식을 인정하려고 노력한다.", score: 4 }
      ]
    },
    {
      q: "가장 마음을 편안하게 만드는 춘천의 이미지는 무엇인가요?",
      options: [
        { text: "새벽녘 자욱한 물안개가 깔려 아무 소리도 들리지 않는 호수가", score: 1 },
        { text: "포근한 시골길을 걸으며 기와지붕 아래서 즐기는 차 한 잔", score: 2 },
        { text: "붉은 석양이 지는 구봉산 언덕에서 내려다보는 시내의 야경", score: 3 },
        { text: "푸른 나무들 사이로 맑은 공기가 느껴지는 푸른 초원", score: 4 }
      ]
    }
  ];

  let currentStep = -1; // -1 means intro
  let totalScore = 0;

  function showIntro() {
    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-intro">
          <div class="quiz-intro-icon">
            <i class="fa-solid fa-face-smile-beam"></i>
          </div>
          <h2>나의 마음 온도 진단하기</h2>
          <p>
            끝없는 경쟁과 바쁜 삶 속에 잠시 길을 잃으셨나요?<br>
            가벼운 질문을 통해 현재 나의 '마음의 휴식 수준'을 알아보고,<br>
            나에게 딱 맞는 춘천의 힐링 요법과 지원 프로그램을 추천받으세요.
          </p>
          <button class="btn-primary" id="btn-quiz-start">
            <i class="fa-solid fa-circle-play"></i> 진단 시작하기 (약 1분 소요)
          </button>
        </div>
      </div>
    `;

    container.querySelector("#btn-quiz-start").addEventListener("click", () => {
      currentStep = 0;
      showQuestion();
    });
  }

  function showQuestion() {
    const qData = questions[currentStep];
    const progressPercent = Math.round((currentStep / questions.length) * 100);

    container.innerHTML = `
      <div class="quiz-container">
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="question-card">
          <p style="font-size: 0.85rem; font-weight: 700; color: var(--color-secondary); margin-bottom: 8px;">
            질문 ${currentStep + 1} / ${questions.length}
          </p>
          <h3 class="question-text">${qData.q}</h3>
          <div class="answer-options">
            ${qData.options.map((opt, idx) => `
              <button class="answer-btn" data-score="${opt.score}" id="btn-opt-${currentStep}-${idx}">
                ${opt.text}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    // Event listener for choices
    const buttons = container.querySelectorAll(".answer-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const score = parseInt(btn.getAttribute("data-score"));
        totalScore += score;
        
        currentStep++;
        if (currentStep < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      });
    });
  }

  function showResult() {
    let resultTemp = 0;
    let resultTitle = "";
    let resultDesc = "";
    let badgeClass = "";
    let recs = [];

    // Calculate details based on total score (range 5 to 20)
    if (totalScore <= 8) {
      resultTemp = 10;
      badgeClass = "bg1"; // Peach Pink-ish warm/tired
      resultTitle = "방전 상태 (마음 온도 10°C)";
      resultDesc = "에너지가 바닥나 온전한 '정전'이 필요해요. 휴식을 취해도 지치고 모든 것이 무겁게 느껴지는 시기입니다. 억지로 무언가를 해내려 하기보다 스스로를 책망하지 않고 마음 편히 쉬는 것이 최우선입니다.";
      recs = [
        {
          badge: "힐링 스팟",
          title: "의암호 나들길 (물레길)",
          desc: "아무 소음도 들리지 않는 새벽 호숫가를 걷거나 잔잔한 물결을 보며 머리를 식혀보세요."
        },
        {
          badge: "지원 프로그램",
          title: "춘천 희망리본 1:1 심층 상담",
          desc: "상담사와 함께 조심스럽게 고민을 터놓고 나를 돌보는 단기 맞춤 상담 프로그램입니다."
        }
      ];
    } else if (totalScore <= 12) {
      resultTemp = 40;
      badgeClass = "bg4"; // Soft Amber
      resultTitle = "과부하 상태 (마음 온도 40°C)";
      resultDesc = "앞만 보고 달리다 번아웃이 온 상태입니다. 일상은 굴러가는 듯하지만 조급함과 무기력함이 마음 한구석을 채우고 있습니다. 타인의 기준에서 벗어나 오롯이 나만을 생각하는 시간이 요구됩니다.";
      recs = [
        {
          badge: "힐링 스팟",
          title: "서면 한옥 소담 북카페",
          desc: "소리 없이 마루턱에 앉아 따뜻한 차 한 잔과 아날로그 책 향기를 가만히 호흡해보세요."
        },
        {
          badge: "마음 건강 케어",
          title: "청년 마음건강 바우처 서비스",
          desc: "전문 임상/상담 전문가와 함께 내 마음에 안정을 가져다주는 심층 카운셀링을 받아보세요."
        }
      ];
    } else if (totalScore <= 16) {
      resultTemp = 65;
      badgeClass = "bg3"; // Soft Blue-purple
      resultTitle = "방황 상태 (마음 온도 65°C)";
      resultDesc = "내일을 준비할 작은 힘은 있지만 정서적 외로움이나 고립감을 느낄 수 있습니다. 혼자만의 고민을 넘어 비슷한 처지에 있는 또래 친구들과 가볍게 소통하며 활력을 얻어보는 것을 추천합니다.";
      recs = [
        {
          badge: "힐링 스팟",
          title: "공지천 의암공원 잔디밭",
          desc: "나홀로 방을 벗어나 돗자리를 챙기고 시원한 공지천 바람을 맞으며 피크닉을 즐겨보세요."
        },
        {
          badge: "청년 커뮤니티",
          title: "춘천 청년 네트워크 '춘뿌리'",
          desc: "소소한 베이킹이나 가벼운 취미 모임을 통해 따뜻한 사람들과 부담 없이 연결되어 보세요."
        }
      ];
    } else {
      resultTemp = 95;
      badgeClass = "bg2"; // Calm green
      resultTitle = "충전 완료 (마음 온도 95°C)";
      resultDesc = "충분한 충전과 휴식을 통해 내면에 긍정적인 힘이 가득 찼습니다! 이제는 따뜻한 봄바람과 함께 조금씩 세상 밖으로 걸어 나가도 좋은 시기입니다. 하고 싶었던 공부나 모임을 즐겨보세요.";
      recs = [
        {
          badge: "힐링 스팟",
          title: "해피초원목장",
          desc: "산등성이 전망대에서 탁 트인 의암호 뷰를 내려다보며 시야를 한 단계 더 크게 넓혀보세요."
        },
        {
          badge: "지원 프로그램",
          title: "청년도전지원사업 (중장기 15~25주)",
          desc: "또래와의 풍부한 교류, 직무 경험은 물론 든든한 금전적 참여 수당까지 함께 지급받는 풀 패키지 코스입니다."
        }
      ];
    }

    // Custom coloring based on temp
    let tempColor = "#ff9a8b";
    if (resultTemp === 10) tempColor = "#ff7b6b";
    else if (resultTemp === 40) tempColor = "#ffc288";
    else if (resultTemp === 65) tempColor = "#8ec5fc";
    else if (resultTemp === 95) tempColor = "#8ea89d";

    container.innerHTML = `
      <div class="quiz-container" style="max-width:750px;">
        <div class="quiz-result">
          <div class="result-temp-badge" style="background-color: ${tempColor}20; color: ${tempColor};">
            🌡️ 나의 현재 마음 온도: ${resultTemp}°C
          </div>
          <h2 class="result-title">${resultTitle}</h2>
          <p class="result-desc">${resultDesc}</p>

          <div class="result-recommendations">
            <h3><i class="fa-solid fa-feather-pointed"></i> 봄봄 놀이터의 처방전</h3>
            ${recs.map(rec => `
              <div class="rec-item">
                <span class="rec-badge" style="background-color: ${tempColor};">${rec.badge}</span>
                <div class="rec-info">
                  <h4>${rec.title}</h4>
                  <p>${rec.desc}</p>
                </div>
              </div>
            `).join("")}
          </div>

          <div class="quiz-actions">
            <button class="btn-primary" id="btn-go-spots">
              <i class="fa-solid fa-compass"></i> 다른 힐링 스팟 보기
            </button>
            <button class="btn-secondary" id="btn-go-support">
              <i class="fa-solid fa-hand-holding-heart"></i> 청년 정책 보기
            </button>
            <button class="btn-secondary" id="btn-quiz-retry" style="border: 1px dashed var(--color-border);">
              <i class="fa-solid fa-rotate-right"></i> 다시 검사하기
            </button>
          </div>
        </div>
      </div>
    `;

    // Dynamic Navigation between SPA tabs
    container.querySelector("#btn-go-spots").addEventListener("click", () => {
      navigateTo("spots");
    });

    container.querySelector("#btn-go-support").addEventListener("click", () => {
      navigateTo("support");
    });

    container.querySelector("#btn-quiz-retry").addEventListener("click", () => {
      currentStep = -1;
      totalScore = 0;
      showIntro();
    });
  }

  // Load Intro view initially
  showIntro();
}
