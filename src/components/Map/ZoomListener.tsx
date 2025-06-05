import { LeafletEvent } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

export interface ZoomListenerProps {
  onZoomChange: (zoom: number) => void
}

export default function ZoomListener({ onZoomChange }: ZoomListenerProps) {
  useMapEvents({
    zoomend: (e: LeafletEvent) => {
      onZoomChange(e.target.getZoom())
    }
  })
  return null
}
