// 소통 놀이터 (방명록 및 소모임 매칭) 모듈

// 초기 방명록 데이터
const defaultNotes = [
  { id: 1, text: "오늘 드디어 알람 없이 10시간 숙면했어요! 죄책감 없이 푹 쉬는 하루가 최고예요.", likes: 14, time: "방금 전", bg: "bg1", rotate: "-2.5deg" },
  { id: 2, text: "공지천 벤치에 가만히 앉아서 은은하게 부는 강바람 맞는데 왜 눈물이 핑 도는지.. 다들 힘냅시다.", likes: 9, time: "2시간 전", bg: "bg2", rotate: "1.8deg" },
  { id: 3, text: "아무것도 안 해도 괜찮아요. 그냥 살아 숨 쉬는 것 자체만으로도 우리는 가치 있습니다. 토닥토닥.", likes: 23, time: "5시간 전", bg: "bg3", rotate: "-1deg" },
  { id: 4, text: "춘천 구봉산에 붉은 하늘을 보니 답답했던 가슴이 조금 탁 트였네요. 나중에 같이 보러 가요.", likes: 11, time: "어제", bg: "bg4", rotate: "3deg" }
];

// 초기 소모임 데이터
const defaultMeetings = [
  {
    id: 1,
    title: "🚲 의암호 자전거 천천히 한 바퀴",
    date: "이번주 토요일 오전 10:00",
    place: "의암공원 자전거 대여소 앞",
    desc: "바람을 느끼며 경쟁 없이 아주 천천히 페달을 밟는 모임입니다. 평화롭게 강바람 맞으며 땀 흘려봐요.",
    limit: 6,
    current: 3,
    status: "recruiting",
    joined: false
  },
  {
    id: 2,
    title: "☕ 서면 북카페에서 말없는 1시간 독서",
    date: "다음주 화요일 오후 03:00",
    place: "서면 한옥 소담 북카페",
    desc: "1시간 동안 말없이 각자 책을 조용히 읽고, 이후 30분간 차 한 잔과 함께 가벼운 첫인상을 나누는 느슨한 만남입니다.",
    limit: 4,
    current: 2,
    status: "recruiting",
    joined: false
  },
  {
    id: 3,
    title: "🍕 공지천 노을 피크닉 & 수다",
    date: "이번주 금요일 저녁 06:30",
    place: "공지천 잔디마당 (피크닉 매트)",
    desc: "노을 아래 돗자리를 깔고 간단한 스낵과 함께 소소하게 도란도란 서로의 힘든 마음을 다독이는 자리예요.",
    limit: 8,
    current: 7,
    status: "recruiting",
    joined: false
  }
];

