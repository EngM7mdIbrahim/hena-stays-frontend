'use client'

import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import 'leaflet/dist/leaflet.css'

import { Location } from '@commonTypes'
import { DEFAULT_MAP_POSITION } from '@constants'
import { useMapIconRendering } from '@hooks'

import { cn } from '@utils'

import createClusterMarkerIcon from './ClusterMarkerIcon'

const Tooltip = dynamic(
  () => import('react-leaflet').then((mod) => mod.Tooltip),
  { ssr: false }
)

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const DraggableMarker = dynamic(
  () => import('./DragableMarker').then((mod) => mod.default),
  { ssr: false }
)

const MapController = dynamic(
  () => import('./MapController').then((mod) => mod.default),
  { ssr: false }
)

const ZoomListener = dynamic(
  () => import('./ZoomListener').then((mod) => mod.default),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

export interface MapProps<
  T extends { location: Location } = { location: Location }
> {
  className?: string
  initialPosition?: Location
  onPositionChange?: (position: Location) => void
  draggable?: boolean
  markerItems?: T[]
  renderTooltip?: (items: T[]) => React.ReactNode
  onMarkerItemsClick?: (items: T[]) => void
}

function Map<T extends { location: Location; _id: string }>({
  className,
  initialPosition,
  markerItems,
  onPositionChange,
  draggable = true,
  renderTooltip,
  onMarkerItemsClick
}: MapProps<T>) {
  const [position, setPosition] = useState<Location>(
    initialPosition ?? DEFAULT_MAP_POSITION
  )
  const [zoomLevel, setZoomLevel] = useState(13)

  useEffect(() => {
    setPosition(initialPosition ?? DEFAULT_MAP_POSITION)
  }, [initialPosition])

  const handlePositionChange = useCallback(
    (newPosition: Location) => {
      setPosition(newPosition)
      onPositionChange?.(newPosition)
    },
    [onPositionChange, setPosition]
  )

  const { clusteredMarkers, individualMarkers } = useMapIconRendering(
    zoomLevel,
    markerItems
  )

  return (
    <MapContainer
      className={cn('w-full', className)}
      center={{
        lat: position?.coordinates![0],
        lng: position?.coordinates![1]
      }}
      zoom={zoomLevel}
      scrollWheelZoom
    >
      <ZoomListener onZoomChange={setZoomLevel} />
      <MapController position={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {individualMarkers.length > 0 || clusteredMarkers.length > 0 ? (
        <>
          {individualMarkers.map((item) => (
            <DraggableMarker
              key={item._id}
              draggable={draggable}
              position={item.location}
              setPosition={handlePositionChange}
              eventHandlers={{
                click: () => onMarkerItemsClick?.([item])
              }}
            >
              {renderTooltip ? (
                <Tooltip direction='top'>{renderTooltip([item])}</Tooltip>
              ) : null}
            </DraggableMarker>
          ))}
          {clusteredMarkers.map((items) =>
            items.length > 1 ? (
              <React.Fragment key={items[0]._id}>
                <Marker
                  position={{
                    lat: items[0].location.coordinates[0],
                    lng: items[0].location.coordinates[1]
                  }}
                  icon={createClusterMarkerIcon({ count: items.length })}
                  zIndexOffset={1000}
                  eventHandlers={{
                    click: () => {
                      // For clusters, we pass the first item to maintain consistency
                      // The consumer can then use the tooltip to show all items if needed
                      onMarkerItemsClick?.(items)
                    }
                  }}
                >
                  {renderTooltip ? (
                    <Tooltip direction='top'>{renderTooltip(items)}</Tooltip>
                  ) : null}
                </Marker>
              </React.Fragment>
            ) : null
          )}
        </>
      ) : (
        <DraggableMarker
          draggable={draggable}
          position={position}
          setPosition={handlePositionChange}
        />
      )}
    </MapContainer>
  )
}

export default Map
