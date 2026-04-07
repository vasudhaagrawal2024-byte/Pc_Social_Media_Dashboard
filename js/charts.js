/* =========================================
   CHARTS — Chart.js initializations
   ========================================= */

Chart.defaults.color       = 'rgba(240,238,248,0.5)';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';

/* Shared instances so we can update them */
let growthChart = null;
let chartsPageInit  = false;
let audienceInit    = false;

/* ── Overview: follower growth line chart ── */
function initGrowthChart() {
  const canvas = document.getElementById('growthChart');
  if (!canvas || growthChart) return;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 200);
  grad.addColorStop(0, 'rgba(201,127,255,.3)');
  grad.addColorStop(1, 'rgba(201,127,255,0)');

  growthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months6,
      datasets: [{
        label: 'Followers (M)',
        data: growth6,
        borderColor: '#c97fff',
        backgroundColor: grad,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#c97fff',
        pointRadius: 4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: v => v + 'M' }, grid: { color: 'rgba(255,255,255,.04)' } },
        x: { grid: { display: false } },
      },
    },
  });
}

/* ── Overview: engagement by platform bar chart ── */
function initEngagementChart() {
  const canvas = document.getElementById('engagementChart');
  if (!canvas) return;
  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Instagram', 'Twitter', 'Facebook', 'YouTube'],
      datasets: [{
        label: 'Engagement Rate',
        data: [3.89, 1.2, 0.8, 2.1],
        backgroundColor: [
          'rgba(201,127,255,.7)',
          'rgba(127,179,255,.7)',
          'rgba(255,143,163,.7)',
          'rgba(114,239,173,.7)',
        ],
        borderRadius: 8,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: v => v + '%' }, grid: { color: 'rgba(255,255,255,.04)' } },
        x: { grid: { display: false } },
      },
    },
  });
}

/* ── Charts page ── */
function initChartsPage() {
  if (chartsPageInit) return;
  chartsPageInit = true;

  /* Full 12-month line */
  const lineCtx = document.getElementById('lineChartFull').getContext('2d');
  const lineGrad = lineCtx.createLinearGradient(0, 0, 0, 260);
  lineGrad.addColorStop(0, 'rgba(201,127,255,.25)');
  lineGrad.addColorStop(1, 'rgba(201,127,255,0)');

  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: months12,
      datasets: [
        {
          label: 'IG Followers (M)',
          data: growth12,
          borderColor: '#c97fff',
          backgroundColor: lineGrad,
          fill: true, tension: 0.4,
          pointBackgroundColor: '#c97fff', pointRadius: 3,
        },
        {
          label: 'Yearly Avg',
          data: months12.map(() => 86.3),
          borderColor: 'rgba(127,179,255,.4)',
          borderDash: [5, 5],
          fill: false, pointRadius: 0, tension: 0,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { boxWidth: 12, padding: 16 } } },
      scales: {
        y: { ticks: { callback: v => v + 'M' }, grid: { color: 'rgba(255,255,255,.04)' } },
        x: { grid: { display: false } },
      },
    },
  });

  /* Platform comparison bar */
  new Chart(document.getElementById('barChartFull'), {
    type: 'bar',
    data: {
      labels: ['Instagram', 'Twitter/X', 'Facebook', 'YouTube', 'TikTok'],
      datasets: [{
        label: 'Followers (M)',
        data: [94.2, 27.9, 53, 4.8, 8.2],
        backgroundColor: [
          'rgba(201,127,255,.8)', 'rgba(127,179,255,.8)',
          'rgba(255,143,163,.8)', 'rgba(114,239,173,.8)', 'rgba(247,201,110,.8)',
        ],
        borderRadius: 10, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: v => v + 'M' }, grid: { color: 'rgba(255,255,255,.04)' } },
        x: { grid: { display: false } },
      },
    },
  });

  /* Doughnut — engagement split */
  new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
      labels: ['Likes', 'Comments', 'Shares', 'Saves'],
      datasets: [{
        data: [72, 5, 15, 8],
        backgroundColor: [
          'rgba(255,143,163,.85)', 'rgba(127,179,255,.85)',
          'rgba(201,127,255,.85)', 'rgba(114,239,173,.85)',
        ],
        borderColor: 'rgba(0,0,0,0)',
        hoverOffset: 10,
      }],
    },
    options: {
      responsive: true, cutout: '72%',
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 14 } } },
    },
  });

  /* Earnings bar */
  new Chart(document.getElementById('earningsChart'), {
    type: 'bar',
    data: {
      labels: ["Feb'24", 'May', 'Aug', 'Nov', "Feb'25", 'May', 'Aug', 'Nov', "Feb'26"],
      datasets: [
        {
          label: 'Min ($K)',
          data: [222, 224, 218, 230, 235, 240, 238, 244, 216],
          backgroundColor: 'rgba(127,179,255,.6)', borderRadius: 6, borderSkipped: false,
        },
        {
          label: 'Max ($K)',
          data: [256, 258, 248, 265, 272, 278, 268, 280, 297],
          backgroundColor: 'rgba(201,127,255,.6)', borderRadius: 6, borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { boxWidth: 10 } } },
      scales: {
        y: { ticks: { callback: v => '$' + v + 'K' }, grid: { color: 'rgba(255,255,255,.04)' } },
        x: { grid: { display: false } },
      },
    },
  });
}

/* ── Audience charts ── */
function initAudienceCharts() {
  if (audienceInit) return;
  audienceInit = true;

  new Chart(document.getElementById('genderChart'), {
    type: 'doughnut',
    data: {
      labels: ['Female', 'Male', 'Other'],
      datasets: [{
        data: [58, 38, 4],
        backgroundColor: ['rgba(201,127,255,.85)', 'rgba(127,179,255,.85)', 'rgba(114,239,173,.85)'],
        borderColor: 'rgba(0,0,0,0)', hoverOffset: 8,
      }],
    },
    options: { responsive: true, cutout: '68%', plugins: { legend: { display: false } } },
  });

  new Chart(document.getElementById('ageChart'), {
    type: 'doughnut',
    data: {
      labels: ['18–24', '25–34', '35–44', '45+'],
      datasets: [{
        data: [32, 38, 18, 12],
        backgroundColor: ['rgba(255,143,163,.85)', 'rgba(201,127,255,.85)', 'rgba(127,179,255,.85)', 'rgba(114,239,173,.85)'],
        borderColor: 'rgba(0,0,0,0)', hoverOffset: 8,
      }],
    },
    options: { responsive: true, cutout: '68%', plugins: { legend: { display: false } } },
  });

  /* Location progress bars */
  const lb = document.getElementById('locationBars');
  LOCATIONS.forEach(l => {
    lb.innerHTML += `
      <div class="mb-12">
        <div class="flex-between mb-12">
          <span style="font-size:13px">${l.country}</span>
          <span style="font-size:13px;font-weight:600">${l.pct}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:0%;background:${l.color}" data-w="${l.pct}"></div>
        </div>
      </div>`;
  });

  setTimeout(() => {
    document.querySelectorAll('#locationBars .progress-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 300);
}

/* ── Tab switch (overview growth chart 6M / 1Y) ── */
function switchTab(el, _chart, range) {
  el.parentNode.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  if (growthChart) {
    growthChart.data.labels            = range === '6m' ? months6  : months12;
    growthChart.data.datasets[0].data  = range === '6m' ? growth6  : growth12;
    growthChart.update('active');
  }
}
