import { isNumber } from '@guards'

export const calculatePercentageDifference = (
  newValue: number | null = 0,
  oldValue: number | null = 0
): number => {
  if (isNumber(newValue) && isNumber(oldValue) && oldValue !== 0) {
    return ((newValue - oldValue) / oldValue) * 100
  }
  return 0
}
