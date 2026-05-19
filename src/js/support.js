// 청년 지원 정보 데이터 및 렌더링 모듈
export function renderSupportView(container) {
  container.innerHTML = `
    <div class="support-hero">
      <h2>🌸 청년 지원 정보 & 쉼표 안내소</h2>
      <p>혼자 고민하지 마세요. 춘천시와 청년 센터가 당신의 한 걸음을 함께합니다.</p>
    </div>

    <div class="support-tabs">
      <button class="support-tab-btn active" data-tab="challenge" id="tab-btn-challenge">청년도전지원사업</button>
      <button class="support-tab-btn" data-tab="community" id="tab-btn-community">지역 커뮤니티 & 활동</button>
      <button class="support-tab-btn" data-tab="mental" id="tab-btn-mental">청년 마음건강 바우처</button>
    </div>

    <div class="support-content" id="support-tab-content">
      <!-- Dynamic tab content goes here -->
    </div>
  `;

  const contentArea = container.querySelector("#support-tab-content");
  const tabButtons = container.querySelectorAll(".support-tab-btn");

  // Initial tab loading
  loadTab("challenge");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadTab(btn.getAttribute("data-tab"));
    });
  });

  function loadTab(tabName) {
    if (tabName === "challenge") {
      contentArea.innerHTML = `
        <div class="support-section">
          <div class="support-card">
            <h3>춘천시 청년도전지원사업 <span class="badge">추천</span></h3>
            <p class="support-card-desc">
              구직 활동에 지쳤거나 쉬고 있는 청년들을 대상으로 맞춤형 프로그램을 제공해 자신감 회복과 진로 탐색을 돕는 국가지원 프로그램입니다. 참여 기간에 따라 수당도 함께 지원됩니다.
            </p>
            
            <div class="support-details">
              <dl>
                <dt>지원 대상</dt>
                <dd>만 18세 ~ 34세 청년 중 최근 6개월간 취업 및 직업훈련 이력이 없는 청년 (※ 춘천시 특화 조례로 만 35~45세 청년도 일부 참여 가능)</dd>
                
                <dt>지원 혜택</dt>
                <dd>
                  <strong>최대 350만 원 참여 수당 지급!</strong><br>
                  • 도전 프로그램 (5주): 50만 원 지원<br>
                  • 도전+ 프로그램 (15주): 최대 170만 원 지원<br>
                  • 도전+ 프로그램 (25주): 최대 350만 원 지원 (이수 인센티브 포함)
                </dd>
                
                <dt>참여 내용</dt>
                <dd>1대1 전문 밀착 상담, MBTI 활용 자신감 회복 프로그램, 라이프 밸런스 설계, 춘천 로컬 직무 체험 및 취업 연계</dd>
              </dl>
            </div>

            <div class="support-card-actions">
              <a href="https://www.work.go.kr/youngChallenge/index.do" target="_blank" class="btn-primary" id="btn-support-apply-challenge">
                <i class="fa-solid fa-file-signature"></i> 고용24 온라인 신청
              </a>
              <a href="tel:033-818-9288" class="btn-secondary" id="btn-support-call-reborn">
                <i class="fa-solid fa-phone"></i> 희망리본 춘천센터 문의 (033-818-9288)
              </a>
            </div>
          </div>

          <div style="margin-top: 40px; text-align: center;">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 24px; color: var(--color-dark);">
              <i class="fa-solid fa-route"></i> 참여 진행 프로세스
            </h3>
            <div class="timeline">
              <div class="timeline-item">
                <h4>1단계: 참여 신청 및 상담</h4>
                <p>고용24 또는 희망리본 춘천센터에 신청 접수 후 전담 상담사와 첫 면담을 진행합니다.</p>
              </div>
              <div class="timeline-item">
                <h4>2단계: 밀착 개인 맞춤 상담</h4>
                <p>지친 마음을 먼저 들여다볼 수 있는 성격/진로 진단 및 고민 상담을 진행합니다.</p>
              </div>
              <div class="timeline-item">
                <h4>3단계: 일상 회복 및 소통 프로그램</h4>
                <p>소규모 네트워킹과 춘천 힐링 산책, 취미 나눔을 통해 활력을 키웁니다.</p>
              </div>
              <div class="timeline-item">
                <h4>4단계: 진로 탐색 및 이수</h4>
                <p>관심 직무 체험을 진행하고, 최종 이수 시 참여 수당 수령 및 후속 고용 정책 연계 혜택을 받습니다.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tabName === "community") {
      contentArea.innerHTML = `
        <div class="support-section">
          <div class="support-grid">
            <div class="support-card">
              <h3>춘뿌리 (춘천에서 뿌리내리고 싶은 사람들) <span class="badge">네트워킹</span></h3>
              <p class="support-card-desc">
                타지에서 춘천으로 이주했거나, 혹은 춘천에 거주하며 새로운 인간관계 형성이 필요한 청년들이 모여 친목을 도모하고 정보를 교환하는 민간 청년 커뮤니티입니다.
              </p>
              <div class="support-details">
                <dl>
                  <dt>주요 활동</dt>
                  <dd>동네 취미 클래스(베이킹, 플로깅 등), 주말 힐링 캠프, 청년 주거 및 취·창업 꿀팁 정보 공유 세션</dd>
                  <dt>추천 대상</dt>
                  <dd>외로움을 느끼거나 또래 청년 친구들과 느슨한 연결고리를 만들고 싶은 쉬었음 청년</dd>
                </dl>
              </div>
              <div class="support-card-actions" style="margin-top:20px;">
                <button class="btn-primary" id="btn-com-request-chun" onclick="alert('춘뿌리 네트워킹 모임 공고 및 인스타그램 정보로 연계됩니다.')">
                  <i class="fa-brands fa-instagram"></i> 춘뿌리 소통 참여하기
                </button>
              </div>
            </div>

            <div class="support-card">
              <h3>춘천시 청년청 <span class="badge">정책 기구</span></h3>
              <p class="support-card-desc">
                춘천 지역의 다양한 의제를 청년들이 직접 발굴하고, 시의 정책으로 실현될 수 있게 돕는 청년 거버넌스 플랫폼입니다.
              </p>
              <div class="support-details">
                <dl>
                  <dt>주요 활동</dt>
                  <dd>청년 정책 제안 포럼 운영, 문화/주거/일자리 등 주제별 분과 위원회 활동, 네트워킹 연말 파티</dd>
                  <dt>참여 혜택</dt>
                  <dd>정책 제안 회의 참석 수당 지급, 춘천 청년 네트워크 증명서 발급 및 우수 위원 표창</dd>
                </dl>
              </div>
              <div class="support-card-actions" style="margin-top:20px;">
                <a href="https://www.ccyouth.kr" target="_blank" class="btn-secondary" id="btn-com-link-ccyouth">
                  <i class="fa-solid fa-globe"></i> 춘천청년청 홈페이지 방문
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tabName === "mental") {
      contentArea.innerHTML = `
        <div class="support-section">
          <div class="support-card">
            <h3>청년마음건강지원사업 (마음건강 바우처) <span class="badge">전문 상담</span></h3>
            <p class="support-card-desc">
              심리적 어려움을 겪고 있는 청년들을 위해 전문 심리상담 서비스를 바우처 형태로 제공하여, 자부담 10% 이하의 매우 저렴한 비용으로 고품질의 1대1 심리 케어를 받을 수 있는 보건복지부 지원 제도입니다.
            </p>
            
            <div class="support-details">
              <dl>
                <dt>지원 대상</dt>
                <dd>만 19세 이상 34세 이하 청년 (소득 기준 없음, 고립·은둔 청년 우선 지원)</dd>
                
                <dt>지원 서비스</dt>
                <dd>
                  <strong>3개월간 주 1회(총 12회) 전문 1대1 심리 상담 지원</strong><br>
                  • A형(일반적인 마음 상담): 회당 6,000원 본인부담 (정부 90% 지원)<br>
                  • B형(고위험군 대상 전문 상담): 회당 7,000원 본인부담 (정부 90% 지원)<br>
                  ※ 자립준비청년은 본인부담금 0% 전액 무료!
                </dd>
                
                <dt>상담 주제</dt>
                <dd>우울, 무기력감, 구직 스트레스, 대인관계 문제 해결, 자아존중감 향상 상담</dd>
                
                <dt>신청 장소</dt>
                <dd>주민등록상 거주지 읍·면·동 행정복지센터 방문 신청 또는 복지로(bokjiro.go.kr) 온라인 신청</dd>
              </dl>
            </div>

            <div class="support-card-actions">
              <a href="https://www.bokjiro.go.kr" target="_blank" class="btn-primary" id="btn-mental-apply-bokjiro">
                <i class="fa-solid fa-heart-circle-check"></i> 복지로에서 신청하기
              </a>
              <button class="btn-secondary" id="btn-mental-info-modal" onclick="alert('가까운 춘천 내 행정복지센터(예: 소양동, 신사우동, 석사동 등)에 유선 문의하시면 가장 신속하게 잔여 자리를 확인하실 수 있습니다.')">
                <i class="fa-solid fa-map"></i> 춘천 상담기관 목록 확인
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
}
