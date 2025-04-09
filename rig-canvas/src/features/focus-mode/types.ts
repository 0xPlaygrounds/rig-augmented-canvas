/**
 * Types for the focus-mode feature
 */

/**
 * Writing modes available in focus mode
 */
export type WritingMode = 'brainstorming' | 'drafting' | 'editing' | 'reviewing';

/**
 * Writing mode information
 */
export interface WritingModeInfo {
  /** Mode identifier */
  id: WritingMode;
  /** Display name */
  name: string;
  /** Icon name or component */
  icon: React.ReactNode;
  /** Description */
  description: string;
}

/**
 * Focus mode session statistics
 */
export interface FocusSessionStats {
  /** Duration in milliseconds */
  duration: number;
  /** Words written */
  wordsWritten: number;
  /** Words deleted */
  wordsDeleted?: number;
  /** Start time */
  startTime: Date;
  /** End time (if completed) */
  endTime?: Date;
  /** Writing mode used */
  mode: WritingMode;
  /** Session goal */
  goal?: string;
}

/**
 * Pomodoro timer state
 */
export interface PomodoroState {
  /** Is the timer active */
  active: boolean;
  /** Current minutes */
  minutes: number;
  /** Current seconds */
  seconds: number;
  /** Is this a break period */
  isBreak: boolean;
  /** Duration of the pomodoro in minutes */
  duration: number;
}

/**
 * Theme settings for a specific writing mode
 */
export interface WritingModeTheme {
  /** Background color */
  background: string;
  /** Accent color */
  accent: string;
  /** Text color */
  text: string;
}

/**
 * Text-to-speech state
 */
export interface TTSState {
  /** Is speech currently playing */
  isSpeaking: boolean;
  /** Voice used */
  voice?: SpeechSynthesisVoice;
  /** Speech rate */
  rate: number;
  /** Speech pitch */
  pitch: number;
}

/**
 * Typography settings for the focus mode
 */
export interface TypographySettings {
  /** Line width in characters */
  lineWidth: number;
  /** Paragraph spacing in rem units */
  paragraphSpacing: number;
  /** Font size for reading mode (multiplier) */
  readingModeFontSize: number;
}

/**
 * Options for creating a focus mode
 */
export interface FocusModeOptions {
  /** Initial content */
  initialContent: string;
  /** Save callback */
  onSave?: (content: string) => void;
  /** Close callback */
  onClose?: () => void;
  /** Initial writing mode */
  initialMode?: WritingMode;
  /** Starting session goal */
  initialGoal?: string;
  /** Enable pomodoro timer */
  enablePomodoro?: boolean;
  /** Custom themes for writing modes */
  themes?: Record<WritingMode, WritingModeTheme>;
  /** Typography settings */
  typography?: Partial<TypographySettings>;
}
