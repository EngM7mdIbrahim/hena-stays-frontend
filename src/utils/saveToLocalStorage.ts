export function saveToLocalStorage<T extends object>(key: string, data: T) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}
