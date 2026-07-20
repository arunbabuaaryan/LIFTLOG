/**
 * LIFTLOG Configuration
 * Centralized place for all constants, defaults, colors, and settings.
 * Modify here to change app behavior without touching core logic.
 */

// ========== THEME COLORS ==========
const THEME_CONFIG = {
  dark: {
    bg: '#0a0b10',
    surface: '#15171f',
    surfaceRaised: '#1c1f29',
    border: 'rgba(255,255,255,0.07)',
    borderStrong: 'rgba(255,255,255,0.12)',
    text: '#f2f3f6',
    textDim: '#8b90a3',
    textFaint: '#565b6c',
    accent: '#5b7fff',
    success: '#34d399',
    successBg: '#132a20',
    successGlow: 'rgba(52,211,153,.55)',
    successBorder: 'rgba(52,211,153,.4)',
    danger: '#f2555a',
    dangerBg: '#2a1518',
    headerGradA: '#171922',
    headerGradB: '#121319',
    controlBg: '#262a36',
    controlBgActive: '#2d3240',
    doneBg: '#2c5b41',
    cardShadow: '0 1px 2px rgba(0,0,0,.2), 0 4px 14px rgba(0,0,0,.18)',
    streakColor: '#ffa361',
    ringTrack: '#2a2d3a',
    colorScheme: 'dark'
  },
  light: {
    bg: '#ffffff',
    surface: '#ffffff',
    surfaceRaised: '#f6f6f8',
    border: 'rgba(20,20,25,0.09)',
    borderStrong: 'rgba(20,20,25,0.15)',
    text: '#1a1a1e',
    textDim: '#6b6b74',
    textFaint: '#a3a3ac',
    accent: '#2f3f75',
    success: '#2f7a52',
    successBg: '#eef7f1',
    successGlow: 'rgba(47,122,82,.28)',
    successBorder: 'rgba(47,122,82,.4)',
    danger: '#b23b3b',
    dangerBg: '#fbeeec',
    headerGradA: '#ffffff',
    headerGradB: '#fafafb',
    controlBg: '#f6f6f8',
    controlBgActive: '#ececef',
    doneBg: '#2f7a52',
    cardShadow: '0 1px 2px rgba(20,20,25,.04), 0 8px 20px rgba(20,20,25,.06)',
    streakColor: '#a8712e',
    ringTrack: '#ececef',
    colorScheme: 'light'
  }
};

// ========== DAY PALETTE (for color cycling) ==========
const DAY_PALETTE = ['#4f7cff', '#ff6b4a', '#3ecf6e', '#b06bff', '#ffcb4a', '#ff5c93', '#5ce1e6', '#f2a65a'];

// ========== EQUIPMENT & WEIGHTS ==========
const EQUIPMENT_CONFIG = {
  dumbbells: [11, 22, 33, 44, 55], // lb per dumbbell
  beltIncrement: 5 // lb, weighted pull-up/chin-up belt
};

// ========== EXERCISE DEFAULTS ==========
const EXERCISE_DEFAULTS = {
  setsMin: 3,
  setsMax: 5,
  repLow: 8,
  repHigh: 12,
  repIncrement: 2,
  failThreshold: 3,
  restBetweenSets: 60 // seconds
};

