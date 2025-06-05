import { Location } from '@commonTypes'

export function calculateDistanceBetweenLocations(
  loc1: Location,
  loc2: Location
): number {
  const [lat1, lng1] = loc1.coordinates!
  const [lat2, lng2] = loc2.coordinates!
  return Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2)
}
