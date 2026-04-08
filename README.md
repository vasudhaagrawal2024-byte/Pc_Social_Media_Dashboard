# PC Studio — Social Dashboard

Priyanka Chopra's social media analytics dashboard, split into a clean multi-file project.

---

## Project Structure

```
pc-dashboard/
│
├── index.html              ← Entry point (vanilla HTML/JS version)
│
├── css/
│   ├── variables.css       ← CSS custom properties, reset, utilities
│   ├── layout.css          ← Sidebar, topbar, main container, overlay
│   ├── components.css      ← Cards, stat cards, charts, tabs, badges, grids
│   └── pages.css           ← Posts grid, timeline, feed, audience + responsive
│
├── js/
│   ├── data.js             ← All static data: STATS, POSTS, SCHEDULE, ACTIVITIES, LOCATIONS
│   ├── ui.js               ← DOM builders: counter animation, buildPosts, buildSchedule, buildFeed
│   ├── charts.js           ← All Chart.js initializations (growth, engagement, doughnut, earnings…)
│   └── app.js              ← Page routing, sidebar toggle, theme switch, search, DOMContentLoaded init
│
├── PCDashboard.jsx         ← Full React component version (uses react-chartjs-2)
│
└── README.md               ← This file
```

---

## Vanilla HTML version

Open `index.html` directly in a browser — no build step needed.

**Script load order in `index.html`:**
1. `chart.umd.min.js` (CDN)
2. `js/data.js`
3. `js/ui.js`
4. `js/charts.js`
5. `js/app.js`

---

## React version

### Dependencies
```bash
npm install chart.js react-chartjs-2
```

### Usage
```jsx
import PCDashboard from './PCDashboard';

function App() {
  return <PCDashboard />;
}
```

The React component imports from `./data.js` and uses the same CSS files.
Add the four CSS files to your project and import them in your root `index.js` / `main.jsx`:

```js
import './css/variables.css';
import './css/layout.css';
import './css/components.css';
import './css/pages.css';
```

### Vite setup (recommended)
```bash
npm create vite@latest my-dashboard -- --template react
cd my-dashboard
npm install chart.js react-chartjs-2
# copy the files in, then:
npm run dev
```

---

## Pages

| Page       | Route key   | Description                             |
|------------|-------------|------------------------------------------|
| Overview   | `overview`  | Stats, mini cards, growth chart, eng bars |
| Charts     | `charts`    | Full line, bar, doughnut, earnings charts |
| Top Posts  | `posts`     | Instagram post grid with hover overlays  |
| Scheduled  | `schedule`  | Timeline + mini calendar                 |
| Audience   | `audience`  | Gender, age, location charts             |
| Activity   | `feed`      | Live activity feed                       |

---

## Features

- Dark / light theme toggle
- Sidebar collapse (desktop) + mobile drawer
- Animated counters on page load
- Animated engagement progress bars
- Chart.js-powered charts with gradient fills
- Responsive grid — 4 → 2 → 1 columns
- Notification panel
- Search-to-navigate

Deployed link - https://vasudhaagrawal2024-byte.github.io/Pc_Social_Media_Dashboard/
