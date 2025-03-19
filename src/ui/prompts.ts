import inquirer from 'inquirer'
import { Difficulty } from '../types.js'
import { gameConfig } from '../config.js'

export async function getDifficulty(): Promise<Difficulty> {
  const { difficulty } = await inquirer.prompt([
    {
      type: 'list',
      name: 'difficulty',
      message: 'Select difficulty level:',
      choices: ['easy', 'medium', 'hard'],
    },
  ])
  return difficulty
}

export async function getAction(): Promise<string> {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose your action:',
      choices: ['Make a guess', 'Get a hint', 'Show remaining attempts'],
    },
  ])
  return action
}

export async function getGuess(): Promise<number> {
  const { guess } = await inquirer.prompt([
    {
      type: 'input',
      name: 'guess',
      message: 'Enter your guess:',
      validate: (input: string) => {
        const num = parseInt(input, 10)
        return num >= gameConfig.minNumber && num <= gameConfig.maxNumber
          ? true
          : `Please enter a number between ${gameConfig.minNumber} and ${gameConfig.maxNumber}`
      },
    },
  ])
  return parseInt(guess, 10)
}

export async function playAgainPrompt(): Promise<boolean> {
  const { again } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'again',
      message: 'Would you like to play again?',
      default: true,
    },
  ])
  return again
}
