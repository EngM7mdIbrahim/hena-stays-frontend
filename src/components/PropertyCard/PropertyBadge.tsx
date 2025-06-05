import React from 'react'
import Image from 'next/image'
import { Property, RecommendationTypeEnum } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Box } from '@mantine/core'
import { useTranslations } from 'next-intl'

function PropertyBadge({ property }: { property: Property }) {
  const t = useTranslations()
  let svgSrc
  let title

  if (property?.recommended === RecommendationTypeEnum.PropertyOfTheWeek) {
    svgSrc = navigationLinks.assets.recommendationIcons.propertyOfTheWeek
    title = t('premium.tabs.propertyOfTheWeek')
  } else if (property?.recommended === RecommendationTypeEnum.Signature) {
    svgSrc = navigationLinks.assets.recommendationIcons.signature
    title = t('premium.tabs.signature')
  } else if (property?.recommended === RecommendationTypeEnum.HotDeal) {
    svgSrc = navigationLinks.assets.recommendationIcons.hot
    title = t('premium.tabs.hotDeal')
  }

  return (
    <Box>
      {svgSrc && (
        <Box
          pos='absolute'
          className='-start-1 bottom-2 flex items-center gap-1 rounded-md bg-gradient-to-r from-[#F6C083] to-[#FDECD8] px-2 py-1 text-sm text-secondary'
        >
          <Image
            width={24}
            height={24}
            alt={property?.recommended || 'recommended icon'}
            src={svgSrc}
          />
          {title}
        </Box>
      )}
    </Box>
  )
}

export default PropertyBadge
