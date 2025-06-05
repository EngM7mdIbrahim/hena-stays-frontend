import React from 'react'

import 'swiper/css'
import 'swiper/css/pagination'

import { navigationLinks } from '@constants'
import { useProjectsList } from '@hooks'
import { Box, Skeleton, Stack } from '@mantine/core'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import FullScreenError from '@components/FullScreenError'
import HeaderSection from '@components/HeaderSection'
import ProjectCard, { ProjectCardSkeleton } from '@components/ProjectCard'

function LastProjectsLoading() {
  return (
    <Stack className='w-full px-4 py-10 md:px-8 lg:px-12'>
      <Skeleton width='30%' height={50} />
      <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </Box>
    </Stack>
  )
}

export interface LastProjectsProps {
  title: string
}

function LastProjects({ title }: LastProjectsProps) {
  const pagination = {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<span class="${className}" style="background: linear-gradient(180deg, #F6A649 0%, #90612B 100%); bottom: 8px"></span>`
    }
  }

  const { projects, data, isLoading, isError, error } = useProjectsList({
    recommended: true
  })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  if (isLoading) {
    return <LastProjectsLoading />
  }

  return data?.items?.length ? (
    <Stack className='w-full overflow-x-hidden px-4 py-10 md:px-8 lg:px-12'>
      <HeaderSection
        title={title}
        href={navigationLinks.projects.allProjects}
      />

      <Swiper
        className='swiper-projects mt-8 w-full !overflow-visible'
        slidesPerView={3}
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
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50
          }
        }}
        modules={[Pagination]}
      >
        {projects?.map((project) => (
          <SwiperSlide key={project?._id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  ) : null
}

export default LastProjects
