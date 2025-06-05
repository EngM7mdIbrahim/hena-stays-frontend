import React from 'react'
import { navigationLinks } from '@constants'
import { useTopPerformersList } from '@hooks'
import { Box } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import HeaderSection from '@components/HeaderSection'
import ItemsWrapper from '@components/ItemWrapper'
import TeamCard, { TeamCardSkeleton } from '@components/TeamCard'

function Team() {
  const { topPerformers, isLoading, isError, error } = useTopPerformersList()
  const t = useTranslations()
  if (isError && error) {
    return <FullScreenError error={error} />
  }

  const pagination = {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<span class="${className}" style="background: linear-gradient(180deg, #F6A649 0%, #90612B 100%)"></span>`
    }
  }
  return (
    <Box className='overflow-x-hidden px-4 py-10 md:px-8 lg:px-12'>
      <HeaderSection
        titleClassName='md:w-[50%] lg:w-[42%]'
        title={t('homePage.team.title')}
        badgeTitle={t('homePage.team.badgeTitle')}
        href={navigationLinks.community.allPosts}
      />

      <Swiper
        className='swiper-team mt-8 w-full !overflow-visible'
        slidesPerView={4}
        spaceBetween={30}
        pagination={pagination}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 100
          },
          1150: {
            slidesPerView: 3,
            spaceBetween: 50
          },

          1200: {
            slidesPerView: 4,
            spaceBetween: 50
          }
        }}
        modules={[Pagination]}
      >
        <ItemsWrapper
          loading={isLoading}
          LoadingComponent={<TeamCardSkeleton />}
          className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('shared.agentsOrCompanies')
              })}
            />
          }
        >
          {topPerformers.map((user) => (
            <SwiperSlide key={user?.user?._id}>
              <TeamCard user={user} />
            </SwiperSlide>
          ))}
        </ItemsWrapper>
      </Swiper>
    </Box>
  )
}

export default Team
