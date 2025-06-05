import { SavedCommunityAnalytics } from '@interfaces'

import { isDateString } from './isDateString'
import { isNumber } from './isNumber'

export function isSavedCommunityAnalytics(
  value: unknown
): value is SavedCommunityAnalytics {
  if (typeof value !== 'object' || value === null) return false

  const analytics = value as any

  const hasRequiredFields =
    isNumber(analytics.profileViews) && isNumber(analytics.postsInteractions)

  const hasValidSavedAt = !analytics.savedAt || isDateString(analytics.savedAt)

  return hasRequiredFields && hasValidSavedAt
}
