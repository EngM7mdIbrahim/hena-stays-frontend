import React, { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import Image from 'next/image'
import { Media, MediaTypes } from '@commonTypes'
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export interface ImageGalleryModalProps {
  images: Media[]
  defaultIndex?: number
}

function ImageGalleryModal({
  images = [],
  defaultIndex
}: ImageGalleryModalProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  const renderMedia = (media: Media) => {
    if (media.type === MediaTypes.Video) {
      return (
        <video src={media.url} controls className='h-full w-full object-cover'>
          <track kind='captions' />
        </video>
      )
    }
    return (
      <Image
        src={media.url}
        alt='image'
        width={300}
        height={300}
        className='h-full w-full'
      />
    )
  }

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='imageSwiper2'
        initialSlide={defaultIndex}
      >
        {images.map((media) => (
          <SwiperSlide className='swiperSlideModal' key={media.url}>
            {renderMedia(media)}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className='imageSwiper1'
      >
        {images.map((media) => (
          <SwiperSlide
            className='swiperSlideModal mt-8 cursor-pointer rounded-md border border-neutral-200'
            key={media.url}
          >
            {renderMedia(media)}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ImageGalleryModal
