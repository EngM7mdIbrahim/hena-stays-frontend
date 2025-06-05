export async function safeFetch<T, R>(
  action: (...args: T[]) => Promise<R>,
  args: T[] = [],
  onError?: (error: Error) => void
): Promise<
  | {
      success: true
      data: R
    }
  | {
      success: false
      data: null
      error: Error
    }
> {
  try {
    const data = await action(...args)
    return { success: true, data }
  } catch (error) {
    onError?.(error as Error)
    return { success: false, data: null, error: error as Error }
  }
}
