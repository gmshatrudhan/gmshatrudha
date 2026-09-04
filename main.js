/* ==========================================================================
   STUDYVERSE — APP
   Renders every section from js/data.js, drives the quiz, search, tilt-3D,
   scroll reveal, counters, nav and more. No libraries beyond Three.js.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------ ICON MAP ------------------------------ */
  const ICONS = {
    calc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></svg>',
    atom:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V2"/><path d="M8.5 2h7"/><path d="M7.5 14h9"/></svg>',
    dna:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 3c0 6 10 6 10 12M17 3c0 6-10 6-10 12"/><path d="M7 7h10M7 17h10M7 9.5h10M7 14.5h10"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"/></svg>',
    code:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></svg>',
    doc:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
    quiz:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .3c0 1.7-2.5 2-2.5 3.7"/><path d="M12 17h.01"/></svg>',
    book:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></svg>',
    bell:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 15 18 9"/><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0"/></svg>',
    file:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    pen:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    folder:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'
  };

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const byId = (id) => SUBJECTS.find((s) => s.id === id);

  function subjectDot(color) { return `<span class="dot" style="background:${color};box-shadow:0 0 8px ${color}"></span>`; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ============================== SUBJECTS ============================== */
  function renderSubjects() {
    const grid = $('#subjectsGrid');
    grid.innerHTML = SUBJECTS.map((s, i) => `
      <div class="tilt" data-tilt>
        <div class="glass subject-card tilt-inner" style="--c:${s.color};animation-delay:${i * 0.06}s">
          <div class="subject-top">
            <span class="subject-icon">${ICONS[s.icon] || ICONS.doc}</span>
            <span class="subject-count">${s.chapters} chapters</span>
          </div>
          <h3>${s.name}</h3>
          <p>${s.blurb}</p>
          <div class="subject-foot">
            <span class="chip">${s.notes} notes</span>
            <a class="arrow-link" href="#notes" data-subject="${s.id}">Open <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ============================== SYLLABUS ============================== */
  function renderSyllabus() {
    const tabs = $('#syllabusTabs');
    const panel = $('#syllabusPanel');
    tabs.innerHTML = SUBJECTS.map((s, i) => `
      <button class="tab ${i === 0 ? 'active' : ''}" data-sub="${s.id}" style="--c:${s.color}" role="tab" aria-selected="${i === 0}">
        <span class="dot"></span>${s.name}
      </button>
    `).join('');

    function render(subId) {
      const s = byId(subId);
      const chapters = SYLLABUS[subId] || [];
      panel.style.setProperty('--c', s.color);
      panel.innerHTML = chapters.map((ch, i) => `
        <div class="syllabus-row">
          <span class="syllabus-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="name">${escapeHtml(ch)}</span>
          <svg class="go" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
      `).join('');
    }

    tabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      $$('.tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      render(tab.dataset.sub);
    });

    render(SUBJECTS[0].id);
  }

  /* ============================= STUDY NOTES ============================ */
  let activeNoteFilter = 'all';

  function renderNotes() {
    const chips = $('#notesFilter');
    chips.innerHTML = [
      { id: 'all', name: 'All subjects', color: '#22d3ee' },
      ...SUBJECTS.map((s) => ({ id: s.id, name: s.name, color: s.color }))
    ].map((c) => `
      <button class="filter-chip ${c.id === activeNoteFilter ? 'active' : ''}" data-filter="${c.id}">${c.name}</button>
    `).join('');

    const grid = $('#notesGrid');
    const list = NOTES.filter((n) => activeNoteFilter === 'all' || n.subject === activeNoteFilter);
    grid.innerHTML = list.map((n) => {
      const s = byId(n.subject);
      return `
        <div class="tilt" data-tilt>
          <div class="glass note-card tilt-inner" style="--c:${s.color}">
            <div class="note-head">
              <span class="note-tag">${n.tag}</span>
              <span class="note-date">${n.date}</span>
            </div>
            <h3>${escapeHtml(n.title)}</h3>
            <div class="note-subject">${subjectDot(s.color)} ${s.name}</div>
            <div class="note-foot">
              <span class="pages">${n.pages} pages</span>
              <a class="dl" href="#notes" onclick="return false" title="Sample link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download
              </a>
            </div>
          </div>
        </div>`;
    }).join('');

    chips.querySelectorAll('.filter-chip').forEach((c) => c.addEventListener('click', () => {
      activeNoteFilter = c.dataset.filter;
      renderNotes();
    }));
  }

  /* ============================== MCQ / TEST ============================ */
  function renderQuiz() {
    const wrap = $('#quizWrap');
    let idx = 0, score = 0, answered = false;
    const total = MCQS.length;

    function questionHTML() {
      const q = MCQS[idx];
      const s = byId(q.subject);
      const pct = Math.round(((idx) / total) * 100);
      return `
        <div class="quiz-head">
          <div>
            <span class="eyebrow">${s.name} · Question ${idx + 1} / ${total}</span>
            <h2>${escapeHtml(q.q)}</h2>
          </div>
          <div class="quiz-progress">
            <span class="quiz-meta">Score: <b>${score}</b></span>
            <div class="bar"><i style="width:${pct}%"></i></div>
          </div>
        </div>
        <div class="quiz-options">
          ${q.options.map((o, i) => `
            <button class="opt" data-i="${i}">
              <span class="letter">${String.fromCharCode(65 + i)}</span>
              <span>${escapeHtml(o)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-explain" id="quizExplain" hidden></div>
        <div class="quiz-actions">
          <button class="btn btn-primary" id="quizNext" hidden>Next question</button>
        </div>`;
    }

    function scoreHTML() {
      const pct = Math.round((score / total) * 100);
      const msg = pct >= 80 ? 'Excellent work! 🎉' : pct >= 50 ? 'Good job — keep practicing!' : 'Keep going, you will get there!';
      return `
        <div class="quiz-score">
          <div class="score-ring" style="--pct:${pct * 3.6}deg"><span>${pct}%</span></div>
          <h3>You scored ${score} / ${total}</h3>
          <p>${msg}</p>
          <button class="btn btn-primary" id="quizRestart">Try again</button>
        </div>`;
    }

    function bind() {
      wrap.querySelectorAll('.opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const q = MCQS[idx];
          const chosen = +btn.dataset.i;
          wrap.querySelectorAll('.opt').forEach((b) => {
            b.disabled = true;
            if (+b.dataset.i === q.answer) b.classList.add('correct');
          });
          if (chosen === q.answer) score++;
          else btn.classList.add('wrong');

          const explain = $('#quizExplain');
          explain.innerHTML = `<b>${chosen === q.answer ? 'Correct!' : 'Not quite.'}</b> ${escapeHtml(q.explain)}`;
          explain.hidden = false;

          const next = $('#quizNext');
          next.hidden = false;
          next.textContent = idx === total - 1 ? 'See results' : 'Next question';
          next.onclick = () => {
            idx++;
            if (idx >= total) { wrap.innerHTML = scoreHTML(); bindScore(); }
            else { answered = false; wrap.innerHTML = questionHTML(); bind(); }
          };
        });
      });
    }

    function bindScore() {
      $('#quizRestart').addEventListener('click', () => {
        idx = 0; score = 0; answered = false;
        wrap.innerHTML = questionHTML();
        bind();
      });
    }

    wrap.innerHTML = questionHTML();
    bind();
  }

  /* ============================ OLD QUESTIONS =========================== */
  function renderOldQuestions() {
    $('#oldQuestionsList').innerHTML = OLD_QUESTIONS.map((o) => {
      const s = byId(o.subject);
      return `
        <div class="glass oldq" style="--c:${s.color}">
          <span class="year-badge">${o.year}</span>
          <div class="row-main">
            <h3>${escapeHtml(o.title)}</h3>
            <div class="row-sub">${subjectDot(s.color)} ${s.name} · ${escapeHtml(o.meta)}</div>
          </div>
          <button class="btn btn-ghost btn-sm">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Download
          </button>
        </div>`;
    }).join('');
  }

  /* ============================== SUBJECTIVE ============================ */
  function renderSubjective() {
    $('#subjectiveList').innerHTML = SUBJECTIVE.map((q) => {
      const s = byId(q.subject);
      return `
        <div class="glass subjective" style="--c:${s.color}">
          <span class="marks-badge">${q.marks} marks</span>
          <div class="q-main">
            <p class="q-text">${escapeHtml(q.question)}</p>
            <div class="q-sub">${subjectDot(s.color)} ${s.name}</div>
          </div>
        </div>`;
    }).join('');
  }

  /* =============================== NOTICES ============================== */
  function renderNotices() {
    $('#noticeList').innerHTML = NOTICES.map((n) => `
      <div class="glass notice">
        <div class="notice-top">
          <span class="badge ${escapeHtml(n.badge)}">${escapeHtml(n.badge)}</span>
          <span class="notice-date">${escapeHtml(n.date)}</span>
        </div>
        <h3>${escapeHtml(n.title)}</h3>
        <p>${escapeHtml(n.text)}</p>
      </div>
    `).join('');
  }

  /* =============================== SEARCH =============================== */
  function buildIndex() {
    const index = [];

    SUBJECTS.forEach((s) => index.push({
      title: s.name, sub: `Subject · ${s.chapters} chapters, ${s.notes} notes`,
      icon: ICONS[s.icon] || ICONS.doc, color: s.color,
      target: '#subjects', keywords: [s.name, s.blurb]
    }));

    Object.keys(SYLLABUS).forEach((sid) => {
      (SYLLABUS[sid] || []).forEach((ch, i) => {
        const s = byId(sid);
        index.push({
          title: ch, sub: `Syllabus · ${s.name}`,
          icon: ICONS.book, color: s.color,
          target: '#syllabus', keywords: [ch, s.name]
        });
      });
    });

    NOTES.forEach((n) => {
      const s = byId(n.subject);
      index.push({
        title: n.title, sub: `Study note · ${s.name} · ${n.pages} pages`,
        icon: ICONS.doc, color: s.color,
        target: '#notes', keywords: [n.title, s.name, n.tag]
      });
    });

    MCQS.forEach((q, i) => {
      const s = byId(q.subject);
      index.push({
        title: q.q, sub: `MCQ · ${s.name}`,
        icon: ICONS.quiz, color: s.color,
        target: '#mcq', keywords: [q.q, s.name]
      });
    });

    OLD_QUESTIONS.forEach((o) => {
      const s = byId(o.subject);
      index.push({
        title: `${o.title} (${o.year})`, sub: `Old question · ${s.name}`,
        icon: ICONS.file, color: s.color,
        target: '#old-questions', keywords: [o.title, o.year, s.name]
      });
    });

    SUBJECTIVE.forEach((q) => {
      const s = byId(q.subject);
      index.push({
        title: q.question, sub: `Subjective · ${s.name} · ${q.marks} marks`,
        icon: ICONS.pen, color: s.color,
        target: '#subjective', keywords: [q.question, s.name]
      });
    });

    NOTICES.forEach((n) => index.push({
      title: n.title, sub: `Notice · ${n.date}`,
      icon: ICONS.bell, color: '#fbbf24',
      target: '#notice', keywords: [n.title, n.text, n.badge]
    }));

    return index;
  }
  const SEARCH_INDEX = buildIndex();

  const overlay = $('#searchOverlay');
  const overlayInput = $('#overlaySearchInput');
  const resultsBox = $('#searchResults');
  let activeResult = -1;

  function runSearch(query) {
    resultsBox.innerHTML = '';
    activeResult = -1;
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsBox.innerHTML = '<p class="search-empty">Start typing to search across the whole site…</p>';
      return;
    }
    const hits = SEARCH_INDEX
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => (item.title + ' ' + item.sub + ' ' + item.keywords.join(' ')).toLowerCase().includes(q))
      .slice(0, 12);

    if (!hits.length) {
      resultsBox.innerHTML = `<p class="search-empty">No results for “${escapeHtml(query)}”. Try another keyword.</p>`;
      return;
    }

    resultsBox.innerHTML = hits.map(({ item }, idx) => `
      <div class="result-item" data-target="${item.target}" data-idx="${idx}" style="--c:${item.color}">
        <span class="ri-icon">${item.icon}</span>
        <div>
          <div class="ri-title">${escapeHtml(item.title)}</div>
          <div class="ri-sub">${escapeHtml(item.sub)}</div>
        </div>
      </div>
    `).join('');

    resultsBox.querySelectorAll('.result-item').forEach((el) => {
      el.addEventListener('click', () => goTo(el.dataset.target));
    });
  }

  function goTo(target) {
    closeSearch();
    setTimeout(() => {
      const el = $(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  }

  function openSearch() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => overlayInput.focus(), 60);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    overlayInput.value = '';
    runSearch('');
  }

  $('#searchBtn').addEventListener('click', openSearch);
  $('#searchClose').addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  overlayInput.addEventListener('input', () => runSearch(overlayInput.value));
  overlayInput.addEventListener('keydown', (e) => {
    const items = $$('#searchResults .result-item');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!items.length) return;
      activeResult = (activeResult + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((el) => el.classList.remove('active'));
      items[activeResult].classList.add('active');
      items[activeResult].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeResult >= 0 && items[activeResult]) goTo(items[activeResult].dataset.target);
      else if (items[0]) goTo(items[0].dataset.target);
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Hero search form → open overlay + prefill
  $('#heroSearchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = $('#heroSearchInput').value;
    openSearch();
    overlayInput.value = val;
    runSearch(val);
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Subject card "Open" → filter the notes list to that subject
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-subject]');
    if (link && link.dataset.subject !== activeNoteFilter) {
      activeNoteFilter = link.dataset.subject;
      renderNotes();
    }
  });

  /* ============================ TILT (3D hover) ========================= */
  function initTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = $$('[data-tilt]');
    if (!els.length || !window.matchMedia('(hover: hover)').matches) return;

    els.forEach((el) => {
      const inner = el.querySelector('.tilt-inner');
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 9;
        const ry = (px - 0.5) * 11;
        inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        inner.style.boxShadow = '0 30px 60px -20px rgba(0,0,0,0.75)';
      });
      el.addEventListener('pointerleave', () => {
        inner.style.transform = 'rotateX(0) rotateY(0)';
        inner.style.boxShadow = '';
      });
    });
  }

  /* ============================== REVEAL ================================ */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((el) => io.observe(el));
  }

  /* ============================== COUNTERS ============================== */
  function initCounters() {
    const nums = $$('[data-count]');
    if (!nums.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = +el.dataset.count;
        const dur = 1400;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => io.observe(n));
  }

  /* ============================ NAV / HEADER ============================ */
  const header = $('#siteHeader');
  const sections = ['home', 'syllabus', 'subjects', 'notes', 'mcq', 'old-questions', 'subjective', 'notice']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 24);
    $('#toTop').classList.toggle('show', window.scrollY > 700);

    const pos = window.scrollY + window.innerHeight * 0.32;
    let current = sections[0];
    sections.forEach((s) => { if (s.offsetTop <= pos) current = s; });
    $$('.nav-link').forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const hamburger = $('#hamburger');
  const mainNav = $('#mainNav');
  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  mainNav.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) {
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ================================ INIT ================================ */
  $('#footerYear').textContent = new Date().getFullYear();

  renderSubjects();
  renderSyllabus();
  renderNotes();
  renderQuiz();
  renderOldQuestions();
  renderSubjective();
  renderNotices();
  initTilt();
  initReveal();
  initCounters();
})();
