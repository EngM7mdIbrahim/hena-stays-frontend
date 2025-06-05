import { RequestSellProperty } from '@commonTypes'
import { Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { LuBath, LuBed, LuSofa } from 'react-icons/lu'

import IconValue from '@components/IconValue'

export default function PropertySellRequestCardFeatures({
  bedroom,
  toilets,
  living
}: Pick<
  RequestSellProperty,
  'age' | 'area' | 'bedroom' | 'toilets' | 'living'
>) {
  const t = useTranslations()

  return (
    <Flex justify='space-between' align='center' className='w-full gap-1'>
      <IconValue
        icon={<LuBed />}
        value={
          bedroom
            ? `${bedroom} ${bedroom > 1 ? t('shared.beds') : t('shared.bed')}`
            : '-'
        }
      />
      <IconValue
        icon={<LuBath />}
        value={
          toilets
            ? `${toilets} ${toilets > 1 ? t('shared.baths') : t('shared.bath')}`
            : '-'
        }
      />
      <IconValue
        icon={<LuSofa />}
        value={
          living
            ? `${living} ${living > 1 ? t('shared.livingRooms') : t('shared.living')}`
            : '-'
        }
      />
    </Flex>
  )
}
