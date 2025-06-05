'use client'

import React from 'react'
import { GetPropertiesAnalyticsResponse } from '@commonTypes'
import { Card, Flex, Text } from '@mantine/core'

import 'swiper/css'
import 'swiper/css/navigation'

import { useTranslations } from 'next-intl'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import PropertyCard from '@components/PropertyCard'

export interface AdminAnalyticsPropertiesProps {
  properties?: GetPropertiesAnalyticsResponse['topPerformers']
}

function AdminAnalyticsProperties({
  properties = []
}: AdminAnalyticsPropertiesProps) {
  const t = useTranslations()
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Text fw={500}>{t('adminAnalytics.topPerformers')}</Text>
      <Swiper
        className='mt-8 w-full'
        slidesPerView={3}
        navigation
        modules={[Navigation]}
        spaceBetween={20}
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
      >
        {properties.map((property, index) => (
          <SwiperSlide key={property._id}>
            <Flex className='gap-2'>
              <Text component='span' className='text-lg text-cyan-600'>
                {index + 1}
              </Text>{' '}
              <PropertyCard
                showAgent={false}
                showAdditionalFeatures={false}
                layout='vertical'
                property={property}
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}

export default AdminAnalyticsProperties
