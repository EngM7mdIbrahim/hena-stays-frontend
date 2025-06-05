export const COMMUNITY = {
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIKES: 'likes',
  SAVES: 'saves',
  FOLLOWS: 'follows',
  PROFILE: 'profile',
  Blogs: 'blogs',
  USERS: 'users'
}

export const OFFICIAL_BLOGS = {
  OFFICIAL_BLOGS: 'official-blogs'
}

export const GOOGLE = {
  SEARCH_PLACES: 'search-places',
  GET_PLACES: 'get-places'
}

export const CATEGORIES = 'categories'

export const PROPERTIES = {
  SAVES: 'saves',
  ANALYTICS: 'analytics',
  AMENITIES: 'amenities',
  PROPERTIES: 'properties',
  SINGLE_PROPERTY: (id: string) => {
    return ['property', id]
  },
  XML: {
    PROPERTIES_XML: 'properties-xml',
    SINGLE_PROPERTY_XML: (id: string) => {
      return ['property-xml', id]
    }
  }
}

export const BUY_PROPERTY_REQUESTS = {
  BUY_PROPERTY_REQUESTS: 'buy-property-requests'
}

export const USERS = {
  USERS: 'users',
  ME: 'me',
  SINGLE_USER: (id: string) => {
    return ['users', id]
  },
  DEFAULT_SUPPORT_USER: 'default-support-user'
}

export const CALL_REQUESTS = {
  CALL_REQUESTS: 'call-requests'
}

export const CHATS = {
  CHATS: 'chats',
  CHATS_MESSAGES: 'messages'
}
export const SELL_PROPERTY_REQUESTS = {
  SELL_PROPERTY_REQUESTS: 'sell-property-requests',
  SINGLE_SELL_PROPERTY_REQUEST: (id: string) => {
    return ['sell-property-requests', id]
  }
}

export const PROJECTS = {
  PROJECTS: 'projects',
  SINGLE_PROJECT: (id: string) => {
    return ['project', id]
  }
}
export const LEADS = {
  LEADS: 'leads',
  SINGLE_LEAD: (id: string) => {
    return ['leads', id]
  }
}
export const INTERACTIONS = {
  INTERACTIONS: 'interactions',
  SINGLE_INTERACTION: (id: string) => {
    return ['interactions', id]
  }
}

export const ANALYTICS = {
  PROPERTIES: 'properties-analytics',
  USERS: 'users-analytics',
  LATEST_COMMENTS: 'latest-comments',
  COMMUNITY_ANALYTICS: 'community-analytics'
}

export const NEWS = {
  NEWS: 'news',
  SINGLE_NEWS: (id: string) => {
    return ['news', id]
  }
}
export const NOTIFICATIONS = {
  ALL: 'notifications',
  COUNT_UNREAD: 'count-unread',
  SINGLE_NOTIFICATION: (id: string) => {
    return ['notifications', id]
  }
}

export const CONTACT_US = {
  CONTACT_US: 'contact-us',
  SINGLE_CONTACT_US: (id: string) => {
    return ['contact-us', id]
  }
}

export const SUBSCRIPTIONS = {
  SUBSCRIPTIONS: 'subscriptions',
  SINGLE_SUBSCRIPTION: (id: string) => {
    return ['subscription', id]
  },
  MY_SUBSCRIPTION: 'my-subscription'
}

export const CONFIG = {
  CONFIG: 'config'
}

export const PAYMENT = {
  CREDITS: 'credits',
  CREDITS_REQUEST: {
    ALL: 'credits-request',
    SINGLE: (id: string) => ['credits-request', id]
  }
}
