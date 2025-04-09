import { createStore } from './createStore';

/**
 * Typography settings for the writing experience
 */
export interface TypographySettings {
  /** Primary font for content */
  fontPrimary: string;
  /** Secondary font for headings */
  fontSecondary?: string;
  /** Line width in characters */
  lineWidth: number;
  /** Paragraph spacing in rem units */
  paragraphSpacing: number;
  /** Line height multiplier */
  lineHeight: number;
  /** Enable smart typography features */
  smartTypography: boolean;
  /** Font size adjustment for reading mode (multiplier) */
  readingModeFontSize: number;
}

/**
 * Theme settings for each writing mode
 */
export interface ThemeSettings {
  /** Theme for brainstorming mode */
  brainstorming: {
    background: string;
    accent: string;
    text: string;
  };
  /** Theme for drafting mode */
  drafting: {
    background: string;
    accent: string;
    text: string;
  };
  /** Theme for editing mode */
  editing: {
    background: string;
    accent: string;
    text: string;
  };
  /** Theme for reviewing mode */
  reviewing: {
    background: string;
    accent: string;
    text: string;
  };
}

/**
 * Focus mode settings
 */
export interface FocusSettings {
  /** Duration of pomodoro session in minutes */
  pomodoroDuration: number;
  /** Duration of short break in minutes */
  shortBreakDuration: number;
  /** Duration of long break in minutes */
  longBreakDuration: number;
  /** Enable focus sounds */
  enableSounds: boolean;
  /** Current writing mode */
  writingMode: 'brainstorming' | 'drafting' | 'editing' | 'reviewing';
}

/**
 * UI settings
 */
export interface UISettings {
  /** Fade in UI elements only when mouse is near edges */
  fadeInUiElements: boolean;
  /** Toggle between light and dark mode */
  darkMode: boolean;
  /** Enable animations */
  enableAnimations: boolean;
}

/**
 * Editor settings
 */
export interface EditorSettings {
  /** Enable spell checking */
  enableSpellCheck: boolean;
  /** Enable readability analysis */
  enableReadabilityCheck: boolean;
  /** Show word count */
  showWordCount: boolean;
  /** Auto-save interval in seconds (0 to disable) */
  autoSaveInterval: number;
}

/**
 * Complete user settings
 */
export interface UserSettings {
  typography: TypographySettings;
  focus: FocusSettings;
  ui: UISettings;
  editor: EditorSettings;
  themes: ThemeSettings;
}

/**
 * Default settings
 */
const DEFAULT_SETTINGS: UserSettings = {
  typography: {
    fontPrimary: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSecondary: 'Georgia, serif',
    lineWidth: 70, // 70 characters
    paragraphSpacing: 1.5,
    lineHeight: 1.6,
    smartTypography: true,
    readingModeFontSize: 1.1, // 10% larger
  },
  focus: {
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    enableSounds: false,
    writingMode: 'drafting',
  },
  ui: {
    fadeInUiElements: true,
    darkMode: true,
    enableAnimations: true,
  },
  editor: {
    enableSpellCheck: true,
    enableReadabilityCheck: false,
    showWordCount: true,
    autoSaveInterval: 30, // 30 seconds
  },
  themes: {
    brainstorming: {
      background: '#111827', // Dark blue
      accent: '#8b5cf6',     // Purple
      text: '#f3f4f6'
    },
    drafting: {
      background: '#111827', // Dark blue
      accent: '#3b82f6',     // Blue
      text: '#f3f4f6'
    },
    editing: {
      background: '#111827', // Dark blue
      accent: '#10b981',     // Green
      text: '#f3f4f6'
    },
    reviewing: {
      background: '#111827', // Dark blue
      accent: '#f59e0b',     // Amber
      text: '#f3f4f6'
    }
  }
};

/**
 * Store state type
 */
interface SettingsState {
  settings: UserSettings;
}

/**
 * Store actions type
 */
interface SettingsActions {
  /**
   * Update a specific setting using a dot path
   * @example updateSetting('typography.lineWidth', 80)
   */
  updateSetting: (path: string, value: any) => void;
  
  /**
   * Reset all settings to defaults
   */
  resetSettings: () => void;
}

/**
 * Helper function: Deep set a value in a nested object using a dot path
 */
const setNestedValue = (obj: any, path: string, value: any): any => {
  const clone = { ...obj };
  const parts = path.split('.');
  let current = clone;
  
  // Navigate to the right depth
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    current[part] = { ...current[part] };
    current = current[part];
  }
  
  // Set the value
  current[parts[parts.length - 1]] = value;
  return clone;
};

// Initial state
const initialState: SettingsState = {
  settings: DEFAULT_SETTINGS
};

// Actions
const actions = (set: (fn: (state: SettingsState) => SettingsState) => void) => ({
  updateSetting: (path: string, value: any) => 
    set((state) => ({
      settings: setNestedValue(state.settings, path, value),
    })),
  
  resetSettings: () => 
    set(() => ({
      settings: DEFAULT_SETTINGS,
    })),
});

/**
 * Settings store for managing user preferences
 */
export const useSettingsStore = createStore<SettingsState, SettingsActions>(
  initialState,
  actions,
  {
    name: 'rig-canvas-settings',
    persist: true
  }
);
