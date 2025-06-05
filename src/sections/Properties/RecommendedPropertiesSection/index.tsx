'use client'

import { useMemo } from 'react'
import { notFound, usePathname } from 'next/navigation'
import { RecommendationTypeEnum } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPropertyRecommendation } from '@guards'
import PropertiesSection from '@sections/Properties/PropertiesSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

export interface RecommendedPropertiesSectionProps {
  recommendationType: string
}

export default function RecommendedPropertiesSection({
  recommendationType
}: RecommendedPropertiesSectionProps) {
  const t = useTranslations()
  const pathname = usePathname()
  const recommended = useMemo(() => {
    return recommendationType
      ? decodeURIComponent(recommendationType)
      : undefined
  }, [recommendationType])

  if (!isPropertyRecommendation(recommended)) {
    return notFound()
  }

  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.properties.allProperties
    },
    {
      label: t('shared.breadcrumb.recommendedProperties'),
      link: pathname
    }
  ]

  const recommendationTitles = {
    [RecommendationTypeEnum.HotDeal]: {
      title: t('homePage.recommendedProperties.hotDeals'),
      src: navigationLinks.assets.recommendationIcons.hotFill,
      alt: 'Hot Deal'
    },
    [RecommendationTypeEnum.Signature]: {
      title: t('homePage.recommendedProperties.signatureProperties'),
      src: navigationLinks.assets.recommendationIcons.starFill,
      alt: 'Signature Property'
    },
    [RecommendationTypeEnum.PropertyOfTheWeek]: {
      title: t('homePage.recommendedProperties.propertyOfTheWeek'),
      src: navigationLinks.assets.recommendationIcons.propertyOfTheWeekFill,
      alt: 'Property of the Week'
    },
    [RecommendationTypeEnum.None]: {
      title: t('homePage.recommendedProperties.propertiesForSale'),
      src: '',
      alt: 'Properties for sale'
    }
  }

  return (
    <>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />

      <PropertiesSection
        {...recommendationTitles[recommended]}
        recommended={recommended}
      />
    </>
  )
}
