// 봄봄 놀이터: 쉼표, 춘천 - 메인 컨트롤러 및 라우터
import './style.css';
import { renderQuizView } from './js/quiz.js';
import { renderSpotsView, spotsData } from './js/spots.js';
import { renderCommunityView } from './js/community.js';
import { renderSupportView } from './js/support.js';
import { renderTarotSection } from './js/tarot.js';

// DOM Elements
const mainContent = document.querySelector('#main-content');
const navButtons = document.querySelectorAll('.nav-btn');
const appLogo = document.querySelector('#app-logo');

// Route management
const routes = {
  home: renderHomeView,
  quiz: (container) => renderQuizView(container, navigateTo),
  spots: renderSpotsView,
  community: renderCommunityView,
  support: renderSupportView
};

// Navigation function
export function navigateTo(viewName) {
  if (!routes[viewName]) return;

  // Update URL hash for simple back/forward support (optional, simple hash router)
  window.location.hash = viewName;
  
  // Highlight navigation button
  navButtons.forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Render view
  mainContent.innerHTML = ''; // Clear previous content
  routes[viewName](mainContent);

  // SEO: Update page title dynamically
  const titles = {
    home: "봄봄 놀이터 - 춘천 청년 마음 대피소 | 당신의 봄은 늘 따뜻합니다",
    quiz: "마음 온도 진단 | 춘천 청년 마음 대피소",
    spots: "의암호 쉼표 스팟 | 춘천 청년 마음 대피소",
    community: "소통 놀이터 | 춘천 청년 마음 대피소",
    support: "청년 지원 정보 | 춘천 청년 마음 대피소"
  };
  document.title = titles[viewName] || "봄봄 놀이터";

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Homepage
function renderHomeView(container) {
  // Grab 2 random spots for preview
  const previewSpots = spotsData.slice(0, 2);

  container.innerHTML = `
    <!-- Hero Banner Section -->
    <section class="home-hero">
      <div class="hero-content">
        <span class="hero-tag">🏡 춘천 청년 마음 대피소</span>
        <h2>잠시 쉬어가도,<br>당신의 봄은 늘 따뜻합니다.</h2>
        <p>
          끝없는 경쟁과 바쁜 삶 속에 지친 춘천 청년들을 위한 쉼표 공간입니다. 
          나의 마음 온도를 확인하고, 의암호 그늘 아래 소소한 대화를 나누며 다시 일어설 힘을 얻어가세요.
        </p>
        <button class="btn-primary" id="btn-hero-quiz">
          <i class="fa-solid fa-heart-pulse"></i> 내 마음 온도 진단하기
        </button>
      </div>
    </section>

    <!-- Quick Navigation Cards -->
    <section class="home-grid">
      <div class="menu-card pink-theme" data-route="quiz">
        <div class="card-icon"><i class="fa-solid fa-heart-pulse"></i></div>
        <div>
          <h3>마음 온도 진단</h3>
          <p>간단한 자가진단을 통해 번아웃 상태를 진단하고 내 마음에 맞는 춘천 로컬 처방을 받으세요.</p>
        </div>
        <div class="card-arrow"><i class="fa-solid fa-arrow-right"></i></div>
      </div>

      <div class="menu-card green-theme" data-route="spots">
        <div class="card-icon"><i class="fa-solid fa-compass"></i></div>
        <div>
          <h3>쉼표 스팟 찾기</h3>
          <p>자연이 품어주는 의암호 산책로, 소양로 한옥 북카페 등 춘천의 평화로운 로컬 쉼터를 추천합니다.</p>
        </div>
        <div class="card-arrow"><i class="fa-solid fa-arrow-right"></i></div>
      </div>

      <div class="menu-card blue-theme" data-route="community">
        <div class="card-icon"><i class="fa-solid fa-comments"></i></div>
        <div>
          <h3>소통 놀이터</h3>
          <p>회원가입 없는 익명 방명록에 오늘 하루를 털어놓고, 부담 없는 느슨한 소모임에 신청해보세요.</p>
        </div>
        <div class="card-arrow"><i class="fa-solid fa-arrow-right"></i></div>
      </div>

      <div class="menu-card purple-theme" data-route="support">
        <div class="card-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>
        <div>
          <h3>청년 지원 정보</h3>
          <p>춘천시 청년도전지원사업의 든든한 혜택(최대 350만 원 수당)과 전문 심리 상담 지원을 한눈에 보세요.</p>
        </div>
        <div class="card-arrow"><i class="fa-solid fa-arrow-right"></i></div>
      </div>
    </section>

    <!-- Two Column Interactive Section -->
    <section class="home-row">
      <!-- Left Column: Healing Spots Preview -->
      <div class="glass-panel home-spots-preview">
        <div class="section-title-wrap">
          <h3 class="section-title"><i class="fa-solid fa-map-location-dot" style="color:var(--color-secondary);"></i> 춘천의 추천 힐링 스팟</h3>
          <button class="btn-secondary" id="btn-more-spots" style="padding: 6px 14px; font-size: 0.8rem;">더 보기</button>
        </div>
        <p class="section-desc">호수와 숲이 어우러진 춘천에서 머리를 식히기 가장 좋은 장소들을 먼저 만나보세요.</p>
        
        <div class="spots-grid" style="grid-template-columns: 1fr; gap: 20px;">
          ${previewSpots.map(spot => `
            <div class="spot-card" style="flex-direction: row; min-height: 120px; align-items: stretch;">
              <div class="spot-img-container" style="width: 140px; height: auto; flex-shrink: 0;">
                <img src="${spot.img}" alt="${spot.name}" />
              </div>
              <div class="spot-info" style="padding: 16px; justify-content: center;">
                <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; color: var(--color-dark);">${spot.name}</h4>
                <p style="font-size: 0.82rem; color: var(--color-primary); font-weight: 600; margin-bottom: 4px;">${spot.healingPoint}</p>
                <p style="font-size: 0.82rem; color: var(--color-text-sub); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${spot.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Right Column: Interactive Daily Tarot Cards -->
      <div id="home-tarot-card-container">
        <!-- Renders the tarot component dynamically -->
      </div>
    </section>
  `;

  // --- Attach Homepage Interactions ---
  
  // Hero button -> Quiz
  container.querySelector('#btn-hero-quiz').addEventListener('click', () => {
    navigateTo('quiz');
  });

  // Quick Menu Cards -> Route
  container.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const route = card.getAttribute('data-route');
      navigateTo(route);
    });
  });

  // Spots view link
  container.querySelector('#btn-more-spots').addEventListener('click', () => {
    navigateTo('spots');
  });

  // Embed Tarot picker directly in Home view
  const tarotContainer = container.querySelector('#home-tarot-card-container');
  renderTarotSection(tarotContainer);
}

// Navigation Header Event Listeners
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const viewName = btn.getAttribute('data-view');
    navigateTo(viewName);
  });
});

// Logo Home Trigger
appLogo.addEventListener('click', () => {
  navigateTo('home');
});

// Simple Hash Routing Initializer
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  if (routes[hash]) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
});

// Initial Page Load
document.addEventListener('DOMContentLoaded', () => {
  const initialHash = window.location.hash.substring(1);
  if (routes[initialHash]) {
    navigateTo(initialHash);
  } else {
    navigateTo('home');
  }
});

// Fallback for direct JS injection
const initialHash = window.location.hash.substring(1);
if (routes[initialHash]) {
  navigateTo(initialHash);
} else {
  navigateTo('home');
}
