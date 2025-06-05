import { TranslationFn } from '@interfaces'

export const getDefaultSortOptions = (t: TranslationFn) => [
  {
    value: JSON.stringify({ createdAt: -1 }),
    label: t('shared.sortOptions.newest')
  },
  {
    value: JSON.stringify({ createdAt: 1 }),
    label: t('shared.sortOptions.oldest')
  }
]

export const defaultLimitOptions = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' }
]
