export function getFromLocalStorage<T>(
  key: string,
  guard: (data: any) => data is T
) {
  const data = localStorage.getItem(key)
  const parsed = data ? JSON.parse(data) : null

  if (parsed && guard(parsed)) {
    return parsed
  }
  return null
}
