import { SavedAnalytics } from '@interfaces'

import { isDateString } from './isDateString'
import { isInteractionsAnalytics } from './isInteractionsAnalytics'
import { isNumber } from './isNumber'
import { isPropertiesAnalytics } from './isPropertiesAnalytics'

export function isSavedAnalytics(value: unknown): value is SavedAnalytics {
  if (typeof value !== 'object' || value === null) return false

  const analytics = value as any
  return (
    isNumber(analytics.conversionRate) &&
    isDateString(analytics.savedAt) &&
    isPropertiesAnalytics(analytics.propertiesAnalytics) &&
    isInteractionsAnalytics(analytics.interactionsAnalytics)
  )
}
