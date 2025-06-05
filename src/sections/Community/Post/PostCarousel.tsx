import React from 'react'
import NextImage from 'next/image'
import { Carousel } from '@mantine/carousel'
import { Badge, Box, Image } from '@mantine/core'

import '@mantine/carousel/styles.css'

export interface PostCarouselProps {
  slides: any[]
}

function PostCarousel({ slides }: PostCarouselProps) {
  return (
    <Carousel
      draggable={false}
      height='100%'
      classNames={{
        control: 'control'
      }}
    >
      {slides?.map((slide, index) => (
        <Carousel.Slide key={slide.url}>
          <Box pos='relative'>
            {slides.length > 1 && (
              <Badge
                variant='gradient'
                gradient={{ from: '#041A47', to: '#0A3FAD', deg: 90 }}
                pos='absolute'
                top={10}
                right={10}
                size='lg'
                className='rounded-full p-4'
              >
                {index + 1}/{slides.length}
              </Badge>
            )}
            {slide.type === 'image' ? (
              <Image
                component={NextImage}
                width={500}
                height={200}
                radius='md'
                mb='md'
                className='md:h-[500px]'
                src={slide.url}
                alt='Post Image'
              />
            ) : (
              <video controls style={{ width: '100%', height: 'auto' }}>
                <track kind='captions' />
                <source src={slide.url} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

export default PostCarousel
