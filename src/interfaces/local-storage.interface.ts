import {
  InteractionsPropertiesAnalytics,
  PropertiesAnalytics
} from '@commonTypes'

export interface SavedAnalytics {
  propertiesAnalytics: PropertiesAnalytics
  interactionsAnalytics: InteractionsPropertiesAnalytics
  conversionRate: number
  savedAt: string
}

export interface SavedCommunityAnalytics {
  profileViews: number
  postsInteractions: number
  savedAt: string
}