// ========== WORKOUT DAYS (easily customizable) ==========
const DEFAULT_DAYS = [
  {
    id: 'shoulders',
    label: 'Shoulders',
    icon: '💪',
    color: '#4f7cff',
    exercises: [
      { id: 'db_press', name: 'DB Shoulder Press', mode: 'weighted', sets: 5, repLow: 5, repHigh: 8, rest: 120 },
      { id: 'lat_raise', name: 'Lateral Raise (side delt priority)', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 60 },
      { id: 'lat_raise_2', name: 'Bent-Over Lateral Raise', mode: 'weighted', sets: 2, repLow: 10, repHigh: 15, rest: 60 },
      { id: 'rear_delt', name: 'Rear Delt Fly', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 60 },
      { id: 'shrug', name: 'DB Shrug', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 60 }
    ]
  },
  {
    id: 'chest',
    label: 'Chest',
    icon: '🎽',
    color: '#ff6b4a',
    exercises: [
      { id: 'db_bench', name: 'DB Bench Press', mode: 'weighted', sets: 5, repLow: 5, repHigh: 8, rest: 150 },
      { id: 'incline_press', name: 'Incline DB Press', mode: 'weighted', sets: 4, repLow: 6, repHigh: 10, rest: 120 },
      { id: 'flyes', name: 'DB Flyes', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 60 },
      { id: 'close_grip', name: 'Close-Grip Press', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 90 },
      { id: 'pullover', name: 'DB Pullover', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 60 }
    ]
  },
  {
    id: 'back',
    label: 'Back',
    icon: '🔺',
    color: '#3ecf6e',
    exercises: [
      { id: 'pullups', name: 'Wide-Grip Pull-ups (width priority)', mode: 'weighted_bw', sets: 6, repLow: 5, repHigh: 10, rest: 150 },
      { id: 'db_row', name: 'DB Row', mode: 'weighted', sets: 5, repLow: 6, repHigh: 10, rest: 90 },
      { id: 'chinups', name: 'Chin-ups', mode: 'weighted_bw', sets: 3, repLow: 5, repHigh: 10, rest: 120 },
      { id: 'reverse_fly', name: 'Reverse Flyes', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 60 },
      { id: 'db_deadlift', name: 'DB Deadlift', mode: 'weighted', sets: 5, repLow: 5, repHigh: 8, rest: 150 }
    ]
  },
  {
    id: 'legs',
    label: 'Legs',
    icon: '🦵',
    color: '#b06bff',
    exercises: [
      { id: 'goblet_squat', name: 'DB Goblet Squat', mode: 'weighted', sets: 5, repLow: 5, repHigh: 10, rest: 150 },
      { id: 'sumo_squat', name: 'DB Sumo Squat (width priority)', mode: 'weighted', sets: 3, repLow: 8, repHigh: 12, rest: 120 },
      { id: 'lunges', name: 'DB Lunges', mode: 'weighted', sets: 4, repLow: 8, repHigh: 12, rest: 90 },
      { id: 'rdl', name: 'DB Romanian Deadlift', mode: 'weighted', sets: 4, repLow: 6, repHigh: 10, rest: 120 },
      { id: 'calf_raise', name: 'Calf Raises (priority)', mode: 'weighted', sets: 5, repLow: 10, repHigh: 15, rest: 45 },
      { id: 'calf_raise_single', name: 'Single-Leg Calf Raise', mode: 'bodyweight', sets: 2, startReps: 12, rest: 45 }
    ]
  },
  {
    id: 'abs',
    label: 'Abs',
    icon: '🔥',
    color: '#ffcb4a',
    exercises: [
      { id: 'weighted_crunch', name: 'Weighted Crunch', mode: 'weighted', sets: 4, repLow: 10, repHigh: 15, rest: 45 },
      { id: 'russian_twist', name: 'Russian Twists', mode: 'weighted', sets: 3, repLow: 12, repHigh: 20, rest: 45 },
      { id: 'leg_raise', name: 'Leg Raises', mode: 'bodyweight', sets: 4, startReps: 8, rest: 45 },
      { id: 'plank', name: 'Plank', mode: 'timed', sets: 3, startSeconds: 30, rest: 45 },
      { id: 'side_bend', name: 'Side Bends', mode: 'weighted', sets: 3, repLow: 12, repHigh: 20, rest: 45 }
    ]
  }
];

// ========== STORAGE KEYS ==========
const STORAGE_CONFIG = {
  main: 'liftlog_v1',
  test: 'liftlog_v1_test',
  testModeFlag: 'liftlog_test_mode_active',
  theme: 'liftlog_theme',
  userSettings: 'liftlog_user_settings', // NEW: User-modifiable settings
  schemaVersion: 1
};

// ========== USER-MODIFIABLE SETTINGS (Stored in localStorage) ==========
const USER_SETTINGS_DEFAULTS = {
  // Equipment
  dumbbells: [11, 22, 33, 44, 55],
  beltIncrement: 5,
  // Exercise progressions
  setsMin: 3,
  setsMax: 5,
  repLow: 8,
  repHigh: 12,
  repIncrement: 2,
  failThreshold: 3,
  // Session & timing
  sessionCarryoverHours: 6,
  weeklyMinDays: 3,
  transitionRestSeconds: 60,
  // Analytics
  chartMonthsBack: 6,
  recentDaysBack: 30
};

// ========== TIMING & THRESHOLDS ==========
const TIMING_CONFIG = {
  sessionCarryoverHours: 6,
  weeklyMinDays: 3,
  transitionRestSeconds: 60,
  swipeMinDx: 45,
  swipeMaxDy: 70,
  swipeTimeLimit: 700,
  undoToastDuration: 6000,
  headerBuffer: 90,
  setChangeFlashDuration: 350
};

