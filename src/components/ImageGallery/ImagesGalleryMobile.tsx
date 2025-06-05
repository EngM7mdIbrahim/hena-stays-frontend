'use client'

import React from 'react'

import 'swiper/css'
import 'swiper/css/pagination'

import Image from 'next/image'
import { Media } from '@commonTypes'
import { Box } from '@mantine/core'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export interface ImageGalleryMobileProps {
  images: Media[]
}

function ImageGalleryMobile({ images = [] }: ImageGalleryMobileProps) {
  const pagination = {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<span class="${className}" style="background: #fff"></span>`
    }
  }

  return (
    <Box className='p-4'>
      <Swiper
        className='mt-8 w-full'
        slidesPerView={2}
        spaceBetween={20}
        pagination={pagination}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          }
        }}
        modules={[Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.url}>
            {image.type === 'video' ? (
              <video
                src={image.url}
                className='h-[300px] w-full rounded-[20px] object-cover'
                controls
              >
                <track kind='captions' />
              </video>
            ) : (
              <Image
                width={300}
                height={300}
                src={image.url}
                alt={`Gallery Item ${index + 1}`}
                className='h-[300px] w-full rounded-[20px] object-cover'
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default ImageGalleryMobile
