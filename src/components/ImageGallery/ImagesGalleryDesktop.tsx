import React from 'react'
import Image from 'next/image'
import { Media, MediaTypes } from '@commonTypes'

export interface ImageGalleryDesktopProps {
  images: Media[]
  handleClick: (index: number) => void
}

function ImageGalleryDesktop({
  images = [],
  handleClick
}: ImageGalleryDesktopProps) {
  const displayedImages = images.slice(0, 5)
  const extraImagesCount = images.length - 5

  const renderMedia = (media: Media, index: number) => {
    if (media.type === MediaTypes.Video) {
      return (
        <video
          src={media.url}
          className='h-full w-full rounded-[20px] object-cover'
          onClick={() => handleClick(index)}
        >
          <track kind='captions' />
        </video>
      )
    }
    return (
      <Image
        width={300}
        height={300}
        src={media.url}
        alt={`Gallery Item ${index + 1}`}
        className='h-full w-full rounded-[20px] object-cover'
        onClick={() => handleClick(index)}
      />
    )
  }

  return (
    <div className='grid max-w-2xl grid-cols-5 grid-rows-2 gap-8 px-4 md:max-w-full md:px-12'>
      {/* Slot 1 */}
      <div className='col-span-2 row-span-3 cursor-pointer transition duration-200 ease-in-out hover:scale-105'>
        {displayedImages[0] && renderMedia(displayedImages[0], 0)}
      </div>

      {/* Slot 2 */}
      <div className='col-span-2 col-start-3 row-span-3 cursor-pointer transition duration-200 ease-in-out hover:scale-105'>
        {displayedImages[1] && renderMedia(displayedImages[1], 1)}
      </div>

      {/* Slot 3 */}
      <div className='col-start-5 row-span-2 cursor-pointer transition duration-200 ease-in-out hover:scale-105'>
        {displayedImages[2] && renderMedia(displayedImages[2], 2)}
      </div>

      {/* Slot 4 */}
      <div className='col-span-4 col-start-1 row-span-2 row-start-4 row-end-5 h-[300px] cursor-pointer transition duration-200 ease-in-out hover:scale-105'>
        {displayedImages[3] && renderMedia(displayedImages[3], 3)}
      </div>

      {/* Slot 5 */}
      <div
        role='button'
        tabIndex={0}
        onClick={() => handleClick(4)}
        onKeyDown={() => handleClick(4)}
        className='relative col-start-5 row-span-4 row-start-3 row-end-5 cursor-pointer overflow-hidden transition duration-200 ease-in-out hover:scale-105'
      >
        {displayedImages[4] && renderMedia(displayedImages[4], 4)}

        {extraImagesCount > 0 && (
          <div className='absolute inset-0 flex items-center justify-center rounded-[20px] bg-black/50 text-2xl font-bold text-white'>
            +{extraImagesCount}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGalleryDesktop
