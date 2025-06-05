'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, InputError, NumberInput, Text } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { cn } from '@utils'

export type RangeFieldValue = [number | string, number | string]

export interface RangeFieldProps {
  label?: string
  value?: RangeFieldValue
  onChange: (value: RangeFieldValue) => void
  required?: boolean
  className?: string
  inputClassName?: string
  wrapperClassName?: string
  isDifferentBackground?: boolean
  showBorder?: boolean
  circleStyle?: string
}

function RangeField({
  label,
  value,
  onChange,
  required,
  className,
  inputClassName,
  wrapperClassName,
  showBorder = false,
  isDifferentBackground = false,
  circleStyle,
  format = true
}: RangeFieldProps & { format?: boolean }) {
  const t = useTranslations()
  const locale = useLocale()
  const [start, setStart] = useState<RangeFieldValue[0]>(value?.[0] ?? '')
  const [end, setEnd] = useState<RangeFieldValue[1]>(value?.[1] ?? '')

  const handleValueChange = (newValue: RangeFieldValue) => {
    setStart(newValue[0])
    setEnd(newValue[1])
    onChange(newValue)
  }

  useEffect(() => {
    if (value?.[0]) {
      setStart(value[0])
    }
    if (value?.[1]) {
      setEnd(value[1])
    }
  }, [value])

  return (
    <Box className={cn('flex w-full flex-col gap-2 font-lexend', className)}>
      {label && (
        <Box className='text-sm font-bold text-neutral-500'>
          {required ? (
            <Flex className='gap-1'>
              <Text component='span' className='text-sm font-bold'>
                {label}
              </Text>{' '}
              <InputError>*</InputError>
            </Flex>
          ) : (
            <>
              {label} {!required && ` (${t('shared.optional')})`}
            </>
          )}
        </Box>
      )}
      <Box
        className={cn(
          'w-full rounded-md',
          showBorder && 'border border-neutral-400'
        )}
      >
        <Flex
          className={cn(
            'h-full items-center overflow-hidden bg-transparent dark:bg-mtn-dark-6',
            wrapperClassName
          )}
        >
          <NumberInput
            placeholder={t('shared.placeholders.startFrom')}
            hideControls
            className={cn('m-0 w-1/2 outline-none', inputClassName)}
            classNames={{
              input: cn(
                'p-0 px-3 m-0 border-none rounded-none',
                isDifferentBackground && 'bg-default-background'
              )
            }}
            value={start}
            onChange={(newValue) => {
              handleValueChange([newValue, end])
            }}
            thousandSeparator={format ? ',' : ''}
          />
          <Box className='relative flex h-10 flex-shrink-0 items-center justify-center p-px'>
            <Box className='absolute inset-y-0 left-1/2 w-px bg-neutral-300' />
            <Box
              className={cn(
                'absolute z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-neutral-400 p-1 text-default-text',
                circleStyle
              )}
            >
              {locale.startsWith('ar') ? <FaChevronLeft /> : <FaChevronRight />}
            </Box>
          </Box>
          <NumberInput
            placeholder={t('shared.placeholders.endTo')}
            hideControls
            className={cn('m-0 w-1/2 outline-none', inputClassName)}
            classNames={{
              input: cn(
                'p-0 px-3 m-0 border-none rounded-none',
                isDifferentBackground && 'bg-default-background'
              )
            }}
            value={end}
            onChange={(newValue) => {
              handleValueChange([start, newValue])
            }}
            thousandSeparator={format ? ',' : ''}
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default RangeField
