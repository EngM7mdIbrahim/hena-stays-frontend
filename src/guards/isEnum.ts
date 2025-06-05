export function isEnum<T extends Record<string, string | number>>(
  actionsEnum: T,
  action: unknown
): action is T[keyof T] {
  return (
    !!action &&
    typeof action === 'string' &&
    Object.values(actionsEnum).includes(action as T[keyof T])
  )
}
