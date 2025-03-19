import { NumberGuessingGame } from './game.js'
import { displayGoodbye } from './ui/messages.js'
import { playAgainPrompt } from './ui/prompts.js'

async function main() {
  const game = new NumberGuessingGame()
  let playAgain = true

  while (playAgain) {
    await game.play()
    playAgain = await playAgainPrompt()
  }

  displayGoodbye()
}

main().catch(console.error)
