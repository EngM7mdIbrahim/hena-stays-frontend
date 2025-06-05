'use client'

import { OfficialBlog } from '@commonTypes'
import { Stack, Text } from '@mantine/core'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { useTranslations } from 'next-intl'

import RelatedBlogCard from '@components/RelatedBlogCard'
import { cn } from '@utils'

export interface MoreBlogsSectionProps {
  blogs?: OfficialBlog[] | null
  className?: string
}

function MoreBlogsSection({ blogs, className }: MoreBlogsSectionProps) {
  const t = useTranslations()
  return (
    <Stack>
      {blogs && blogs.length > 0 && (
        <Stack className={cn('w-full gap-4', className)}>
          <Text className='gap-3 text-xl font-bold text-primary md:text-3xl'>
            {t('officialBlogs.officialBlogForm.fields.relatedBlogs')}
          </Text>

          <Swiper
            className='w-full'
            slidesPerView={3}
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
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50
              }
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id}>
                <RelatedBlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
      )}
    </Stack>
  )
}

export default MoreBlogsSection
