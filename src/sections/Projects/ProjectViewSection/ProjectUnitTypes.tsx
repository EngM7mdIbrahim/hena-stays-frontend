import React from 'react'
import Image from 'next/image'
import { Category, CurrencyCode, Price, SubCategory, Units } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import { Box, Flex, ScrollArea, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { formatNumberToShortForm } from '@utils'

import { ProjectDescriptionProps } from './ProjectDescription'

function ProjectUnitTypes({ project }: ProjectDescriptionProps) {
  const t = useTranslations()
  function groupByCategoryType(
    data: Units[] | undefined
  ): Record<string, Units[]> {
    const result: Record<string, Units[]> = {}

    if (!data) return result

    data.forEach((item) => {
      const type = isPopulated<Category>(item.category)
        ? item.category.name
        : 'Unknown'

      // If the type does not exist in the result object, create an empty array for it
      if (!result[type]) {
        result[type] = []
      }

      // Push the item into the corresponding type array
      result[type].push(item)
    })

    return result
  }

  function findMinimumPricesByType(
    data: Units[] | undefined
  ): Record<string, number> {
    const minPrices: Record<string, number> = {}

    if (!data) return minPrices

    data.forEach((item) => {
      const type = isPopulated<Category>(item.category)
        ? item.category.name
        : 'Unknown'
      const price = isPopulated<Price>(item.price) ? item.price.from : 0

      // Check if this type is already recorded or if the current price is lower
      if (minPrices[type] === undefined || price < minPrices[type]) {
        minPrices[type] = price
      }
    })

    return minPrices
  }

  const minPricesByType = findMinimumPricesByType(project?.units)

  const groupedData = groupByCategoryType(project?.units)

  return (
    <>
      {Object.keys(groupedData).map((type) => (
        <Box
          key={type}
          className='rounded-lg border border-neutral-200 bg-default-background p-6'
        >
          {/* Scrollable Wrapper */}
          <ScrollArea offsetScrollbars>
            {/* Header Section */}
            <Flex className='mb-6 min-w-[600px] items-center justify-between'>
              <Flex className='items-center gap-2'>
                <Flex className='h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                  <Image
                    src={navigationLinks.assets.building}
                    width={25}
                    height={25}
                    alt='svg'
                  />
                </Flex>
                <Text
                  component='span'
                  className='text-lg font-semibold text-neutral-700'
                >
                  {type}
                </Text>
              </Flex>
              <Text
                component='span'
                className='text-lg font-semibold text-neutral-700'
              >
                {t('projects.projectView.tabs.unitTypes.from')}{' '}
                {formatNumberToShortForm(minPricesByType[type])}{' '}
                {CurrencyCode.Aed}
              </Text>
            </Flex>

            {/* Table Section */}
            <Box className='min-w-[600px] border-t border-neutral-200 pt-4'>
              <Box className='w-full space-y-2'>
                <Flex className='w-full items-center'>
                  <Text className='w-[25%] font-semibold'>
                    {t('projects.projectView.tabs.unitTypes.name')}
                  </Text>
                  <Flex className='mb-2 w-full rounded-lg border border-neutral-200 p-4 text-sm text-neutral-500'>
                    <Text component='span' className='w-[60%]'>
                      {t('projects.projectView.tabs.unitTypes.area')}
                    </Text>
                    <Text component='span'>
                      {t('projects.projectView.tabs.unitTypes.price')}
                    </Text>
                  </Flex>
                </Flex>

                {/* Row Section */}
                {groupedData[type].map((item) => (
                  <Flex
                    key={`${type}-${item.price?.from}-${item.area?.from}`}
                    className='items-center'
                  >
                    <Text className='w-[25%]'>
                      {isPopulated<SubCategory>(item.subCategory) &&
                        item?.subCategory?.name}
                    </Text>
                    <Flex className='w-full items-center rounded-lg border border-neutral-200 p-6'>
                      <Flex className='w-[60%] justify-between'>
                        <Text
                          component='span'
                          className='text-base font-bold text-neutral-700'
                        >
                          {item?.area?.from} - {item?.area?.to}
                        </Text>
                      </Flex>
                      <Flex className='mt-2 justify-between md:mt-0 md:w-auto'>
                        <Text
                          component='span'
                          className='font-bold text-neutral-700'
                        >
                          {formatNumberToShortForm(item?.price?.from)}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Box>
            </Box>
          </ScrollArea>
        </Box>
      ))}
    </>
  )
}

export default ProjectUnitTypes
