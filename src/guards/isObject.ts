export function isObject<T extends object>(value: any): value is T {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    typeof value !== 'undefined'
  )
}
