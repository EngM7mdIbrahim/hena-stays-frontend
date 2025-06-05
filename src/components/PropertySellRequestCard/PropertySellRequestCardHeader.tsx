import Image from 'next/image'
import { RequestSellProperty, SubCategory } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isDark, isPopulated } from '@guards'
import { Flex, Stack, Text, useMantineColorScheme } from '@mantine/core'

import { formatNumberToShortForm } from '@utils'

export default function PropertySellRequestCardHeader({
  location,
  subCategory,
  type,
  price
}: Pick<RequestSellProperty, 'location' | 'subCategory' | 'type' | 'price'>) {
  const { colorScheme } = useMantineColorScheme()
  return (
    <Flex justify='space-between' className='flex-wrap gap-2'>
      <Stack className='gap-2'>
        <Flex className='items-center justify-between gap-2'>
          <Image
            src={
              isDark(colorScheme)
                ? navigationLinks.assets.locationDark
                : navigationLinks.assets.location
            }
            width={15}
            height={15}
            alt='location'
            className='mt-1 flex-shrink-0 dark:brightness-200'
          />

          <Text className='line-clamp-1 text-base text-default-text'>
            {location?.address}
          </Text>

          <Text className='text-xl font-bold text-primary'>{type}</Text>
        </Flex>
      </Stack>
      <Flex justify='space-between' align='baseline' className='w-full gap-2'>
        {isPopulated<SubCategory>(subCategory) && (
          <Text className='text-base text-default-text'>
            {subCategory.name}
          </Text>
        )}

        {isPopulated<RequestSellProperty['price']>(price) && (
          <Text className='text-lg font-semibold text-default-text'>
            {formatNumberToShortForm(price.value)} {price.currency}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
