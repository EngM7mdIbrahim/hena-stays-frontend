'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@mantine/core'

import { cn } from '@utils'

import SingleOption, { SingleOptionProps } from './SingleOption'

export interface TogglesWithPictureProps<T> {
  options: Pick<SingleOptionProps<T>, 'icon' | 'label' | 'value'>[]
  selectedValue: T | null
  onSelectedValueChange: (option: T) => void
  className?: string
  optionClassName?: string
}

export default function TogglesWithPicture<T>({
  options,
  selectedValue,
  onSelectedValueChange,
  className,
  optionClassName
}: TogglesWithPictureProps<T>) {
  const [selectedOption, setSelectedOption] = useState<T | null>(selectedValue)
  useEffect(() => {
    setSelectedOption(selectedValue)
  }, [selectedValue])

  const handleSelectedValueChange = (value: T) => {
    setSelectedOption(value)
    onSelectedValueChange(value)
  }

  return (
    <Flex
      gap={15}
      align='center'
      className={cn('flex-col justify-center lg:flex-row', className)}
    >
      {options.map((option) => (
        <SingleOption
          className={optionClassName}
          key={option.label}
          selected={selectedOption === option.value}
          onClick={handleSelectedValueChange}
          icon={option.icon}
          label={option.label}
          value={option.value}
        />
      ))}
    </Flex>
  )
}
