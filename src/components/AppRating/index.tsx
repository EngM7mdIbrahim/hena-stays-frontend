'use client'

import React from 'react'
import { Rating, RatingProps } from '@mantine/core'
import { GiStaryu } from 'react-icons/gi'

export interface CustomRatingProps {
  size?: number
}

function CustomRating({ size = 26, ...rest }: RatingProps & CustomRatingProps) {
  return (
    <Rating
      {...rest}
      emptySymbol={<GiStaryu className='text-primary/50' size={size} />}
      fullSymbol={<GiStaryu fill='#f6a649' color='#f6a649' size={size} />}
    />
  )
}

export default CustomRating
