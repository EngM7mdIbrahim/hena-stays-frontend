export function formatNumberToShortForm(num: number): string {
  const absNum = Math.abs(num)

  if (absNum >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`
  }

  if (absNum >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }

  if (absNum >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }

  return num?.toLocaleString()
}