export function renderCommunityView(container) {
  // LocalStorage 초기화 검증
  if (!localStorage.getItem("bombom_notes")) {
    localStorage.setItem("bombom_notes", JSON.stringify(defaultNotes));
  }
  if (!localStorage.getItem("bombom_meetings")) {
    localStorage.setItem("bombom_meetings", JSON.stringify(defaultMeetings));
  }

  container.innerHTML = `
    <div class="spots-header">
      <h2>🌸 봄봄 소통 놀이터</h2>
      <p class="spots-header-desc">익명의 온기로 가득한 소통방. 따뜻한 한마디를 건네거나, 소소한 춘천 친구들을 소모임으로 만나보세요.</p>
    </div>

    <div class="comm-layout">
      
      <!-- Left: 한 줄 방명록 -->
      <section class="comm-section">
        <div class="comm-title-bar">
          <h3 class="section-title"><i class="fa-regular fa-sticky-note" style="color:var(--color-primary);"></i> 소소한 이야기 (방명록)</h3>
          <span style="font-size:0.8rem; color:var(--color-text-sub);" id="notes-count">총 0개 글</span>
        </div>
        <div class="guestbook-wrap">
          <div class="board-container">
            <div class="board-grid" id="board-grid-notes">
              <!-- Sticky notes go here -->
            </div>
          </div>
          <form class="note-form" id="guestbook-form">
            <input type="text" class="note-input" id="note-input-text" placeholder="오늘 하루는 어땠나요? 마음을 건네보세요. (최대 60자)" maxlength="60" required />
            <button type="submit" class="note-submit" id="btn-note-submit">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </section>

      <!-- Right: 소모임 찾기 -->
      <section class="comm-section">
        <div class="comm-title-bar">
          <h3 class="section-title"><i class="fa-solid fa-people-group" style="color:var(--color-secondary);"></i> 힐링 소모임 매칭</h3>
          <button class="btn-secondary" id="btn-create-meeting-modal" style="padding: 6px 14px; font-size: 0.8rem;">
            <i class="fa-solid fa-plus"></i> 모임 만들기
          </button>
        </div>
        <div class="meetings-wrap">
          <div class="meetings-scroll" id="meetings-list-container">
            <!-- Meetings go here -->
          </div>
        </div>
      </section>

    </div>
  `;

  // DOM elements
  const notesGrid = container.querySelector("#board-grid-notes");
  const notesCountSpan = container.querySelector("#notes-count");
  const noteForm = container.querySelector("#guestbook-form");
  const noteInput = container.querySelector("#note-input-text");
  
  const meetingsList = container.querySelector("#meetings-list-container");
  const createMeetingBtn = container.querySelector("#btn-create-meeting-modal");

  // Load and render Guestbook notes
  function loadAndRenderNotes() {
    const notes = JSON.parse(localStorage.getItem("bombom_notes")) || [];
    notesCountSpan.textContent = `총 ${notes.length}개의 위로글`;

    if (notes.length === 0) {
      notesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-sub);">
          <p>첫 쉼표 방명록을 달아주세요 🌸</p>
        </div>
      `;
      return;
    }

    notesGrid.innerHTML = notes.map(note => `
      <div class="sticky-note ${note.bg || 'bg1'}" style="--rotation: ${note.rotate || '0deg'}">
        <p class="note-text">${escapeHTML(note.text)}</p>
        <div class="note-footer">
          <span class="note-time">${note.time}</span>
          <button class="heart-btn ${note.liked ? 'liked' : ''}" data-id="${note.id}" id="btn-heart-${note.id}">
            <i class="fa-solid fa-heart"></i> <span class="like-count">${note.likes}</span>
          </button>
        </div>
      </div>
    `).join("");

    // Heart toggle listener
    notesGrid.querySelectorAll(".heart-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        toggleHeart(id);
      });
    });
  }

  function toggleHeart(id) {
    const notes = JSON.parse(localStorage.getItem("bombom_notes")) || [];
    const targetIdx = notes.findIndex(n => n.id === id);
    if (targetIdx !== -1) {
      const note = notes[targetIdx];
      if (note.liked) {
        note.likes--;
        note.liked = false;
      } else {
        note.likes++;
        note.liked = true;
      }
      notes[targetIdx] = note;
      localStorage.setItem("bombom_notes", JSON.stringify(notes));
      loadAndRenderNotes();
    }
  }

  // Handle new note submission
  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;

    const notes = JSON.parse(localStorage.getItem("bombom_notes")) || [];
    
    // Choose random rotation and bg colors
    const rotations = ["-2.5deg", "-1.5deg", "1.5deg", "2.5deg", "-0.8deg", "0.8deg"];
    const randomRotate = rotations[Math.floor(Math.random() * rotations.length)];
    const bgClasses = ["bg1", "bg2", "bg3", "bg4"];
    const randomBg = bgClasses[Math.floor(Math.random() * bgClasses.length)];

    const newNote = {
      id: Date.now(),
      text: text,
      likes: 0,
      time: "방금 전",
      bg: randomBg,
      rotate: randomRotate,
      liked: false
    };

    notes.unshift(newNote);
    localStorage.setItem("bombom_notes", JSON.stringify(notes));
    noteInput.value = "";
    
    loadAndRenderNotes();
    showToast("마음 일기가 익명으로 게시판에 붙었습니다 🌸");
  });

  // Load and render Meetings list
  function loadAndRenderMeetings() {
    const meetings = JSON.parse(localStorage.getItem("bombom_meetings")) || [];
    
    if (meetings.length === 0) {
      meetingsList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--color-text-sub);">
          <p>등록된 소모임이 없습니다. 첫 모임을 개설해보세요!</p>
        </div>
      `;
      return;
    }

    meetingsList.innerHTML = meetings.map(meeting => {
      const progressPercent = Math.min(100, Math.round((meeting.current / meeting.limit) * 100));
      const isFull = meeting.current >= meeting.limit;
      const isJoined = meeting.joined;

      return `
        <div class="meeting-card">
          <div class="meeting-header">
            <span class="meeting-status ${isFull ? 'full' : 'recruiting'}">
              ${isFull ? '<i class="fa-solid fa-circle-check"></i> 마감됨' : '<i class="fa-solid fa-bullhorn"></i> 모집 중'}
            </span>
            <span style="font-size:0.8rem; color:var(--color-text-sub);">${meeting.date}</span>
          </div>
          <h4>${escapeHTML(meeting.title)}</h4>
          <p class="meeting-desc">${escapeHTML(meeting.desc)}</p>
          
          <div class="meeting-meta">
            <div class="meeting-info-row">
              <span><i class="fa-solid fa-map-marker-alt"></i> ${escapeHTML(meeting.place)}</span>
              <span><i class="fa-solid fa-user-group"></i> ${meeting.current}/${meeting.limit}명</span>
            </div>
            
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="meeting-progress">
                <div class="meeting-progress-fill" style="width: ${progressPercent}%;"></div>
              </div>
              <button class="join-btn ${isJoined ? 'joined' : ''} ${isFull && !isJoined ? 'disabled' : ''}" 
                      data-id="${meeting.id}" 
                      ${isFull && !isJoined ? 'disabled' : ''}
                      id="btn-join-${meeting.id}">
                ${isJoined ? '<i class="fa-solid fa-check"></i> 신청 완료' : '신청하기'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Join/Cancel trigger listener
    meetingsList.querySelectorAll(".join-btn").forEach(btn => {
      if (btn.classList.contains("disabled")) return;
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        toggleJoin(id);
      });
    });
  }

  function toggleJoin(id) {
    const meetings = JSON.parse(localStorage.getItem("bombom_meetings")) || [];
    const targetIdx = meetings.findIndex(m => m.id === id);
    if (targetIdx !== -1) {
      const meeting = meetings[targetIdx];
      if (meeting.joined) {
        meeting.current--;
        meeting.joined = false;
        showToast("모임 참여 신청이 취소되었습니다.");
      } else {
        meeting.current++;
        meeting.joined = true;
        showToast(`'${meeting.title}' 모임에 참여 신청되었습니다!`);
      }
      meetings[targetIdx] = meeting;
      localStorage.setItem("bombom_meetings", JSON.stringify(meetings));
      loadAndRenderMeetings();
    }
  }

  // Create new Meeting Modal Trigger
  createMeetingBtn.addEventListener("click", () => {
    const modal = document.querySelector("#global-modal");
    const modalContent = document.querySelector("#modal-content-area");

    modalContent.innerHTML = `
      <button class="modal-close-btn" id="btn-modal-close"><i class="fa-solid fa-xmark"></i></button>
      <h3 style="font-size:1.4rem; font-weight:700; margin-bottom:8px; color:var(--color-dark);">🌸 새로운 소모임 만들기</h3>
      <p style="font-size:0.85rem; color:var(--color-text-sub); margin-bottom:20px;">춘천 청년들과 가볍게 만나 마음을 환기시켜 보세요. 경쟁이나 평가가 없는 치유 목적의 모임만 가능합니다.</p>
      
      <form class="modal-form" id="create-meeting-form">
        <div class="form-group">
          <label for="meet-title">소모임 이름</label>
          <input type="text" id="meet-title" class="form-input" placeholder="예) 의암공원에서 돗자리 펴고 책멍할 사람" required />
        </div>
        <div class="form-group">
          <label for="meet-date">일시</label>
          <input type="text" id="meet-date" class="form-input" placeholder="예) 이번주 일요일 오후 2시" required />
        </div>
        <div class="form-group">
          <label for="meet-place">장소</label>
          <input type="text" id="meet-place" class="form-input" placeholder="예) 공지천 분수대 광장 앞" required />
        </div>
        <div class="form-group">
          <label for="meet-desc">모임에 대한 짧은 소개</label>
          <textarea id="meet-desc" class="form-textarea" placeholder="모임의 목적이나 일정에 대해 가볍게 기재해주세요." maxlength="150" required></textarea>
        </div>
        <div class="form-group">
          <label for="meet-limit">모집 정원 (명)</label>
          <input type="number" id="meet-limit" class="form-input" min="2" max="15" value="4" required />
        </div>
        <div class="modal-form-actions">
          <button type="button" class="btn-secondary" id="btn-meet-cancel">취소</button>
          <button type="submit" class="btn-primary" id="btn-meet-submit">개설하기</button>
        </div>
      </form>
    `;

    modal.classList.remove("hidden");

    // Close Modal helpers
    const closeModal = () => modal.classList.add("hidden");
    modalContent.querySelector("#btn-modal-close").addEventListener("click", closeModal);
    modalContent.querySelector("#btn-meet-cancel").addEventListener("click", closeModal);

    // Form submission
    const form = modalContent.querySelector("#create-meeting-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = modalContent.querySelector("#meet-title").value.trim();
      const date = modalContent.querySelector("#meet-date").value.trim();
      const place = modalContent.querySelector("#meet-place").value.trim();
      const desc = modalContent.querySelector("#meet-desc").value.trim();
      const limit = parseInt(modalContent.querySelector("#meet-limit").value);

      const meetings = JSON.parse(localStorage.getItem("bombom_meetings")) || [];

      const newMeet = {
        id: Date.now(),
        title: title,
        date: date,
        place: place,
        desc: desc,
        limit: limit,
        current: 1, // Creator joins automatically
        status: "recruiting",
        joined: true
      };

      meetings.unshift(newMeet);
      localStorage.setItem("bombom_meetings", JSON.stringify(meetings));
      
      closeModal();
      loadAndRenderMeetings();
      showToast(`'${title}' 소모임이 개설되었습니다! 🌸`);
    });
  });

  // Initial runs
  loadAndRenderNotes();
  loadAndRenderMeetings();
}

// XSS mitigation helper
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Toast notification trigger
function showToast(msg) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2500);
}
