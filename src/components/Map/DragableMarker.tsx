import { useMemo, useRef } from 'react'
import { Location } from '@commonTypes'
import { useGetPlaceDetails } from '@hooks'
import { Marker } from 'react-leaflet'

import MarkerIcon from './MarkerIcon'

export interface DraggableMarkerProps {
  position: Location
  setPosition: (position: Location) => void
  draggable?: boolean
  children?: React.ReactNode
  eventHandlers?: {
    click?: () => void
  }
}

function DraggableMarker({
  position,
  setPosition,
  draggable = true,
  children,
  eventHandlers: externalEventHandlers = {}
}: DraggableMarkerProps) {
  const markerRef = useRef<any>(null)
  const { mutate: getPlaceDetails } = useGetPlaceDetails({
    onSuccess: (data) => {
      const location = data.place
      setPosition(location)
    }
  })

  const eventHandlers = useMemo(
    () => ({
      ...externalEventHandlers,
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          getPlaceDetails({
            lat: marker.getLatLng().lat,
            lng: marker.getLatLng().lng
          })
        }
      }
    }),
    [externalEventHandlers]
  )

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={{
        lat: position?.coordinates![0],
        lng: position?.coordinates![1]
      }}
      icon={MarkerIcon}
      ref={markerRef}
    >
      {children}
    </Marker>
  )
}

export default DraggableMarker
