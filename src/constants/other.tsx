import Image from 'next/image'

import { TranslationFn } from '@interfaces'

import { navigationLinks } from './navigation'

export const SERVICES = (t: TranslationFn) => [
  {
    title: t('homePage.services.1.title'),
    description: t('homePage.services.1.description'),
    src: navigationLinks.assets.services.firstService,
    link: navigationLinks.community.allPosts
  },
  {
    title: t('homePage.services.2.title'),
    description: t('homePage.services.2.description'),
    src: navigationLinks.assets.services.secondService,
    link: navigationLinks.news.allNews
  },
  {
    title: t('homePage.services.3.title'),
    description: t('homePage.services.3.description'),
    src: navigationLinks.assets.services.thirdService,
    link: navigationLinks.buyPropertyRequests.allBuyPropertyRequests
  }
]

export const BENEFITS = (t: TranslationFn) => [
  {
    icon: (
      <Image
        src='/svgs/landing/benefits/1.svg'
        width={40}
        height={40}
        alt='1'
      />
    ),
    title: t('homePage.benefits.1.title'),
    description: t('homePage.benefits.1.description')
  },
  {
    icon: (
      <Image
        src='/svgs/landing/benefits/2.svg'
        width={40}
        height={40}
        alt='2'
      />
    ),
    title: t('homePage.benefits.2.title'),
    description: t('homePage.benefits.2.description'),
    special: true
  },
  {
    icon: (
      <Image
        src='/svgs/landing/benefits/3.svg'
        width={40}
        height={40}
        alt='3'
      />
    ),
    title: t('homePage.benefits.3.title'),
    description: t('homePage.benefits.3.description')
  }
]

export const AMENITIES = [
  {
    id: '1',
    label: 'Parking Space',
    icon: navigationLinks.assets.propertiesFeatures[1]
  },
  {
    id: '2',
    label: 'Centrally-air conditioned',
    icon: navigationLinks.assets.propertiesFeatures[2]
  },
  {
    id: '3',
    label: 'Balcony/Terrace',
    icon: navigationLinks.assets.propertiesFeatures[3]
  },
  {
    id: '4',
    label: 'Swimming Pool',
    icon: navigationLinks.assets.propertiesFeatures[4]
  },
  {
    id: '5',
    label: 'Internet',
    icon: navigationLinks.assets.propertiesFeatures[5]
  },
  {
    id: '6',
    label: 'Maids Room',
    icon: navigationLinks.assets.propertiesFeatures[6]
  },
  {
    id: '7',
    label: 'Kids Play Area',
    icon: navigationLinks.assets.propertiesFeatures[7]
  },
  {
    id: '8',
    label: 'Lobby in building',
    icon: navigationLinks.assets.propertiesFeatures[8]
  },
  {
    id: '9',
    label: 'CCTV Security',
    icon: navigationLinks.assets.propertiesFeatures[9]
  },
  {
    id: '10',
    label: 'Gym/Health Club',
    icon: navigationLinks.assets.propertiesFeatures[10]
  },
  {
    id: '11',
    label: 'Waste Disposal',
    icon: navigationLinks.assets.propertiesFeatures[11]
  },
  {
    id: '12',
    label: 'Maintenance Staff',
    icon: navigationLinks.assets.propertiesFeatures[12]
  },
  {
    id: '13',
    label: 'Security Staff',
    icon: navigationLinks.assets.propertiesFeatures[13]
  }
]
