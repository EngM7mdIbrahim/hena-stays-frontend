import React from 'react'
import { Property } from '@commonTypes'
import { Box } from '@mantine/core'

import Map from '@components/Map'

function PropertyLocation({ property }: { property: Property | undefined }) {
  return (
    <Box className='z-10'>
      <Map
        className='h-[500px] w-full'
        initialPosition={property?.location}
        draggable={false}
      />
    </Box>
  )
}

export default PropertyLocation
