import { GameState, DIFFICULTY_SETTINGS, Difficulty } from './types.js'
import { gameConfig } from './config.js'
import { generateRandomNumber } from './utils/random.js'
import { generateHints } from './utils/hints.js'
import * as ui from './ui/messages.js'
import * as prompts from './ui/prompts.js'

export class NumberGuessingGame {
  private state: GameState

  constructor() {
    this.state = {
      difficulty: 'medium',
      targetNumber: generateRandomNumber(
        gameConfig.minNumber,
        gameConfig.maxNumber
      ),
      attemptsLeft: DIFFICULTY_SETTINGS.medium.attempts,
      attempts: 0,
      startTime: Date.now(),
      hints: [],
      highScores: { easy: Infinity, medium: Infinity, hard: Infinity },
    }
  }

  private updateHighScore(): void {
    const currentScore = this.state.attempts
    if (currentScore < this.state.highScores[this.state.difficulty]) {
      this.state.highScores[this.state.difficulty] = currentScore
      ui.displayNewHighScore(this.state.difficulty, currentScore)
    }
  }

  private async getHint(): Promise<void> {
    if (
      this.state.hints.length >=
      DIFFICULTY_SETTINGS[this.state.difficulty].hintCount
    ) {
      ui.displayNoHints()
      return
    }

    const availableHints = generateHints(this.state.targetNumber)
    const unusedHints = availableHints.filter(
      (hint) => !this.state.hints.includes(hint)
    )

    if (unusedHints.length > 0) {
      const hint = unusedHints[Math.floor(Math.random() * unusedHints.length)]
      this.state.hints.push(hint)
      ui.displayHint(hint)
    }
  }

  private async initializeGame(difficulty: Difficulty): Promise<void> {
    this.state.difficulty = difficulty
    this.state.attemptsLeft = DIFFICULTY_SETTINGS[difficulty].attempts
    this.state.targetNumber = generateRandomNumber(
      gameConfig.minNumber,
      gameConfig.maxNumber
    )
    this.state.attempts = 0
    this.state.startTime = Date.now()
    this.state.hints = []
  }

  public async play(): Promise<boolean> {
    ui.displayWelcomeMessage()

    const difficulty = await prompts.getDifficulty()
    await this.initializeGame(difficulty)

    while (this.state.attemptsLeft > 0) {
      const action = await prompts.getAction()

      if (action === 'Get a hint') {
        await this.getHint()
        continue
      }

      if (action === 'Show remaining attempts') {
        ui.displayRemainingAttempts(this.state.attemptsLeft)
        continue
      }

      const guess = await prompts.getGuess()
      this.state.attempts++
      this.state.attemptsLeft--

      if (guess === this.state.targetNumber) {
        const timeSpent = (Date.now() - this.state.startTime) / 1000
        ui.displayWinMessage(this.state.attempts, timeSpent)
        this.updateHighScore()
        return true
      }

      ui.displayGameStatus(
        guess,
        this.state.targetNumber,
        this.state.attemptsLeft
      )

      if (this.state.attemptsLeft === 0) {
        ui.displayGameOverMessage(this.state.targetNumber)
        return false
      }
    }

    return false
  }
}
