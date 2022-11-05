export function setItem(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item))
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}
