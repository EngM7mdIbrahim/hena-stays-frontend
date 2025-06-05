import { PropertiesAnalytics } from '@commonTypes'

import { isNumber } from './isNumber'

export function isPropertiesAnalytics(
  value: unknown
): value is PropertiesAnalytics {
  if (typeof value !== 'object' || value === null) return false

  const props = value as any
  return (
    isNumber(props.totalActiveProperties) &&
    isNumber(props.totalInactiveProperties) &&
    isNumber(props.totalSale) &&
    isNumber(props.totalRent) &&
    isNumber(props.averageSellingPrice) &&
    isNumber(props.averageRentingPriceDaily) &&
    isNumber(props.averageRentingPriceMonthly) &&
    isNumber(props.averageRentingPriceYearly)
  )
}
