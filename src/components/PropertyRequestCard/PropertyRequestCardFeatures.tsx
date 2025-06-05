import { RequestBuyProperty } from '@commonTypes'
import { Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { LuBath, LuBed, LuSofa } from 'react-icons/lu'

import IconValue from '@components/IconValue'

export default function PropertyRequestCardFeatures({
  bedroom,
  toilets,
  living
}: Pick<
  RequestBuyProperty,
  'age' | 'area' | 'bedroom' | 'toilets' | 'living'
>) {
  const t = useTranslations()
  return (
    <Flex
      justify='space-between'
      align='center'
      className='w-full flex-wrap gap-1'
    >
      <IconValue
        icon={<LuBed />}
        value={
          bedroom?.from && bedroom?.to
            ? `${bedroom.from} - ${bedroom.to} ${t('shared.beds')}`
            : '-'
        }
      />
      <IconValue
        icon={<LuBath />}
        value={
          toilets?.from && toilets?.to
            ? `${toilets.from} - ${toilets.to} ${t('shared.baths')}`
            : '-'
        }
      />
      <IconValue
        icon={<LuSofa />}
        value={
          living?.from && living?.to
            ? `${living.from} - ${living.to} ${t('shared.livingRooms')}`
            : '-'
        }
      />
    </Flex>
  )
}
