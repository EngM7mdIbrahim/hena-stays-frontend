import React from 'react'
import { RequestSellProperty } from '@commonTypes'
import { Box } from '@mantine/core'

import Map from '@components/Map'

function SellPropertyLocation({
  property
}: {
  property: RequestSellProperty | undefined
}) {
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

export default SellPropertyLocation
