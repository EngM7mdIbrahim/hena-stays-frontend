import { TranslationFn } from 'src/interfaces/i18.interface'

import { getDefaultSortOptions } from './pagination'

export const getAffordablePropertySearches = (t: TranslationFn) => [
  {
    title: t('properties.footer.affordableSearches.propertiesUnder5M'),
    link: '/properties?filters=%257B%2522filter%2522%253A%257B%2522price%2522%253A%257B%2522value%2522%253A%257B%2522max%2522%253A5000000%257D%257D%252C%2522type%2522%253A%2522Sale%2522%257D%257D'
  },
  {
    title: t('properties.footer.affordableSearches.propertiesUnder1_5M'),
    link: '/properties?filters=%257B%2522filter%2522%253A%257B%2522price%2522%253A%257B%2522value%2522%253A%257B%2522max%2522%253A1500000%257D%257D%252C%2522type%2522%253A%2522Sale%2522%257D%257D'
  },
  {
    title: t('properties.footer.affordableSearches.propertiesUnder950K'),
    link: '/properties?filters=%257B%2522filter%2522%253A%257B%2522price%2522%253A%257B%2522value%2522%253A%257B%2522max%2522%253A950000%257D%257D%252C%2522type%2522%253A%2522Sale%2522%257D%257D'
  }
]

export const getExploreMoreInProperties = (t: TranslationFn) => [
  { title: t('properties.footer.exploreMore.rentedProperties'), link: '#' },
  { title: t('properties.footer.exploreMore.propertiesAndHouses'), link: '#' },
  { title: t('properties.footer.exploreMore.registeredProperties'), link: '#' }
]
export const propertySortOptions = (t: TranslationFn) => [
  ...getDefaultSortOptions(t),
  {
    value: JSON.stringify({
      price: {
        value: 1
      }
    }),
    label: t('shared.sortOptions.lowestPrice')
  },
  {
    value: JSON.stringify({
      price: {
        value: -1
      }
    }),
    label: t('shared.sortOptions.highestPrice')
  },
  {
    value: JSON.stringify({ area: { plot: 1 } }),
    label: t('shared.sortOptions.lowestArea')
  },
  {
    value: JSON.stringify({ area: { plot: -1 } }),
    label: t('shared.sortOptions.highestArea')
  }
]
