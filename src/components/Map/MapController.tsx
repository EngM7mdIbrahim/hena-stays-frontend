import { useEffect } from 'react'
import { Location } from '@commonTypes'
import { useMap } from 'react-leaflet'

export interface MapControllerProps {
  position: Location
}

export default function MapController({ position }: MapControllerProps) {
  const map = useMap()

  useEffect(() => {
    map.flyTo({
      lat: position?.coordinates![0],
      lng: position?.coordinates![1]
    })
  }, [map, position])
  return null
}
