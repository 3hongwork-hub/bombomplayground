// 춘천의 로컬 쉼표 스팟 데이터
export const spotsData = [
  {
    id: 1,
    name: "의암호 나들길 (물레길)",
    category: "water",
    healingPoint: "잔잔한 호숫길을 걸으며 복잡한 머릿속 비워내기",
    desc: "고요히 반짝이는 의암호 수면을 따라 조성된 편안한 산책로입니다. 이른 아침 자욱하게 피어오르는 물안개와 해 질 무렵 호수를 물들이는 붉은 노을은 춘천에서만 느낄 수 있는 궁극의 위로를 선사합니다.",
    location: "강원 춘천시 스포츠타운길 113-1",
    tag: "물멍 산책",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" // Warm calming sunset lake landscape
  },
  {
    id: 2,
    name: "공지천 의암공원 잔디밭",
    category: "water",
    healingPoint: "돗자리 펴고 누워 나뭇잎 사이로 내리는 햇살 느끼기",
    desc: "춘천 시민들의 오랜 휴식처입니다. 푸른 잔디와 늘어진 버드나무가 어우러져 평화로운 분위기를 자아냅니다. 돗자리를 펴고 누워 시원한 바람을 맞거나, 호숫가 벤치에 앉아 멍하니 강물을 바라보는 것을 추천합니다.",
    location: "강원 춘천시 삼천동 200-6",
    tag: "돗자리 피크닉",
    img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80" // Beautiful park with trees and green grass
  },
  {
    id: 3,
    name: "실레마을 김유정문학촌",
    category: "forest",
    healingPoint: "소박한 시골길을 걸으며 아날로그 감성 채우기",
    desc: "소설가 김유정의 생가가 있는 고즈넉한 마을입니다. 높지 않은 야트막한 금병산 자락에 둘러싸인 마을 안길을 걷다 보면 마음이 절로 평온해집니다. 전통 한옥 전시관과 평화로운 정원이 힐링을 돕습니다.",
    location: "강원 춘천시 신동면 실레길 25",
    tag: "고즈넉한 시골길",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" // Peaceful countryside mountain valley
  },
  {
    id: 4,
    name: "서면 한옥 소담 북카페",
    category: "book",
    healingPoint: "따뜻한 차 한 잔과 책장이 넘어가는 소리에 집중하기",
    desc: "춘천 서면의 호수 반대편, 조용한 마을 구석에 자리 잡은 한옥 책방입니다. 번잡한 도시의 소음에서 완전히 격리되어 마루에 앉아 좋아하는 책을 편안히 읽을 수 있습니다. 잔잔히 들려오는 풍경 소리가 지친 마음을 녹여줍니다.",
    location: "강원 춘천시 서면 박사로 920",
    tag: "한옥 책방",
    img: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=600&q=80" // Vintage cozy reading corner with books
  },
  {
    id: 5,
    name: "해피초원목장 (춘천의 알프스)",
    category: "forest",
    healingPoint: "탁 트인 넓은 초원과 산 정상에서 시야와 마음 넓히기",
    desc: "넓은 목초지에서 양과 한우들이 자유롭게 풀을 뜯는 모습을 볼 수 있는 힐링 목장입니다. 특히 목장 꼭대기 전망대에서 내려다보는 의암호 협곡 뷰는 가슴이 뻥 뚫리는 듯한 시원함을 선사합니다.",
    location: "강원 춘천시 사북면 춘화로 330-175",
    tag: "알프스 뷰 목장",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" // Beautiful open green field valley view
  },
  {
    id: 6,
    name: "구봉산 카페거리 테라스",
    category: "book",
    healingPoint: "석양이 내려앉는 춘천 시내를 내려다보며 커피 한잔",
    desc: "춘천의 동쪽 산등성이에 자리해 시내 전체가 한눈에 들어오는 탁 트인 뷰를 자랑하는 곳입니다. 늦은 오후에 방문해 따뜻한 라떼 한 잔을 들고 시시각각 물드는 하늘과 서서히 켜지는 야경을 가만히 내려다보세요.",
    location: "강원 춘천시 동면 순환대로 1154-113",
    tag: "전망 좋은 카페",
    img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80" // Terraced coffee shop sunset scenery
  }
];

export function renderSpotsView(container) {
  container.innerHTML = `
    <div class="spots-header">
      <h2>🌸 쉼표, 춘천 힐링 스팟</h2>
      <p class="spots-header-desc">춘천에서 마주할 수 있는 나만의 조용한 도피처. 나에게 맞는 쉼의 공간을 찾아 떠나보세요.</p>
    </div>
    
    <div class="spots-filter">
      <button class="filter-pill active" data-category="all" id="filter-all">전체</button>
      <button class="filter-pill" data-category="water" id="filter-water"><i class="fa-solid fa-water"></i> 물멍 코스</button>
      <button class="filter-pill" data-category="forest" id="filter-forest"><i class="fa-solid fa-tree"></i> 숲멍 코스</button>
      <button class="filter-pill" data-category="book" id="filter-book"><i class="fa-solid fa-book-open"></i> 글/커피 코스</button>
    </div>
    
    <div class="spots-grid" id="spots-grid-container">
      <!-- Spots cards rendered here -->
    </div>
  `;

  const gridContainer = container.querySelector("#spots-grid-container");
  const filterPills = container.querySelectorAll(".filter-pill");

  // Initial Render
  displaySpots("all");

  // Event Listeners for Filters
  filterPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      filterPills.forEach(btn => btn.classList.remove("active"));
      pill.classList.add("active");
      
      const category = pill.getAttribute("data-category");
      displaySpots(category);
    });
  });

  function displaySpots(category) {
    const filtered = category === "all" 
      ? spotsData 
      : spotsData.filter(s => s.category === category);

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-sub);">
          <i class="fa-regular fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; color: #ccc;"></i>
          <p>준비된 스팟이 없습니다.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(spot => `
      <article class="spot-card">
        <div class="spot-img-container">
          <img src="${spot.img}" alt="${spot.name}" loading="lazy" />
          <span class="spot-tag-overlay">${spot.tag}</span>
        </div>
        <div class="spot-info">
          <h3>${spot.name}</h3>
          <p class="spot-healing-point"><i class="fa-solid fa-spa"></i> ${spot.healingPoint}</p>
          <p class="spot-desc">${spot.desc}</p>
          <div class="spot-meta">
            <span class="spot-location"><i class="fa-solid fa-map-marker-alt"></i> ${spot.location}</span>
          </div>
        </div>
      </article>
    `).join("");
  }
}
