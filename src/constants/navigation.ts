import { Property } from '@commonTypes'
import { LinksKeys } from '@enums'
import { AiOutlineTransaction } from 'react-icons/ai'
import {
  FaBlog,
  FaBookmark,
  FaBuilding,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaComments,
  FaHammer,
  FaHeadset,
  FaHome,
  FaInfoCircle,
  FaPeopleArrows,
  FaUser,
  FaUsers,
  FaUserTie
} from 'react-icons/fa'
import { ImUsers } from 'react-icons/im'
import { MdOutlineRequestPage } from 'react-icons/md'

import { SidebarLink, TranslationFn } from '@interfaces'

export const navigationLinks = {
  assets: {
    plus: '/svgs/plus.svg',
    video: '/svgs/video.svg',
    logo: '/images/logo.png',
    logoOg: '/images/logo-og.png',
    placeholder: '/images/dummy2.jfif',
    general: '/images/general.png',
    successPasswordChange: '/images/register/successPasswordChange.svg',
    successRegister: '/images/register/successRegister.svg',
    generalSuccess: '/svgs/success.svg',
    otp: '/images/register/otp.svg',
    wrongOtp: '/images/register/wrongotp.svg',
    goldenCircle: '/svgs/golden circle.svg',
    bookmarkGradient: '/svgs/bookmark-gradient.svg',
    building: '/svgs/building.svg',
    living: '/svgs/living.svg',
    bath: '/svgs/bath.svg',
    bed: '/svgs/bed.svg',
    livingDark: '/svgs/living-dark.svg',
    bathDark: '/svgs/bath-dark.svg',
    bedDark: '/svgs/bed-dark.svg',
    location: '/svgs/location.svg',
    locationDark: '/svgs/location-dark.svg',
    incomingMessageAlert: '/audio/incoming-message-alert.mp3',
    privacyPolicy: '/svgs/privacy-policy.svg',
    moon: '/svgs/moon.svg',
    sun: '/svgs/sun.svg',
    notificationBell: '/svgs/bell.svg',
    userFollow: '/svgs/user-follow.svg',
    userUnfollow: '/svgs/user-unfollow.svg',
    contactUs: '/images/about/contact.png',
    services: {
      firstService: '/images/landing/services/1.webp',
      secondService: '/images/landing/services/2.webp',
      thirdService: '/images/landing/services/3.webp'
    },
    propertiesFeatures: {
      1: '/svgs/features/1.svg',
      2: '/svgs/features/2.svg',
      3: '/svgs/features/3.svg',
      4: '/svgs/features/4.svg',
      5: '/svgs/features/5.svg',
      6: '/svgs/features/6.svg',
      7: '/svgs/features/7.svg',
      8: '/svgs/features/8.svg',
      9: '/svgs/features/9.svg',
      10: '/svgs/features/10.svg',
      11: '/svgs/features/11.svg',
      12: '/svgs/features/12.svg',
      13: '/svgs/features/13.svg'
    },
    projects: {
      plan: '/svgs/plan.svg',
      coins: '/svgs/coins.svg',
      delivery: '/svgs/delivery.svg'
    },
    analytics: {
      clock: '/svgs/analytics/time.svg',
      user: '/svgs/analytics/user.svg',
      clicks: '/svgs/analytics/click.svg',
      chat: '/svgs/analytics/chat.svg',
      check: '/svgs/analytics/check.svg',
      whats: '/svgs/analytics/whats.svg',
      phone: '/svgs/analytics/phone.svg',
      email: '/svgs/analytics/email.svg',
      statUp: '/svgs/analytics/stat-up.svg',
      statDown: '/svgs/analytics/stat-down.svg'
    },
    propertyTrademarks: {
      beds: '/svgs/propertyView/bed.svg',
      baths: '/svgs/propertyView/bath.svg',
      size: '/svgs/propertyView/size.svg',
      coin: '/svgs/propertyView/coin.svg',
      living: '/svgs/propertyView/living.svg',
      propertyType: '/svgs/propertyView/propertyType.svg'
    },
    subscription: {
      success: '/images/subscription/success.webp',
      failed: '/images/subscription/decline.webp',
      credits: '/svgs/subscription/credit.svg'
    },
    recommendationIcons: {
      propertyOfTheWeek: '/svgs/recommendationIcons/week.svg',
      signature: '/svgs/recommendationIcons/star.svg',
      hot: '/svgs/recommendationIcons/hot.svg',
      hotFill: '/svgs/recommendationIcons/hot-fill.svg',
      starFill: '/svgs/recommendationIcons/star-fill.svg',
      propertyOfTheWeekFill: '/svgs/recommendationIcons/week-fill.svg'
    },
    landing: {
      headerBackground: '/images/landing/background-header.webp',
      headerBackgroundAr: '/images/landing/background-header-ar.webp',
      headerBackgroundDark: '/images/landing/background-header-dark.webp',
      headerBackgroundDarkAr: '/images/landing/background-header-dark-ar.webp',
      headerBackgroundPhone: '/images/landing/background-header-phone.webp',
      about: '/images/landing/about.png',
      users: '/svgs/landing/users.svg',
      aboutIcons: {
        1: '/svgs/landing/about/1.svg',
        2: '/svgs/landing/about/2.svg',
        3: '/svgs/landing/about/3.svg'
      },
      sell: {
        sell: '/images/landing/sell.webp',
        sellMobile: '/images/landing/sellM.webp'
      }
    }
  },
  properties: {
    myListings: '/properties/mine',
    savedProperties: '/properties/saved',
    allProperties: '/properties',
    addProperty: '/properties/add-property',
    addXml: '/properties/add-xml',
    editProperty: (id?: string) => `/properties/edit/${id}`,
    viewProperty: (id?: string) => `/properties/${id}`,
    recommended: (id?: string) => `/properties/recommended/${id}`
  },
  buyPropertyRequests: {
    allBuyPropertyRequests: '/buy-property-requests',
    addBuyPropertyRequests: '/buy-property-requests/add-buy-property-request',
    editBuyPropertyRequests: (id?: string) =>
      `/buy-property-requests/edit/${id}`,
    chooseBuyPropertyRequest: '/buy-property-requests/choose',
    makeCall: '/buy-property-requests/make-call',
    successRequest: '/buy-property-requests/success'
  },
  sellPropertyRequests: {
    allSellPropertyRequests: '/sell-property-requests',

    addSellPropertyRequests:
      '/sell-property-requests/add-sell-property-request',
    editSellPropertyRequests: (id?: string) =>
      `/sell-property-requests/edit/${id}`,
    viewSellPropertyRequest: (id?: string) => `/sell-property-requests/${id}`
  },
  projects: {
    allProjects: '/projects',
    addProject: '/projects/add-project',
    editProject: (id?: string) => `/projects/edit/${id}`,
    viewProject: (id?: string) => `/projects/${id}`,
    myProjects: '/projects/mine'
  },
  community: {
    allPosts: '/community',
    savedPosts: '/community/saved-posts',
    viewPost: (id?: string) => `/community/posts/${id}`,
    addBlogPost: '/community/blogs/add-blog-post',
    editBlogPost: (id?: string) => `/community/blogs/${id}`,
    profile: (id?: string) => `/community/profile/${id}`,
    profileBlogView: (profileId: string, blogId?: string) =>
      `/community/profile/${profileId}/blog/${blogId}`,
    followers: '/followers'
  },
  news: {
    allNews: '/news',
    viewNews: (id?: string) => `/news/${id}`
  },
  work: {
    clients: '/clients',
    appointments: '/appointments',
    analytics: '/analytics',
    employees: '/employees',
    leads: '/leads'
  },
  employees: {
    addEmployee: '/employees/add-employee',
    editEmployee: (id?: string) => `/employees/edit/${id}`,
    employeesAnalytics: '/employees/employee-analytics'
  },
  auth: {
    signUp: '/sign-up',
    successSignUp: '/sign-up/success-signup',
    forgetPassword: '/forgetPassword',
    successForgetPasswordEmailSent: '/forgetPassword/success-email-sent',
    resetPassword: '/reset-password',
    successResetPassword: '/reset-password/success-reset',
    verifyCode: '/sign-up/verify-code',
    signIn: '/sign-in'
  },
  userProfile: {
    profile: '/profile',
    settings: '/settings',
    messages: '/chats',
    support: '/chats',
    myAccount: {
      account: '/my-account',
      profile: '/my-account/settings',
      followings: '/my-account/followings'
    }
  },
  landingPage: '/',
  subscription: {
    credits: '/premium',
    checkout: '/checkout',
    checkoutCallback: '/checkout/callback'
  },
  termsOfUse: '/terms-of-use',
  privacyPolicy: '/privacy-policy',
  chats: '/chats',
  leaderBoard: '/leader-board',
  about: '/about',
  socialMedia: {
    instagram: 'https://www.instagram.com/truedar_/',
    twitter: 'https://www.twitter.com',
    facebook: 'https://www.facebook.com/people/Truedar/61555360152044/',
    linkedin: 'https://ae.linkedin.com/company/truedar'
  },
  notifications: {
    notificationsCallBack: '/notification/callback'
  },
  methodsCommunication: {
    chat(id: string | undefined) {
      if (!id) return undefined
      return `/community/profile/${id}/chat`
    },
    email(
      email: string | undefined,
      makeLead?: boolean,
      property?: Property,
      currentUrl?: string,
      locale?: string
    ) {
      if (!email) return undefined
      if (!makeLead) return `mailto:${email}`

      const isArabic = locale?.startsWith('ar')
      const subject = encodeURIComponent(
        isArabic ? 'استفسار عن العقار' : 'Inquiry About Property Listing'
      )
      const body = isArabic
        ? encodeURIComponent(`مرحبًا عزيزي،

أتمنى أن تكون بخير.

أكتب إليك للاستفسار عن عقار مُدرج على TrueDar. فيما يلي تفاصيل العقار:

اسم العقار: ${property?.title || 'N/A'}

سعر العقار: ${property?.price?.value || 'N/A'}

رابط العقار: ${currentUrl || 'N/A'}

أكون ممتنًا لو تفضلتم بتزويدي بمزيد من المعلومات حول هذا العقار.

شكرًا لكم.`)
        : encodeURIComponent(`Hello Dear,

I hope this message finds you well.

I am writing to inquire about a property listed on TrueDar. Below are the details of the property:

Property Name: ${property?.title || 'N/A'}

Property Price: ${property?.price?.value || 'N/A'}

Property Link: ${currentUrl || 'N/A'}

I would appreciate it if you could provide me with more information regarding this property.

Thank you`)

      return `mailto:${email}?subject=${subject}&body=${body}`
    },
    whatsapp(
      phone: string | undefined,
      makeLead?: boolean,
      property?: Property,
      // this is  false in case of admin and true for others
      canCreateALead?: boolean
    ) {
      if (!phone) return undefined
      if (!makeLead) return `https://wa.me/${phone}`

      return `/external/whatsapp-lead?id=${property?._id}&name=${property?.title}&priceValue=${property?.price?.value}${!canCreateALead ? `&ownerWhatsapp=${phone}` : ''}`
    },
    call(phone: string | undefined) {
      if (!phone) return undefined
      return `tel:${phone}`
    }
  },

  socialMediaShare: {
    facebook: (link: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
    twitter: (link: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        link
      )}&text=Check%20this%20out!`,

    instagram: (link: string) =>
      `https://www.instagram.com/?text=${encodeURIComponent(link)}`,
    linkedin: (link: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        link
      )}&title=Check%20this%20out!`
  },
  officialBlogs: {
    allOfficialBlogs: '/official-blogs',
    viewOfficialBlog: (slug: string) => `/official-blogs/${slug}`
  },

  admin: {
    analytics: '/admin/analytics',
    users: {
      allUsers: '/admin/users',
      viewUser: (id?: string) => `/admin/users/${id}`,
      editUser: (id?: string) => `/admin/users/edit-user/${id}`,
      addUser: '/admin/users/add-user',
      viewCallRequests: '/admin/users/call-requests',
      viewContactUsRequests: '/admin/users/contact-us-requests'
    },

    properties: {
      allProperties: '/admin/properties',
      xmlRequests: '/admin/properties/xml',
      viewXmlRequest: (id?: string) => `/admin/properties/xml/${id}`
    },

    projects: '/admin/projects',
    officialBlogs: {
      allOfficialBlogs: '/admin/official-blogs',
      addOfficialBlog: '/admin/official-blogs/add',
      editOfficialBlog: (id?: string) => `/admin/official-blogs/edit/${id}`
    },
    creditRequests: {
      allCreditRequests: '/admin/credit-requests'
    },
    transactions: {
      allTransactions: '/admin/transactions'
    }
  }
}

export const GET_ALL_LINKS: (
  t: TranslationFn
) => Record<LinksKeys, SidebarLink> = (t: TranslationFn) => ({
  [LinksKeys.Followings]: {
    route: navigationLinks.userProfile.myAccount.followings,
    icon: FaUsers,
    label: t('navigation.followings')
  },

  [LinksKeys.Account]: {
    route: navigationLinks.userProfile.myAccount.profile,
    icon: FaCog,
    label: t('navigation.myAccount')
  },

  [LinksKeys.Profile]: {
    route: navigationLinks.userProfile.profile,
    icon: FaUser,
    label: t('navigation.profile')
  },
  [LinksKeys.Followers]: {
    route: navigationLinks.community.followers,
    icon: FaUsers,
    label: t('navigation.followers')
  },
  [LinksKeys.SellForMeRequests]: {
    route: navigationLinks.sellPropertyRequests.allSellPropertyRequests,
    icon: FaHammer,
    label: t('navigation.sellForMeRequests')
  },
  [LinksKeys.PropertyRequests]: {
    route: navigationLinks.buyPropertyRequests.allBuyPropertyRequests,
    icon: FaHome,
    label: t('navigation.propertyRequests')
  },
  [LinksKeys.SavedProperties]: {
    route: navigationLinks.properties.savedProperties,
    icon: FaBookmark,
    label: t('navigation.savedProperties')
  },
  [LinksKeys.Settings]: {
    route: navigationLinks.userProfile.settings,
    icon: FaCog,
    label: t('navigation.settings')
  },
  [LinksKeys.Support]: {
    route: navigationLinks.userProfile.support,
    icon: FaHeadset,
    label: t('navigation.support')
  },
  [LinksKeys.About]: {
    route: navigationLinks.about,
    icon: FaInfoCircle,
    label: t('navigation.about')
  },
  [LinksKeys.Home]: {
    label: t('navigation.home'),
    icon: FaHome,
    route: navigationLinks.landingPage
  },
  [LinksKeys.MyListing]: {
    label: t('navigation.myProperties'),
    icon: FaClipboardList,
    route: navigationLinks.properties.myListings
  },
  [LinksKeys.Projects]: {
    label: t('navigation.projects'),
    icon: FaBuilding,
    route: navigationLinks.projects.allProjects
  },
  [LinksKeys.LeaderBoard]: {
    label: 'Leaderboard',
    icon: FaChartLine,
    route: navigationLinks.leaderBoard
  },
  [LinksKeys.Leads]: {
    label: t('navigation.leads'),
    icon: FaPeopleArrows,
    route: navigationLinks.work.leads
  },
  [LinksKeys.Messages]: {
    label: t('navigation.messages'),
    icon: FaComments,
    route: navigationLinks.userProfile.messages
  },
  [LinksKeys.SellForMe]: {
    label: t('navigation.sellForMeRequests'),
    icon: FaClipboardList,
    route: navigationLinks.sellPropertyRequests.allSellPropertyRequests
  },
  [LinksKeys.Community]: {
    label: t('navigation.community'),
    icon: FaUsers,
    route: navigationLinks.community.allPosts
  },
  [LinksKeys.Clients]: {
    label: 'Clients',
    icon: ImUsers,
    route: navigationLinks.work.clients
  },
  [LinksKeys.Appointments]: {
    label: 'Appointments',
    icon: FaCalendarAlt,
    route: navigationLinks.work.appointments
  },
  [LinksKeys.Analytics]: {
    label: t('navigation.analytics'),
    icon: FaChartBar,
    route: navigationLinks.work.analytics
  },
  [LinksKeys.AdminAnalytics]: {
    label: t('navigation.home'),
    icon: FaChartBar,
    route: navigationLinks.admin.analytics
  },
  [LinksKeys.Employees]: {
    label: t('navigation.employees'),
    icon: FaUserTie,
    route: navigationLinks.work.employees
  },
  [LinksKeys.Properties]: {
    label: t('navigation.properties'),
    icon: FaBuilding,
    route: navigationLinks.properties.allProperties
  },
  [LinksKeys.ForCompaniesAgents]: {
    label: t('navigation.forCompaniesAgents'),
    icon: FaBuilding,
    route: navigationLinks.auth.signIn
  },
  [LinksKeys.ForUsers]: {
    label: t('navigation.login'),
    icon: FaBuilding,
    route: navigationLinks.auth.signIn
  },
  [LinksKeys.Blog]: {
    label: 'Blog',
    icon: FaBlog,
    route: navigationLinks.community.allPosts
  },
  [LinksKeys.Posts]: {
    label: 'Posts',
    icon: FaBlog,
    route: navigationLinks.community.allPosts
  },
  [LinksKeys.AdminUsers]: {
    label: t('navigation.users'),
    icon: FaUserTie,
    route: navigationLinks.admin.users.allUsers
  },
  [LinksKeys.AdminProperties]: {
    label: t('navigation.properties'),
    icon: FaBuilding,
    route: [
      navigationLinks.admin.properties.allProperties,
      navigationLinks.properties.allProperties
    ]
  },
  [LinksKeys.AdminProjects]: {
    label: t('navigation.projects'),
    icon: FaBuilding,
    route: [
      navigationLinks.admin.projects,
      navigationLinks.projects.allProjects
    ]
  },
  [LinksKeys.AdminOfficialBlogs]: {
    label: t('navigation.officialBlogs'),
    icon: FaBlog,
    route: [
      navigationLinks.admin.officialBlogs.allOfficialBlogs,
      navigationLinks.officialBlogs.allOfficialBlogs
    ]
  },
  [LinksKeys.OfficialBlogs]: {
    label: t('navigation.officialBlogs'),
    icon: FaBlog,
    route: navigationLinks.officialBlogs.allOfficialBlogs
  },
  [LinksKeys.CreditRequests]: {
    label: t('navigation.creditRequests'),
    icon: MdOutlineRequestPage,
    route: navigationLinks.admin.creditRequests.allCreditRequests
  },
  [LinksKeys.Transactions]: {
    label: t('navigation.transactions'),
    icon: AiOutlineTransaction,
    route: navigationLinks.admin.transactions.allTransactions
  }
})

// Community Navigation settings
export const hideCommunityNavigationLinks = [
  navigationLinks.userProfile.profile,
  navigationLinks.admin.users.allUsers
]
