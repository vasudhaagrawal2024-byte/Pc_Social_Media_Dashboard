
/* =========================================
   APP — Routing, Sidebar, Theme, Search
   ========================================= */

/* ── Page switching ── */
function switchPage(name, el) {
  document.querySelectorAll('.page').forEach(p  => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  if (el)   el.classList.add('active');

  if (name === 'overview') {
    setTimeout(() => {
      initGrowthChart();
      initEngagementChart();
      animateBars();
    }, 100);
  }
  if (name === 'charts')   setTimeout(initChartsPage,   100);
  if (name === 'audience') setTimeout(initAudienceCharts, 100);

  closeMobile();
}

/* ── Sidebar collapse / mobile open ── */
let sidebarCollapsed = false;
let mobileOpen       = false;

function toggleSidebar() {
  const sb  = document.getElementById('sidebar');
  const tb  = document.getElementById('topbar');
  const mn  = document.getElementById('main');
  const isMobile = window.innerWidth <= 900;

  if (isMobile) {
    mobileOpen = !mobileOpen;
    sb.classList.toggle('mobile-open', mobileOpen);
    document.getElementById('overlay').classList.toggle('show', mobileOpen);
  } else {
    sidebarCollapsed = !sidebarCollapsed;
    sb.classList.toggle('collapsed',          sidebarCollapsed);
    tb.classList.toggle('sidebar-collapsed',  sidebarCollapsed);
    mn.classList.toggle('sidebar-collapsed',  sidebarCollapsed);
  }
}

function closeMobile() {
  mobileOpen = false;
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('overlay').classList.remove('show');
}

/* ── Theme toggle ── */
let isDark = true;

function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeKnob').textContent = isDark ? '🌙' : '☀️';
  document.getElementById('themeToggle').classList.toggle('light', !isDark);
  Chart.defaults.color = isDark ? 'rgba(240,238,248,0.5)' : 'rgba(26,22,40,0.5)';
}

/* ── Notifications panel ── */
function toggleNotifications() {
  const panel = document.getElementById('notifPanel');
  const dot   = document.getElementById('notifDot');
  panel.classList.toggle('show');
  if (panel.classList.contains('show')) dot.style.display = 'none';
}

/* ── Search ── */
function searchFunction(e) {
  const v = e.target.value.toLowerCase();
  if      (v.includes('overview'))                  switchPage('overview');
  else if (v.includes('chart'))                     switchPage('charts');
  else if (v.includes('post'))                      switchPage('posts');
  else if (v.includes('schedule'))                  switchPage('schedule');
  else if (v.includes('audience'))                  switchPage('audience');
  else if (v.includes('activity') || v.includes('feed')) switchPage('feed');
}

/* ── Init on load ── */
window.addEventListener('DOMContentLoaded', () => {
  buildPosts();
  buildSchedule();
  buildFeed();

  setTimeout(() => {
    runCounters();
    initGrowthChart();
    initEngagementChart();
    animateBars();
  }, 300);
});
