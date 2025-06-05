import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Entities } from '@commonTypes'
import { SEARCH_PARAM_KEYS } from '@constants'
import { isEnum } from '@guards'

import { ActionCallback, ProtectAction } from '@interfaces'

export function useActionListener<T extends Record<string, string | number>>(
  actionsEnum: T,
  actions: Partial<Record<T[keyof T], ActionCallback<T[keyof T]>>>
) {
  const executed = useRef<boolean | null>(null)
  const searchParams = useSearchParams()
  const action = useMemo(() => {
    const actionParams = searchParams.get(SEARCH_PARAM_KEYS.ACTION_KEY)
    return isEnum(actionsEnum, actionParams) ? actionParams : null
  }, [searchParams])

  const id = useMemo(
    () => searchParams.get(SEARCH_PARAM_KEYS.ID_KEY),
    [searchParams]
  )

  const entity = useMemo(() => {
    const entityParams = searchParams.get(SEARCH_PARAM_KEYS.ENTITY_KEY)
    return isEnum(Entities, entityParams) ? entityParams : null
  }, [searchParams])

  const protectAction: ProtectAction<T[keyof T]> | null = useMemo(() => {
    if (!action || !entity || !id) {
      return null
    }
    return {
      entity,
      action,
      id
    }
  }, [action, entity, id, actions])

  useEffect(() => {
    if (!protectAction || !actions[protectAction.action] || executed.current) {
      return
    }
    executed.current = true
    actions[protectAction.action]!(protectAction)
  }, [protectAction, executed])
}