// ========== UI SIZES & SPACING ==========
const UI_CONFIG = {
  headerPadding: '18px 16px 15px',
  mainPadding: '16px',
  cardMargin: '12px',
  cardPadding: '16px',
  cardRadius: '16px',
  tabRadius: '22px',
  buttonRadius: '11px',
  smallButtonRadius: '9px',
  timerFabSize: '92px',
  timerFabRadius: '46px'
};

// ========== CHART & ANALYTICS ==========
const CHART_CONFIG = {
  monthsBack: 6,
  recentDaysBack: 30,
  maxPRsStored: 20,
  maxHeight: '220px',
  metrics: ['e1rm', 'weight', 'volume'],
  ranges: {
    all: 'all',
    '90': '90',
    '30': '30'
  }
};

// ========== ANIMATION & TRANSITIONS ==========
const ANIMATION_CONFIG = {
  fadeSlideIn: 'fadeSlide .3s cubic-bezier(.2,.7,.3,1)',
  levelUpPulse: 'levelUpPulse 1s ease-out',
  urgentPulse: 'urgentPulse 0.5s ease-in-out infinite',
  setChanged: 'setChanged .35s ease',
  transition: '.15s ease',
  shortTransition: '.1s ease'
};

// ========== NAVIGATION ==========
const NAV_CONFIG = {
  views: ['workout', 'progress', 'history', 'manage'],
  tabs: [
    { view: 'workout', icon: '🏋️', label: 'Workout' },
    { view: 'progress', icon: '📈', label: 'Progress' },
    { view: 'history', icon: '🗒️', label: 'History' }
  ]
};

// ========== PROGRESS SCROLL ANCHORS ==========
const PROGRESS_SCROLL_ANCHORS = ['pcard-overview', 'pcard-prs', 'pcard-balance', 'pcard-bests', 'pcard-duration', 'pcard-progression'];

// ========== EXERCISE MODES (easily extensible) ==========
const EXERCISE_MODES = {
  weighted: {
    name: 'Weighted',
    hasWeight: true,
    trackType: 'reps',
    defaultDisplay: 'weight × reps'
  },
  bodyweight: {
    name: 'Bodyweight',
    hasWeight: false,
    trackType: 'reps',
    defaultDisplay: 'reps'
  },
  weighted_bw: {
    name: 'Weighted Bodyweight',
    hasWeight: true,
    trackType: 'reps',
    defaultDisplay: 'added weight + reps'
  },
  timed: {
    name: 'Timed',
    hasWeight: false,
    trackType: 'seconds',
    defaultDisplay: 'duration'
  }
};

// ========== EXTERNAL LIBRARIES ==========
const EXTERNAL_SCRIPTS = {
  chartjs: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  googleGSI: 'https://accounts.google.com/gsi/client'
};

// ========== PWA CONFIG ==========
const PWA_CONFIG = {
  manifestPath: 'manifest.json',
  icons: {
    touchIcon: 'icon-192.png',
    splashImage: 'icon-512-splash.png'
  },
  themeDark: '#111827',
  themeLight: '#ffffff'
};

// ========== HELPER: Load user settings and merge with defaults ==========
function loadUserSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_CONFIG.userSettings);
    const userSettings = saved ? JSON.parse(saved) : {};
    return { ...USER_SETTINGS_DEFAULTS, ...userSettings };
  } catch (e) {
    return { ...USER_SETTINGS_DEFAULTS };
  }
}

// ========== HELPER: Save user settings ==========
function saveUserSettings(settings) {
  try {
    localStorage.setItem(STORAGE_CONFIG.userSettings, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save user settings:', e);
  }
}

// ========== HELPER: Get a user setting with fallback to defaults ==========
function getUserSetting(key, defaultValue) {
  const settings = loadUserSettings();
  return settings[key] !== undefined ? settings[key] : defaultValue;
}

// ========== HELPER: Update a single user setting ==========
function updateUserSetting(key, value) {
  const settings = loadUserSettings();
  settings[key] = value;
  saveUserSettings(settings);
}

// ========== EXPORT FOR USE ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    THEME_CONFIG,
    DAY_PALETTE,
    EQUIPMENT_CONFIG,
    EXERCISE_DEFAULTS,
    DEFAULT_DAYS,
    STORAGE_CONFIG,
    USER_SETTINGS_DEFAULTS,
    TIMING_CONFIG,
    UI_CONFIG,
    CHART_CONFIG,
    ANIMATION_CONFIG,
    NAV_CONFIG,
    PROGRESS_SCROLL_ANCHORS,
    EXERCISE_MODES,
    EXTERNAL_SCRIPTS,
    PWA_CONFIG,
    loadUserSettings,
    saveUserSettings,
    getUserSetting,
    updateUserSetting
  };
}
