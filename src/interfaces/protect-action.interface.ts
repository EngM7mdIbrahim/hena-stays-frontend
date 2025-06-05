import { Entities } from '@commonTypes'

export interface ProtectAction<T = string> {
  entity: Entities
  action: T
  id: string
}

export type ActionCallback<T> = (
  action: ProtectAction<T>
) => Promise<void> | void
