import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  }
};

/**
 * Deep set a value in a nested object using a dot path
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

/**
 * Settings store for managing user preferences
 */
interface SettingsStore {
  settings: UserSettings;
  updateSetting: (path: string, value: any) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      
      /**
       * Update a specific setting using a dot path
       * @example updateSetting('typography.lineWidth', 80)
       */
      updateSetting: (path, value) => 
        set((state) => ({
          settings: setNestedValue(state.settings, path, value),
        })),
      
      /**
       * Reset all settings to defaults
       */
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'rig-canvas-settings',
    }
  )
);
