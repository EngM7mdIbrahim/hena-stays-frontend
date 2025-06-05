import { Extendable } from '@commonTypes'
import { isPopulated } from '@guards'

export function extractId<U>(
  entity: Extendable<U> | undefined | null,
  key: keyof U
): string {
  return isPopulated<U>(entity) ? (entity?.[key] as string) : (entity as string)
}
