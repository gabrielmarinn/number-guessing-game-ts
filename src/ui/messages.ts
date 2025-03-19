import chalk from 'chalk'
import { gameConfig } from '../config.js'

export function displayWelcomeMessage(): void {
  console.log(chalk.green('\nWelcome to the Number Guessing Game! 🎮'))
  console.log(
    chalk.white(
      `Try to guess the number between ${gameConfig.minNumber} and ${gameConfig.maxNumber}`
    )
  )
}

export function displayGameStatus(
  guess: number,
  targetNumber: number,
  attemptsLeft: number
): void {
  if (guess < targetNumber) {
    console.log(chalk.yellow('Higher! ⬆️'))
  } else {
    console.log(chalk.yellow('Lower! ⬇️'))
  }
  console.log(chalk.cyan(`Attempts left: ${attemptsLeft}`))
}

export function displayWinMessage(attempts: number, timeSpent: number): void {
  console.log(
    chalk.green(`\n🎉 Congratulations! You've won in ${attempts} attempts!`)
  )
  console.log(chalk.green(`Time taken: ${timeSpent.toFixed(1)} seconds`))
}

export function displayGameOverMessage(targetNumber: number): void {
  console.log(chalk.red(`\n😢 Game Over! The number was ${targetNumber}`))
}

export function displayNewHighScore(difficulty: string, score: number): void {
  console.log(
    chalk.green(
      `New high score for ${difficulty} difficulty: ${score} attempts!`
    )
  )
}

export function displayHint(hint: string): void {
  console.log(chalk.magenta(`Hint: ${hint}`))
}

export function displayNoHints(): void {
  console.log(chalk.red('No more hints available!'))
}

export function displayRemainingAttempts(attempts: number): void {
  console.log(chalk.cyan(`Attempts left: ${attempts}`))
}

export function displayGoodbye(): void {
  console.log('Thanks for playing! 👋')
}
