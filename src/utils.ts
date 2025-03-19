import readLine from 'readline'

export const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve))

export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const clearConsole = (): void => {
  console.clear()
}

export const getHint = (target: number, min: number, max: number): string => {
  const range = max - min
  if (range <= 10) return 'The number is very close!'
  if (target % 2 === 0) return 'The number is even'
  return 'The number is odd'
}
