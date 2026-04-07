/* =========================================
   DATA — Static constants for the dashboard
   ========================================= */

const STATS = {
  instagram:   94179783,
  twitter:     27900000,
  combined:    175000000,
  earnPerPost: 29000,
};

const months6  = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const months12 = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const growth6  = [88.5, 89.9, 91.2, 92.4, 93.4, 94.2];
const growth12 = [80.1, 81.4, 82.8, 83.5, 85, 86.2, 87.7, 88.5, 89.9, 91.2, 92.4, 94.2];

const POSTS = [
  {
    emoji: '🌸',
    bg: 'linear-gradient(135deg,#ff8fa3,#c97fff)',
    caption: 'Celebrating women everywhere 💪 #InternationalWomensDay',
    likes: '2.4M', comments: '18.2K', date: 'Mar 8',
  },
  {
    emoji: '🎬',
    bg: 'linear-gradient(135deg,#7fb3ff,#c97fff)',
    caption: 'On set for Varanasi with @SSRajamouli — dreams do come true 🎥',
    likes: '1.9M', comments: '14.7K', date: 'Feb 28',
  },
  {
    emoji: '✨',
    bg: 'linear-gradient(135deg,#f7c96e,#ff8fa3)',
    caption: 'My Anomaly Haircare fam — thank you for 3 years! @anomalyhaircare',
    likes: '1.6M', comments: '12.1K', date: 'Feb 14',
  },
  {
    emoji: '💜',
    bg: 'linear-gradient(135deg,#c97fff,#7fb3ff)',
    caption: 'UNICEF mission complete. Every child deserves a childhood 🌍',
    likes: '3.1M', comments: '22.4K', date: 'Jan 31',
  },
  {
    emoji: '🏆',
    bg: 'linear-gradient(135deg,#72efad,#7fb3ff)',
    caption: 'Golden Globes night! Thank you for all the love 🏆✨',
    likes: '4.2M', comments: '35.8K', date: 'Jan 10',
  },
  {
    emoji: '🫶',
    bg: 'linear-gradient(135deg,#ff8fa3,#f7c96e)',
    caption: 'Family first, always. Nick + Malti = my entire world 🫶',
    likes: '5.1M', comments: '41.2K', date: 'Dec 25',
  },
];

const SCHEDULE = [
  { time: '9:00AM',  title: 'Behind-the-scenes: Varanasi shoot',  platform: '📸 Instagram', status: 'scheduled', date: 'Apr 8' },
  { time: '12:00PM', title: "Women's empowerment thread",          platform: '𝕏 Twitter',   status: 'scheduled', date: 'Apr 8' },
  { time: '6:00PM',  title: 'Anomaly Haircare launch reel',        platform: '📸 Instagram', status: 'draft',     date: 'Apr 9' },
  { time: '10:00AM', title: 'UNICEF awareness post',               platform: '📸 Instagram', status: 'scheduled', date: 'Apr 10' },
  { time: '3:00PM',  title: 'Throwback with Nick Jonas',           platform: '📸 Instagram', status: 'posted',    date: 'Apr 7' },
  { time: '8:00AM',  title: 'Good morning motivation 🌅',          platform: '𝕏 Twitter',   status: 'posted',    date: 'Apr 6' },
  { time: '7:00PM',  title: 'SS Rajamouli collab announcement',    platform: '📸 Instagram', status: 'posted',    date: 'Apr 5' },
];

const ACTIVITIES = [
  { type: 'like',    icon: '❤️', cls: 'like',    text: '<span class="feed-highlight">@nicholasjoplinofficial</span> liked your post — "Celebrating Women\'s Day 💜"',           time: '2m ago' },
  { type: 'follow',  icon: '✦',  cls: 'follow',  text: '<span class="feed-highlight">1,842 new followers</span> in the last hour across Instagram & Twitter',                     time: '5m ago' },
  { type: 'comment', icon: '💬', cls: 'comment', text: '<span class="feed-highlight">@deepikapadukone</span> commented: "My queen! 👑❤️"',                                       time: '12m ago' },
  { type: 'share',   icon: '🔁', cls: 'share',   text: 'Your Varanasi BTS post was shared <span class="feed-highlight">4,200+ times</span> today',                               time: '18m ago' },
  { type: 'like',    icon: '❤️', cls: 'like',    text: '<span class="feed-highlight">Trending</span> on Twitter — #PriyankaChopra #Varanasi with 280K mentions',                 time: '25m ago' },
  { type: 'follow',  icon: '✦',  cls: 'follow',  text: '<span class="feed-highlight">@unicef</span> shared your post about children\'s rights campaign',                         time: '1h ago' },
  { type: 'comment', icon: '💬', cls: 'comment', text: '<span class="feed-highlight">@anomalyhaircare</span> commented: "ICONIC! Thank you PC! 💜"',                             time: '1h ago' },
  { type: 'share',   icon: '🔁', cls: 'share',   text: 'Your UNICEF post reached <span class="feed-highlight">3.1M impressions</span> — highest this month',                     time: '2h ago' },
  { type: 'follow',  icon: '✦',  cls: 'follow',  text: 'Crossed <span class="feed-highlight">94.18M followers</span> on Instagram milestone!',                                   time: '3h ago' },
  { type: 'like',    icon: '❤️', cls: 'like',    text: 'Golden Globes post has <span class="feed-highlight">4.2M likes</span> — your top performing post',                       time: '4h ago' },
];

const LOCATIONS = [
  { country: '🇮🇳 India',     pct: 38, color: 'var(--accent)' },
  { country: '🇺🇸 USA',        pct: 22, color: 'var(--accent2)' },
  { country: '🇬🇧 UK',         pct: 8,  color: 'var(--accent3)' },
  { country: '🇦🇺 Australia',  pct: 6,  color: 'var(--gold)' },
  { country: '🇨🇦 Canada',     pct: 5,  color: 'var(--green)' },
  { country: '🌏 Others',      pct: 21, color: 'var(--muted)' },
];
