/**
 * PCDashboard.jsx
 * Full React component version of the Priyanka Chopra Social Dashboard.
 * Dependencies: chart.js, react-chartjs-2, tailwindcss (core only)
 *
 * Usage:
 *   import PCDashboard from './PCDashboard';
 *   <PCDashboard />
 */

import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend, Filler
);

/* ── Data ── */
import {
  STATS, POSTS, SCHEDULE, ACTIVITIES, LOCATIONS,
  months6, months12, growth6, growth12,
} from "./data.js";

/* ── Sub-components ── */

function StatCard({ type, icon, platform, counterId, label, change }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-glow" />
      <div className="stat-platform">
        <span className="stat-platform-icon">{icon}</span>
        {platform}
      </div>
      <div className="stat-number" id={counterId}>0</div>
      <div className="stat-label">{label}</div>
      <div className="stat-change up">{change}</div>
    </div>
  );
}

function MiniCard({ title, badge, value, sub }) {
  return (
    <div className="card glass-card">
      <div className="card-header">
        <span className="card-title">{title}</span>
        {badge && <span className="card-badge badge-up">{badge}</span>}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
        {value}
      </div>
      <div className="text-muted">{sub}</div>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-img" style={{ background: post.bg }}>
        <span>{post.emoji}</span>
        <div className="post-overlay">
          <div className="post-stat">❤️ {post.likes}</div>
          <div className="post-stat">💬 {post.comments}</div>
        </div>
      </div>
      <div className="post-body">
        <div className="post-caption">{post.caption}</div>
        <div className="post-meta">
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
          <span>📅 {post.date}</span>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item }) {
  const cls   = item.status === "scheduled" ? "status-scheduled" : item.status === "posted" ? "status-posted" : "status-draft";
  const label = item.status === "scheduled" ? "📅 Scheduled" : item.status === "posted" ? "✅ Posted" : "✏️ Draft";
  return (
    <div className="timeline-item">
      <div className="timeline-time">{item.time}</div>
      <div className="timeline-content">
        <div className="timeline-title">{item.title}</div>
        <div className="timeline-sub">{item.platform} · {item.date}</div>
      </div>
      <div className={`status-pill ${cls}`}>{label}</div>
    </div>
  );
}

function FeedItem({ item }) {
  return (
    <div className="feed-item">
      <div className={`feed-icon ${item.cls}`}>{item.icon}</div>
      <div className="feed-text" dangerouslySetInnerHTML={{ __html: item.text }} />
      <div className="feed-time">{item.time}</div>
    </div>
  );
}

/* ── Chart configs ── */
const chartFont = { family: "'DM Sans', sans-serif", size: 11 };
const gridColor = "rgba(255,255,255,0.04)";

function growthConfig(range) {
  const labels = range === "6m" ? months6 : months12;
  const data   = range === "6m" ? growth6 : growth12;
  return {
    labels,
    datasets: [{
      label: "Followers (M)",
      data,
      borderColor: "#c97fff",
      backgroundColor: (ctx) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
        g.addColorStop(0, "rgba(201,127,255,.3)");
        g.addColorStop(1, "rgba(201,127,255,0)");
        return g;
      },
      fill: true, tension: 0.4,
      pointBackgroundColor: "#c97fff", pointRadius: 4,
    }],
  };
}

const engagementData = {
  labels: ["Instagram", "Twitter", "Facebook", "YouTube"],
  datasets: [{
    label: "Engagement Rate",
    data: [3.89, 1.2, 0.8, 2.1],
    backgroundColor: ["rgba(201,127,255,.7)", "rgba(127,179,255,.7)", "rgba(255,143,163,.7)", "rgba(114,239,173,.7)"],
    borderRadius: 8, borderSkipped: false,
  }],
};

const doughnutData = {
  labels: ["Likes", "Comments", "Shares", "Saves"],
  datasets: [{
    data: [72, 5, 15, 8],
    backgroundColor: ["rgba(255,143,163,.85)", "rgba(127,179,255,.85)", "rgba(201,127,255,.85)", "rgba(114,239,173,.85)"],
    borderColor: "rgba(0,0,0,0)", hoverOffset: 10,
  }],
};

