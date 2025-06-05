import L from 'leaflet'

export interface ClusterMarkerIconProps {
  count: number
}

export default function createClusterMarkerIcon({
  count
}: ClusterMarkerIconProps) {
  return L.divIcon({
    html: `<div class="bg-secondary rounded-full w-[40px] h-[40px] flex items-center justify-center text-white font-semibold">${count}</div>`,
    className: 'custom-cluster-icon',
    iconSize: L.point(40, 40),
    iconAnchor: L.point(20, 20)
  })
}
