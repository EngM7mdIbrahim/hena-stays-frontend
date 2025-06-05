import { useMemo } from 'react'

import { MarkerItem } from '@interfaces'
import { calculateDistanceBetweenLocations } from '@utils'

const CLUSTER_THRESHOLD = 0.01 // Adjust this value based on your needs
const MIN_ZOOM_FOR_SEPARATION = 15 // Zoom level at which markers start separating

export function useMapIconRendering<T extends MarkerItem>(
  zoomLevel: number,
  markers: T[] = []
) {
  return useMemo(() => {
    const clusteredMarkers: T[][] = []
    const individualMarkers: T[] = []

    if (markers.length === 0) {
      return { clusteredMarkers: [], individualMarkers: [] }
    }

    // Group markers by exact coordinates first
    const markersByCoordinates: Map<string, T[]> = new Map()

    markers.forEach((marker) => {
      const { coordinates } = marker.location
      if (!coordinates) return

      const coordKey = `${coordinates[0]},${coordinates[1]}`
      const existing = markersByCoordinates.get(coordKey) || []
      markersByCoordinates.set(coordKey, [...existing, marker])
    })

    // Convert back to array of markers or clusters
    const preprocessedMarkers: T[][] = Array.from(markersByCoordinates.values())

    // If zoom level is high enough, only keep exact coordinate clusters
    if (zoomLevel >= MIN_ZOOM_FOR_SEPARATION) {
      preprocessedMarkers.forEach((group) => {
        if (group.length > 1) {
          clusteredMarkers.push(group)
        } else {
          individualMarkers.push(group[0])
        }
      })
      return { clusteredMarkers, individualMarkers }
    }

    // Process distance-based clustering for non-exact matches
    const unprocessedGroups = [...preprocessedMarkers]

    while (unprocessedGroups.length > 0) {
      const currentGroup = unprocessedGroups.shift()!
      const cluster = [...currentGroup]
      const currentLocation = currentGroup[0].location

      // Find nearby groups
      for (let i = unprocessedGroups.length - 1; i >= 0; i -= 1) {
        const targetGroup = unprocessedGroups[i]
        const distance = calculateDistanceBetweenLocations(
          currentLocation,
          targetGroup[0].location
        )

        const adjustedThreshold = CLUSTER_THRESHOLD * (16 - zoomLevel)

        if (distance <= adjustedThreshold) {
          cluster.push(...targetGroup)
          unprocessedGroups.splice(i, 1)
        }
      }

      if (cluster.length > 1) {
        clusteredMarkers.push(cluster)
      } else {
        individualMarkers.push(cluster[0])
      }
    }

    return {
      clusteredMarkers,
      individualMarkers
    }
  }, [markers, zoomLevel])
}