const earningsData = {
  labels: ["Feb'24","May","Aug","Nov","Feb'25","May","Aug","Nov","Feb'26"],
  datasets: [
    { label: "Min ($K)", data: [222,224,218,230,235,240,238,244,216], backgroundColor: "rgba(127,179,255,.6)", borderRadius: 6, borderSkipped: false },
    { label: "Max ($K)", data: [256,258,248,265,272,278,268,280,297], backgroundColor: "rgba(201,127,255,.6)", borderRadius: 6, borderSkipped: false },
  ],
};

const scaleOpts = (suffix) => ({
  y: { ticks: { callback: (v) => v + suffix, font: chartFont }, grid: { color: gridColor } },
  x: { grid: { display: false }, ticks: { font: chartFont } },
});

/* ── Main component ── */
export default function PCDashboard() {
  const [page,         setPage]         = useState("overview");
  const [collapsed,    setCollapsed]    = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [isDark,       setIsDark]       = useState(true);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [growthRange,  setGrowthRange]  = useState("6m");

  /* Counter animation */
  const countersDone = useRef(false);
  useEffect(() => {
    if (page !== "overview" || countersDone.current) return;
    countersDone.current = true;
    const targets = [
      { id: "cnt-insta",   val: STATS.instagram,   prefix: "",  suffix: "M"  },
      { id: "cnt-twitter", val: STATS.twitter,      prefix: "",  suffix: "M"  },
      { id: "cnt-reach",   val: STATS.combined,     prefix: "",  suffix: "M"  },
      { id: "cnt-earn",    val: STATS.earnPerPost,  prefix: "$", suffix: "K"  },
    ];
    targets.forEach(({ id, val, prefix, suffix }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const isM = val > 1_000_000;
      const dur = 1800;
      const start = performance.now();
      const step = (now) => {
        const t    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 4);
        const cur  = Math.round(ease * (isM ? val / 1_000_000 : val / 1000));
        el.textContent = `${prefix}${cur}${suffix}`;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, [page]);

  /* Engagement bar animation */
  useEffect(() => {
    if (page !== "overview") return;
    setTimeout(() => {
      document.querySelectorAll(".eng-fill").forEach((el) => {
        el.style.width = el.dataset.w + "%";
      });
    }, 400);
  }, [page]);

  /* Location bars animation */
  useEffect(() => {
    if (page !== "audience") return;
    setTimeout(() => {
      document.querySelectorAll(".loc-fill").forEach((el) => {
        el.style.width = el.dataset.w + "%";
      });
    }, 300);
  }, [page]);

  /* Theme */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    ChartJS.defaults.color = isDark ? "rgba(240,238,248,0.5)" : "rgba(26,22,40,0.5)";
  }, [isDark]);

  const navItems = [
    { id: "overview",  icon: "⬡", label: "Overview",  group: "Analytics" },
    { id: "charts",    icon: "◈", label: "Charts",     group: "Analytics" },
    { id: "posts",     icon: "⊡", label: "Top Posts",  group: "Analytics" },
    { id: "schedule",  icon: "◷", label: "Scheduled",  group: "Content"   },
    { id: "audience",  icon: "◉", label: "Audience",   group: "Content"   },
    { id: "feed",      icon: "◎", label: "Activity",   group: "Content"   },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}
        id="sidebar"
      >
        <div className="sidebar-logo">
          <div className="logo-icon">✦</div>
          <div className="logo-text">PC<span>Studio</span></div>
        </div>
        {["Analytics", "Content"].map((group) => (
          <div key={group}>
            <div className="nav-label">{group}</div>
            {navItems
              .filter((n) => n.group === group)
              .map((n) => (
                <a
                  key={n.id}
                  className={`nav-item${page === n.id ? " active" : ""}`}
                  onClick={() => { setPage(n.id); setMobileOpen(false); }}
                >
                  <span className="nav-icon">{n.icon}</span>
                  {n.label}
                </a>
              ))}
          </div>
        ))}
        <div className="sidebar-footer">
          <div className="profile-mini">
            <div className="profile-avatar">PC</div>
            <div className="profile-info">
              <div className="profile-name">Priyanka Chopra</div>
              <div className="profile-handle">@priyankachopra</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {mobileOpen && (
        <div className="overlay show" onClick={() => setMobileOpen(false)} />
      )}

      {/* Topbar */}
      <header className={`topbar${collapsed ? " sidebar-collapsed" : ""}`} id="topbar">
        <button
          className="menu-btn"
          onClick={() => {
            if (window.innerWidth <= 900) setMobileOpen(!mobileOpen);
            else setCollapsed(!collapsed);
          }}
        >☰</button>
        <div className="topbar-title">Social Dashboard</div>
        <div className="search-bar">
          🔍
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              const v = e.target.value.toLowerCase();
              const map = { overview: "overview", chart: "charts", post: "posts", schedule: "schedule", audience: "audience", activity: "feed", feed: "feed" };
              for (const [k, p] of Object.entries(map)) if (v.includes(k)) { setPage(p); break; }
            }}
          />
        </div>
        <div className="topbar-actions">
          <div
            className="icon-btn tooltip"
            onClick={() => setNotifOpen(!notifOpen)}
            id="notifBtn"
          >
            🔔
            {!notifOpen && <div className="notif-dot" />}
            <span className="tooltip-text">Notifications</span>
          </div>
          {notifOpen && (
            <div className="notif-panel show" id="notifPanel">
              <div className="notif-item">🔥 New follower</div>
              <div className="notif-item">💬 New comment</div>
              <div className="notif-item">📈 Engagement increased</div>
            </div>
          )}
          <div className="icon-btn tooltip">📊<span className="tooltip-text">Export report</span></div>
          <div
            className={`theme-toggle${isDark ? "" : " light"}`}
            onClick={() => setIsDark(!isDark)}
          >
            <div className="toggle-knob">{isDark ? "🌙" : "☀️"}</div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className={`main${collapsed ? " sidebar-collapsed" : ""}`} id="main">

        {/* ── Overview ── */}
        {page === "overview" && (
          <div className="page active" id="page-overview">
            <div className="hero-header">
              <div className="hero-avatar">PC</div>
              <div className="hero-info">
                <h1>Priyanka Chopra Jonas</h1>
                <div className="hero-meta">
                  <span className="verified">✦ Verified Global Celeb</span>
                  <span>🌏 Bollywood · Hollywood · UNICEF</span>
                  <span>📅 Since 2000</span>
                </div>
              </div>
              <div className="hero-badges">
                <div className="badge badge-global">🌐 #77 Global</div>
                <div className="badge badge-live"><span className="live-dot" />Live</div>
              </div>
            </div>

            <div className="grid grid-4 mb-20">
              <StatCard type="insta"   icon="📸" platform="Instagram"      counterId="cnt-insta"   label="Total Followers" change="▲ +184,696 this month" />
              <StatCard type="twitter" icon="𝕏"  platform="Twitter / X"   counterId="cnt-twitter" label="Total Followers" change="▲ Top 10 in India" />
              <StatCard type="reach"   icon="📣" platform="Combined Reach" counterId="cnt-reach"   label="All Platforms"   change="▲ #1 Indian Actress" />
              <StatCard type="growth"  icon="💰" platform="Est. Earn/Post" counterId="cnt-earn"    label="Sponsored IG"    change="▲ $216K–297K / month" />
            </div>

            <div className="grid grid-4 mb-20">
              <MiniCard title="Engagement Rate" badge="High"  value="3.89%" sub="vs avg 1.2% for similar" />
              <MiniCard title="Avg Likes / Post" badge="+12%" value="381K"  sub="0.40% likes/follower ratio" />
              <MiniCard title="Avg Comments"    badge="Good" value="2,157" sub="188.61 likes:comment ratio" />
              <MiniCard title="Total IG Posts"               value="4,012" sub="+10 posts this month" />
            </div>

            <div className="grid grid-2 mb-20">
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📈 Follower Growth Trend</span>
                  <div className="tab-group">
                    {["6m", "1y"].map((r) => (
                      <div
                        key={r}
                        className={`tab-btn${growthRange === r ? " active" : ""}`}
                        onClick={() => setGrowthRange(r)}
                      >{r.toUpperCase()}</div>
                    ))}
                  </div>
                </div>
                <div className="chart-container" style={{ height: 200 }}>
                  <Line
                    data={growthConfig(growthRange)}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: scaleOpts("M") }}
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-title">📊 Engagement by Platform</span>
                </div>
                <div className="chart-container" style={{ height: 200 }}>
                  <Bar
                    data={engagementData}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: scaleOpts("%") }}
                  />
                </div>
              </div>
            </div>

            <div className="card mb-20">
              <div className="card-header">
                <span className="card-title">🎯 Engagement Breakdown</span>
                <span className="card-badge badge-up">Instagram</span>
              </div>
              {[
                { label: "Likes",    pct: 82, val: "381K",  color: "var(--grad2)",  valColor: "var(--accent3)" },
                { label: "Comments", pct: 15, val: "2.1K",  color: "var(--grad3)",  valColor: "var(--accent2)" },
                { label: "Shares",   pct: 58, val: "~14K",  color: "var(--grad1)",  valColor: "var(--accent)" },
                { label: "Saves",    pct: 35, val: "~8.4K", color: "linear-gradient(90deg,var(--gold),var(--accent3))", valColor: "var(--gold)" },
              ].map((row) => (
                <div className="eng-row" key={row.label}>
                  <span className="eng-label">{row.label}</span>
                  <div className="eng-bar">
                    <div className="eng-fill" style={{ width: 0, background: row.color }} data-w={row.pct} />
                  </div>
                  <span className="eng-val" style={{ color: row.valColor }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Charts ── */}
        {page === "charts" && (
          <div className="page active" id="page-charts">
            <div className="section-title"><span className="section-icon">◈</span>Charts &amp; Analytics</div>
            <div className="grid grid-2 mb-20">
              <div className="card">
                <div className="card-header"><span className="card-title">📈 Monthly Follower Growth (IG)</span></div>
                <div className="chart-container" style={{ height: 260 }}>
                  <Line
                    data={{
                      labels: months12,
                      datasets: [
                        { label: "IG Followers (M)", data: growth12, borderColor: "#c97fff", fill: true, tension: 0.4, pointRadius: 3 },
                        { label: "Yearly Avg", data: months12.map(() => 86.3), borderColor: "rgba(127,179,255,.4)", borderDash: [5, 5], fill: false, pointRadius: 0 },
                      ],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, scales: scaleOpts("M") }}
                  />
                </div>
              </div>
              <div className="card">
                <div className="card-header"><span className="card-title">📊 Platform Comparison</span></div>
                <div className="chart-container" style={{ height: 260 }}>
                  <Bar
                    data={{
                      labels: ["Instagram", "Twitter/X", "Facebook", "YouTube", "TikTok"],
                      datasets: [{ label: "Followers (M)", data: [94.2, 27.9, 53, 4.8, 8.2], backgroundColor: ["rgba(201,127,255,.8)", "rgba(127,179,255,.8)", "rgba(255,143,163,.8)", "rgba(114,239,173,.8)", "rgba(247,201,110,.8)"], borderRadius: 10, borderSkipped: false }],
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: scaleOpts("M") }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-2">
              <div className="card">
                <div className="card-header"><span className="card-title">🥧 Engagement Split</span></div>
                <div style={{ maxWidth: 280, margin: "0 auto" }}>
                  <Doughnut data={doughnutData} options={{ cutout: "72%", plugins: { legend: { position: "bottom" } } }} />
                </div>
              </div>
              <div className="card">
                <div className="card-header"><span className="card-title">💰 Earnings Trend (USD)</span></div>
                <div className="chart-container" style={{ height: 260 }}>
                  <Bar data={earningsData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { callback: (v) => `$${v}K` }, grid: { color: gridColor } }, x: { grid: { display: false } } } }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Posts ── */}
        {page === "posts" && (
          <div className="page active" id="page-posts">
            <div className="section-title"><span className="section-icon">⊡</span>Top Posts</div>
            <div className="post-grid">
              {POSTS.map((p, i) => <PostCard key={i} post={p} />)}
            </div>
          </div>
        )}

        {/* ── Schedule ── */}
        {page === "schedule" && (
          <div className="page active" id="page-schedule">
            <div className="section-title"><span className="section-icon">◷</span>Scheduled Posts</div>
            <div className="grid grid-2-1">
              <div className="timeline">
                {SCHEDULE.map((s, i) => <TimelineItem key={i} item={s} />)}
              </div>
              <div className="card glass-card" style={{ height: "fit-content" }}>
                <div className="card-title mb-12">📅 Post Calendar</div>
                <div id="miniCal" style={{ fontSize: 13, lineHeight: 2 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, textAlign: "center" }}>
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                      <div key={d} style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600 }}>{d}</div>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => {
                      const d = i + 1;
                      const has = [5,6,7,8,10,14,15,21,22].includes(d);
                      const today = d === 7;
                      return (
                        <div key={d} style={{
                          padding: 4, borderRadius: 6, fontSize: 12, cursor: "pointer",
                          background: today ? "var(--accent)" : has ? "rgba(201,127,255,.15)" : "transparent",
                          color: today ? "#fff" : has ? "var(--accent)" : "var(--muted)",
                          fontWeight: today || has ? 600 : 400,
                        }}>{d}</div>
                      );
                    })}
                  </div>
                </div>
                <div className="divider" />
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}><span style={{ color: "var(--accent2)" }}>●</span>3 posts scheduled this week</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}><span style={{ color: "var(--green)" }}>●</span>12 posts published this month</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ color: "var(--muted)" }}>●</span>2 drafts pending review</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Audience ── */}
        {page === "audience" && (
          <div className="page active" id="page-audience">
            <div className="section-title"><span className="section-icon">◉</span>Audience Insights</div>
            <div className="grid grid-3 mb-20">
              <div className="card">
                <div className="card-title mb-12">👥 Gender Split</div>
                <Doughnut data={{ labels: ["Female","Male","Other"], datasets: [{ data: [58,38,4], backgroundColor: ["rgba(201,127,255,.85)","rgba(127,179,255,.85)","rgba(114,239,173,.85)"], borderColor: "rgba(0,0,0,0)" }] }} options={{ cutout: "68%", plugins: { legend: { display: false } } }} />
                <div className="legend">
                  {[["#c97fff","Female","58%"],["#7fb3ff","Male","38%"],["#72efad","Other","4%"]].map(([c,l,v]) => (
                    <div className="legend-item" key={l}>
                      <span className="legend-label"><span className="legend-dot" style={{ background: c }} />{l}</span>
                      <span className="legend-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-title mb-12">🎂 Age Groups</div>
                <Doughnut data={{ labels: ["18–24","25–34","35–44","45+"], datasets: [{ data: [32,38,18,12], backgroundColor: ["rgba(255,143,163,.85)","rgba(201,127,255,.85)","rgba(127,179,255,.85)","rgba(114,239,173,.85)"], borderColor: "rgba(0,0,0,0)" }] }} options={{ cutout: "68%", plugins: { legend: { display: false } } }} />
                <div className="legend">
                  {[["#ff8fa3","18–24","32%"],["#c97fff","25–34","38%"],["#7fb3ff","35–44","18%"],["#72efad","45+","12%"]].map(([c,l,v]) => (
                    <div className="legend-item" key={l}>
                      <span className="legend-label"><span className="legend-dot" style={{ background: c }} />{l}</span>
                      <span className="legend-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-title mb-12">🌍 Top Locations</div>
                {LOCATIONS.map((l) => (
                  <div className="mb-12" key={l.country}>
                    <div className="flex-between mb-12">
                      <span style={{ fontSize: 13 }}>{l.country}</span>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{l.pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="loc-fill progress-fill" style={{ width: 0, background: l.color }} data-w={l.pct} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Feed ── */}
        {page === "feed" && (
          <div className="page active" id="page-feed">
            <div className="section-title"><span className="section-icon">◎</span>Activity Feed</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {["All","Likes","Comments","Follows"].map((t) => (
                <div key={t} className={`tab-btn${t === "All" ? " active" : ""}`}>{t}</div>
              ))}
            </div>
            <div className="feed">
              {ACTIVITIES.map((a, i) => <FeedItem key={i} item={a} />)}
            </div>
          </div>
        )}

      </main>
    </>
  );
}
