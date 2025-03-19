export function generateHints(targetNumber: number): string[] {
  return [
    `The number is ${targetNumber % 2 === 0 ? 'even' : 'odd'}`,
    `The number is ${
      targetNumber % 5 === 0 ? 'divisible' : 'not divisible'
    } by 5`,
    `The sum of its digits is ${String(targetNumber)
      .split('')
      .reduce((a, b) => a + parseInt(b), 0)}`,
  ]
}
