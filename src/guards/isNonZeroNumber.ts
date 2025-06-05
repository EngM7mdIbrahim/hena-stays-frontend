export function isNonZeroNumber(value: any | undefined): value is number {
  return typeof value === 'number' && value !== 0
}
