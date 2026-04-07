/* =========================================
   UI — DOM builders: Posts, Schedule, Feed
   ========================================= */

/* ── Counter animation ── */
function animateCounter(el, target, prefix = '', suffix = '', duration = 1800) {
  const isLarge = target > 1_000_000;
  const start   = performance.now();

  function step(now) {
    const t    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    const val  = Math.round(ease * target);

    el.textContent = isLarge
      ? `${prefix}${(val / 1_000_000).toFixed(1)}M${suffix}`
      : `${prefix}${val.toLocaleString()}${suffix}`;

    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isLarge
        ? `${prefix}${(target / 1_000_000).toFixed(1)}M${suffix}`
        : `${prefix}${target.toLocaleString()}${suffix}`;
    }
  }
  requestAnimationFrame(step);
}

function runCounters() {
  animateCounter(document.getElementById('cnt-insta'),   STATS.instagram);
  animateCounter(document.getElementById('cnt-twitter'), STATS.twitter);
  animateCounter(document.getElementById('cnt-reach'),   STATS.combined);
  animateCounter(document.getElementById('cnt-earn'),    STATS.earnPerPost, '$');
}

/* ── Engagement bars ── */
function animateBars() {
  document.querySelectorAll('.eng-fill').forEach(el => {
    setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 400);
  });
}

/* ── Posts grid ── */
function buildPosts() {
  const grid = document.getElementById('postGrid');
  POSTS.forEach((p, i) => {
    grid.innerHTML += `
      <div class="post-card" style="animation-delay:${i * 0.07}s">
        <div class="post-img" style="background:${p.bg}">
          <span>${p.emoji}</span>
          <div class="post-overlay">
            <div class="post-stat">❤️ ${p.likes}</div>
            <div class="post-stat">💬 ${p.comments}</div>
          </div>
        </div>
        <div class="post-body">
          <div class="post-caption">${p.caption}</div>
          <div class="post-meta">
            <span>❤️ ${p.likes}</span>
            <span>💬 ${p.comments}</span>
            <span>📅 ${p.date}</span>
          </div>
        </div>
      </div>`;
  });
}

/* ── Schedule / timeline ── */
function buildSchedule() {
  const tl = document.getElementById('timeline');
  SCHEDULE.forEach(s => {
    const cls   = s.status === 'scheduled' ? 'status-scheduled' : s.status === 'posted' ? 'status-posted' : 'status-draft';
    const label = s.status === 'scheduled' ? '📅 Scheduled'       : s.status === 'posted'    ? '✅ Posted'        : '✏️ Draft';
    tl.innerHTML += `
      <div class="timeline-item">
        <div class="timeline-time">${s.time}</div>
        <div class="timeline-content">
          <div class="timeline-title">${s.title}</div>
          <div class="timeline-sub">${s.platform} · ${s.date}</div>
        </div>
        <div class="status-pill ${cls}">${label}</div>
      </div>`;
  });

  /* Mini calendar */
  const cal  = document.getElementById('miniCal');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const highlighted = [5, 6, 7, 8, 10, 14, 15, 21, 22];

  cal.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center">
      ${days.map(d => `<div style="font-size:10px;color:var(--muted);font-weight:600">${d}</div>`).join('')}
      ${Array.from({ length: 30 }, (_, i) => {
        const d       = i + 1;
        const hasPost = highlighted.includes(d);
        const isToday = d === 7;
        return `<div style="
          padding:4px;border-radius:6px;font-size:12px;cursor:pointer;
          background:${isToday ? 'var(--accent)' : hasPost ? 'rgba(201,127,255,.15)' : 'transparent'};
          color:${isToday ? '#fff' : hasPost ? 'var(--accent)' : 'var(--muted)'};
          font-weight:${isToday || hasPost ? '600' : '400'};
          transition:background .2s">${d}</div>`;
      }).join('')}
    </div>`;
}

/* ── Activity feed ── */
function buildFeed() {
  const feed = document.getElementById('activityFeed');
  ACTIVITIES.forEach((a, i) => {
    feed.innerHTML += `
      <div class="feed-item" style="animation-delay:${i * 0.06}s">
        <div class="feed-icon ${a.cls}">${a.icon}</div>
        <div class="feed-text">${a.text}</div>
        <div class="feed-time">${a.time}</div>
      </div>`;
  });
}
