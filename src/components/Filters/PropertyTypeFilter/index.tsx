import React from 'react'
import { useGetSubCategories } from '@hooks'
import { SelectProps } from '@mantine/core'
import { useTranslations } from 'next-intl'

import SelectField from '@components/CustomFields/SelectField'
import { cn } from '@utils'

export interface PropertyTypeFilterProps extends SelectProps {
  inputClassName?: string
}

function PropertyTypeFilter({
  inputClassName,
  ...props
}: PropertyTypeFilterProps) {
  const t = useTranslations()
  const { data } = useGetSubCategories({})
  const propertyTypeOptions = data?.items?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item?._id
    })
  )

  return (
    <SelectField
      {...props}
      classNames={{
        input: cn(
          'border border-neutral-200 bg-default-background rounded-md',
          inputClassName
        )
      }}
      placeholder={t('shared.placeholders.propertyType')}
      data={propertyTypeOptions}
    />
  )
}

export default PropertyTypeFilter
