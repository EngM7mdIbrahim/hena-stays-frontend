import React from 'react'
import { useMediaQuery } from '@mantine/hooks'

import 'swiper/css'
import 'swiper/css/pagination'

import { Property } from '@commonTypes'
import { getDefaultSortOptions, navigationLinks } from '@constants'
import { useGetProperties } from '@hooks'
import { Box, Skeleton, Stack, useMantineColorScheme } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import HeaderSection from '@components/HeaderSection'
import PropertyCard, {
  LayoutType,
  PropertyCardSkeleton
} from '@components/PropertyCard'

export interface RecommendedPropertiesProps {
  title: string
  linearBackground?: boolean
  recommendationStatus: Required<Pick<Property, 'recommended'>>['recommended']
}

function RecommendedPropertiesLoading() {
  return (
    <Stack className='w-full px-4 py-10 md:px-8 lg:px-12'>
      <Skeleton width='30%' height={50} />
      <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <PropertyCardSkeleton />
        <PropertyCardSkeleton />
      </Box>
    </Stack>
  )
}

function RecommendedProperties({
  title,
  recommendationStatus,
  linearBackground = false
}: RecommendedPropertiesProps) {
  const t = useTranslations()
  const { colorScheme } = useMantineColorScheme()
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const { data: properties, isLoading: isPropertiesLoading } = useGetProperties(
    {
      limit: '10',
      showFields: {
        createdBy: true,
        amenities: {
          basic: true
        }
      },
      sort: JSON.parse(getDefaultSortOptions(t)[0].value),
      filter: {
        recommended: recommendationStatus
      }
    }
  )

  const pagination = {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<span class="${className}" style="background: linear-gradient(180deg, #F6A649 0%, #90612B 100%)"></span>`
    }
  }

  let layout: LayoutType = 'vertical'

  if (isSmallScreen) {
    layout = 'vertical'
  } else if (recommendationStatus?.toLowerCase().includes('week')) {
    layout = 'horizontal'
  } else {
    layout = 'vertical'
  }

  let background = ''
  if (linearBackground) {
    background = `linear-gradient(90deg, ${colorScheme === 'dark' ? '#1A1A1A, #2D2D2D' : '#FFFBF5, #FFFFFF'} 61.75%)`
  } else {
    background = colorScheme === 'dark' ? '#242424' : 'white'
  }

  if (isPropertiesLoading) {
    return <RecommendedPropertiesLoading />
  }

  return properties?.items?.length ? (
    <Stack
      style={{
        background
      }}
      className='w-full px-4 py-10 md:px-8 lg:px-12'
    >
      <HeaderSection
        title={title}
        href={navigationLinks.properties.recommended(recommendationStatus)}
      />

      <Swiper
        className='mt-8 w-full'
        slidesPerView={
          recommendationStatus?.toLowerCase().includes('week') ? 2 : 3
        }
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
            slidesPerView: recommendationStatus?.toLowerCase().includes('week')
              ? 1
              : 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: recommendationStatus?.toLowerCase().includes('week')
              ? 2
              : 3,
            spaceBetween: 50
          }
        }}
        modules={[Pagination]}
      >
        {properties.items.map((property) => (
          <SwiperSlide key={property._id}>
            <PropertyCard
              showDetails={false}
              layout={layout}
              property={property}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  ) : null
}

export default RecommendedProperties
