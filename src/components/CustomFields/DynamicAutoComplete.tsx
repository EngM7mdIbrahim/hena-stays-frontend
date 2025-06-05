'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  CloseButton,
  Combobox,
  Group,
  Loader,
  TextInput,
  TextInputProps,
  Tooltip,
  useCombobox
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { LuPencil } from 'react-icons/lu'

import { cn, safeFetch } from '@utils'

interface AutocompleteDynamicItem<T extends object> {
  value: T
  label: string
}

export interface DynamicAutoCompleteProps<T extends object>
  extends TextInputProps {
  data:
    | AutocompleteDynamicItem<T>[]
    | ((text: string) => Promise<AutocompleteDynamicItem<T>[]>)
  className?: string
  placeholder?: string
  label?: string
  onTextChange?: (text: string) => void
  initialText?: string
  onOptionSelect: (option: T | null) => void
}

export function DynamicAutoComplete<T extends object>({
  data,
  className,
  placeholder,
  label,
  onTextChange,
  initialText,
  onOptionSelect,
  ...rest
}: DynamicAutoCompleteProps<T>) {
  const t = useTranslations()
  const combobox = useCombobox()
  const [value, setValue] = useState(initialText || '')
  const [debounced] = useDebouncedValue(value, 500)
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteDynamicItem<T> | null>(null)

  const [optionsData, setOptionsData] = useState<AutocompleteDynamicItem<T>[]>(
    []
  )
  const [loading, setLoading] = useState(false)

  let rightSection = <Combobox.Chevron />
  if (loading) {
    rightSection = <Loader size={18} />
  }
  if (debounced?.trim() !== value?.trim()) {
    rightSection = (
      <Box className='relative'>
        <Tooltip position='top' label={t('shared.processing')} color='gray'>
          <Box className='cursor-pointer'>
            <LuPencil className='animate-pulse' size={18} />
          </Box>
        </Tooltip>
      </Box>
    )
  }

  if (selectedOption) {
    rightSection = (
      <Group gap={0}>
        <CloseButton
          size='sm'
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setValue('')
            setSelectedOption(null)
            onOptionSelect(null)
          }}
        />
      </Group>
    )
  }

  useEffect(() => {
    setLoading(true)

    const fetchOptions = async () => {
      if (typeof data === 'function') {
        return data(debounced.trim())
      }
      return data
    }
    const response = safeFetch(fetchOptions)
    response.then((res) => {
      if (res.success) {
        setOptionsData(res.data)
      } else {
        setOptionsData([])
      }
    })
    response.finally(() => {
      setLoading(false)
    })
  }, [debounced])

  const options = useMemo(() => {
    return optionsData.map((item) => (
      <Combobox.Option
        value={JSON.stringify(item.value)}
        key={JSON.stringify(item.value)}
      >
        {item.label}
      </Combobox.Option>
    ))
  }, [optionsData])

  const handleOptionSelect = (optionValue: string) => {
    const option = optionsData.find(
      (currentOption) => JSON.stringify(currentOption.value) === optionValue
    )
    if (option) {
      setValue(option.label)
      setSelectedOption(option)
      combobox.closeDropdown()
      onOptionSelect(option.value)
    }
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value ?? ''
    setValue(newValue)
    if (selectedOption && newValue !== selectedOption.label) {
      setSelectedOption(null)
    }
    onTextChange?.(debounced)
  }

  return (
    <Box className={cn('w-full', className)}>
      <Combobox onOptionSubmit={handleOptionSelect} store={combobox}>
        <Combobox.Target>
          <TextInput
            {...rest}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={handleTextChange}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSection={rightSection}
          />
        </Combobox.Target>

        <Combobox.Dropdown
          hidden={
            value.trim().length === 0 || value.includes('@') || !!selectedOption
          }
        >
          <Combobox.Options>
            {options.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              options
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  )
}
