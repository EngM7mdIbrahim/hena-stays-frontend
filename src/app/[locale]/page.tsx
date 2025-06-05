'use client'

import { useEffect } from 'react'
import { RecommendationTypeEnum } from '@commonTypes'
import { env } from '@config'
import { Button, Stack } from '@mantine/core'
import About from '@sections/Landing/About'
import BecomePartner from '@sections/Landing/BecomPartner'
import Benefits from '@sections/Landing/Benefits'
import GuestBanner from '@sections/Landing/GuestBanner'
import LandingHeader from '@sections/Landing/LandingHeader'
import LastProjects from '@sections/Landing/LastProjects'
import RecommendedProperties from '@sections/Landing/RecommendedProperties'
import Services from '@sections/Landing/Services'
import Team from '@sections/Landing/Team'
import TrendingNews from '@sections/Landing/TrendingNews'
import { useTranslations } from 'next-intl'

import { GuestLayout } from '@layouts/users/GuestLayout'
import { appNotifications } from '@utils'

export default function Home() {
  const t = useTranslations()
  useEffect(() => {
    const showDevNotifications = async () => {
      try {
        const res = await fetch(`${env.api}`)
        if (res.ok) {
          appNotifications.info('Connected to the backend')
        } else {
          appNotifications.error('Failed to connect to the backend')
        }
      } catch (e) {
        appNotifications.error('Failed to connect to the backend')
      }
    }
    if (env.NEXT_PUBLIC_APP_ENV === 'dev') {
      showDevNotifications()
    }
  }, [])

  return (
    <GuestLayout>
      <Stack className='gap-20'>
        <LandingHeader />
        <Benefits />
        <Stack className='mt-10 gap-8'>
          <RecommendedProperties
            linearBackground
            recommendationStatus={RecommendationTypeEnum.PropertyOfTheWeek}
            title={t('homePage.recommendedProperties.propertyOfTheWeek')}
          />
          <RecommendedProperties
            recommendationStatus={RecommendationTypeEnum.HotDeal}
            title={t('homePage.recommendedProperties.hotDeals')}
          />
          <RecommendedProperties
            recommendationStatus={RecommendationTypeEnum.Signature}
            title={t('homePage.recommendedProperties.signatures')}
          />
        </Stack>
        <Services />
        <Button
          onClick={() => {
            throw new Error('Throw test error')
          }}
        >
          Click me to throw an error
        </Button>
        <About />

        <LastProjects title={t('homePage.lastProjects.title')} />
        <Team />
        <BecomePartner />
        <div className='hidden md:block'>
          <TrendingNews />
        </div>
        {/* sell property */}
        <GuestBanner
          buttonTitle={t('homePage.guestBanner.buttonTitle')}
          description={t('homePage.guestBanner.description')}
          title={t('homePage.guestBanner.title')}
        />
        {/* trending news in mobile */}
        <div className='block md:hidden'>
          <TrendingNews />
        </div>
      </Stack>
    </GuestLayout>
  )
}
