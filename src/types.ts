export interface GameState {
  difficulty: Difficulty
  targetNumber: number
  attemptsLeft: number
  attempts: number
  startTime: number
  hints: string[]
  highScores: HighScores
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface HighScores {
  easy: number
  medium: number
  hard: number
}

export interface DifficultyConfig {
  attempts: number
  hintCount: number
}

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultyConfig> = {
  easy: { attempts: 10, hintCount: 3 },
  medium: { attempts: 7, hintCount: 2 },
  hard: { attempts: 5, hintCount: 1 },
}

export interface GameConfig {
  minNumber: number
  maxNumber: number
}
