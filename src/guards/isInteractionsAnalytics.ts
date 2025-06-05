import { InteractionsPropertiesAnalytics } from '@commonTypes'

import { isNumber } from './isNumber'

export function isInteractionsAnalytics(
  value: unknown
): value is InteractionsPropertiesAnalytics {
  if (typeof value !== 'object' || value === null) return false

  const interactions = value as any
  return (
    isNumber(interactions.views) &&
    isNumber(interactions.visitors) &&
    isNumber(interactions.phone) &&
    isNumber(interactions.whatsapp) &&
    isNumber(interactions.email) &&
    isNumber(interactions.chat) &&
    isNumber(interactions.impressions) &&
    isNumber(interactions.saves)
  )
}
