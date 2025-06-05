import {
  CompletionEnumType,
  furnishedEnumType,
  InteractionsPropertiesAnalytics,
  Location,
  PropertiesAnalytics,
  RecommendationConfig,
  SaleTypeEnumType,
  UserRoleType
} from '@commonTypes'

import type { RangeFieldValue } from '@components/CustomFields/RangeFields'

export const DEFAULT_SIGNIN_FORM_DATA = {
  email: '',
  password: '',
  rememberMe: false
}

export const DEFAULT_USER_SIGNUP_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  whatsapp: '',
  username: '',
  sameAsWhatsapp: false,
  password: '',
  confirmPassword: '',
  isEdit: false
}

export const COMMON_DATA = {
  city: '',
  license: '',
  licenseCopies: [],
  licenseExpiryDate: null as Date | null,
  watermark: null
}

export const DEFAULT_AGENT_SIGNUP_FORM_DATA = {
  ...DEFAULT_USER_SIGNUP_FORM_DATA,
  ...COMMON_DATA
}

export const DEFAULT_COMPANY_SIGNUP_FORM_DATA = {
  ...DEFAULT_USER_SIGNUP_FORM_DATA,
  ...COMMON_DATA,
  companyName: '',
  authority: '',
  jurisdiction: '',
  address: ''
}

export const DEFAULT_RESET_PASSWORD_FORM_DATA = {
  password: '',
  confirmPassword: ''
}

export const DEFAULT_FORGET_PASSWORD_FORM_DATA = {
  email: ''
}

export const DEFAULT_MAP_POSITION: Location = {
  address: '77GW+JQ9 - Corniche Deira - Dubai - United Arab Emirates',
  name: 'Corniche Deira',
  street: '77GW+JQ9',
  neighborhoods: 'Corniche Deira',
  country: 'United Arab Emirates',
  state: 'Dubai',
  city: 'Dubai',
  coordinates: [25.2855, 55.326]
}

export const DEFAULT_ADD_POST_FORM_DATA = {
  description: '',
  location: DEFAULT_MAP_POSITION,
  media: []
}

export const DEFAULT_ADD_COMMENT_FORM_DATA = {
  description: ''
}

export const DEFAULT_BLOG_FORM_DATA = {
  title: '',
  description: '',
  content: '',
  tableOfContents: '[]',
  media: []
}

export const DEFAULT_OFFICIAL_BLOGS_FORM_DATA = {
  title: '',
  description: '',
  media: null,
  altText: '',
  content: '',
  seo: {
    title: '',
    description: '',
    keywords: [] as string[]
  },
  faq: [] as { question: string; answer: string; key: string }[],
  relatedBlogs: [] as string[],
  slug: '',
  tableOfContents: '[]',
  published: false,
  scheduledAt: null as Date | null
}

export const DEFAULT_PROPERTY_FORM_DATA = {
  title: '',
  description: '',
  type: '',
  completion: '',
  furnished: '',
  location: DEFAULT_MAP_POSITION,
  price: {
    value: '',
    currency: 'AED',
    duration: ''
  },
  toilets: '',
  living: '',
  bedroom: '',
  floors: '',
  age: '',
  ageType: '',
  category: '',
  subCategory: '',
  media: [],
  amenities: {
    basic: [] as string[],
    other: [] as string[]
  },

  area: {},
  developer: '',

  permit: {
    number: '',
    DED: '',
    RERA: '',
    BRN: '',
    tarkheesi: null
  },
  ownership: ''
}

export const DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA = {
  type: '' as SaleTypeEnumType,
  completion: '' as CompletionEnumType,
  category: '',
  subCategory: '',
  location: DEFAULT_MAP_POSITION,
  amenities: [] as string[],
  furnished: [] as furnishedEnumType[],
  price: {
    value: [] as unknown as RangeFieldValue,
    currency: 'AED',
    duration: ''
  },
  area: [] as unknown as RangeFieldValue,
  age: [] as unknown as RangeFieldValue,
  living: [] as unknown as RangeFieldValue,
  toilets: [] as unknown as RangeFieldValue,
  bedroom: [] as unknown as RangeFieldValue,
  sameAsWhatsapp: true,
  contactWays: {
    email: false,
    phone: false,
    whatsapp: false,
    truedar: false
  },
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    whatsapp: ''
  }
}

export const DEFAULT_SEll_PROPERTY_FORM_DATA = {
  ...DEFAULT_PROPERTY_FORM_DATA,
  permit: undefined
}

export const DEFAULT_EMPLOYEE_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  whatsapp: '',
  username: '',
  role: '' as UserRoleType,
  sameAsWhatsapp: false,
  password: '',
  image: null as File | null,
  isEdit: false
}
export const DEFAULT_PROJECT_FORM_DATA = {
  title: '',
  description: '',
  location: DEFAULT_MAP_POSITION,
  handOverDate: null,
  media: [],
  paymentType: 'fullPrice',
  paymentPlan: {
    onHandOverPercentage: undefined,
    postHandOverPercentage: undefined,
    downPaymentPercentage: undefined,

    projectCompletion: [
      {
        preHandOverPercentage: '',
        mileStonePercentage: '',
        order: '',
        // this key for mantine form to handle the loop
        key: ''
      }
    ]
  },
  // this will be the full price object
  preHandOverPercentage: undefined,
  monthsNumber: undefined
}

export const DEFAULT_CLIENT_LEAD_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  whatsapp: ''
}

export const DEFAULT_CONTACT_US_FORM_DATA = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

export const DEFAULT_CREDITS_FORM_DATA = {
  totalAmount: 75
}

export const DEFAULT_ADD_FEATURED_PROPERTY_FORM_DATA = {
  propertyIds: [] as string[],
  period: 7
}

export const DEFAULT_CONFIG_FORM_DATA = {
  propertyRecommendations: {
    hot: [] as (RecommendationConfig & { key: string })[],
    propertyOfWeek: [] as (RecommendationConfig & { key: string })[],
    signature: [] as (RecommendationConfig & { key: string })[]
  },
  creditsPrice: 0
}

// DEFAULT VALUES FOR LOCAL SAVED ANALYTICS
export const DEFAULT_INTERACTIONS_ANALYTICS: InteractionsPropertiesAnalytics = {
  visitors: 0,
  impressions: 0,
  views: 0,
  email: 0,
  phone: 0,
  whatsapp: 0,
  chat: 0,
  saves: 0
}

export const DEFAULT_PROPERTIES_ANALYTICS: PropertiesAnalytics = {
  totalActiveProperties: 0,
  totalInactiveProperties: 0,
  totalPerCategory: [],
  totalSale: 0,
  totalRent: 0,
  averageSellingPrice: 0,
  averageRentingPriceDaily: 0,
  averageRentingPriceMonthly: 0,
  averageRentingPriceYearly: 0
}

export const DEFAULT_CONVERSION_RATE = 0
