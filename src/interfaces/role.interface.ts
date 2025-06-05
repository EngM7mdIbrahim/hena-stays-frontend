import {
  Blog,
  Post,
  Project,
  Property,
  RequestBuyProperty,
  RequestSellProperty,
  User
} from '@commonTypes'
import { Modules } from '@enums'

type PostScopeCallback = (user: User | null, post?: Post | null) => boolean

type BlogPostScopeCallback = (user: User | null, blog?: Blog | null) => boolean

export interface CommunityRolePermissions {
  canCreatePost: boolean
  canSeeCommunityHeaderTitle: boolean
  canCreateBlogPost: boolean
  canEditPost: PostScopeCallback
  canDeletePost: PostScopeCallback
  canEditBlogPost: BlogPostScopeCallback
  canDeleteBlogPost: BlogPostScopeCallback
  canViewPosts: boolean
  canCheckMyProfile: boolean
  canSeeMemberSuggestions: boolean
  canSearchWithInPage: boolean
  canInteractWithPost: boolean
}

type PropertyScopeCallback = (
  user: User | null,
  property?: Property | null
) => boolean
export interface PropertiesRolePermissions {
  canViewMyProperties: boolean
  canViewSavedProperties: boolean
  canCreateProperty: boolean
  canEditProperty: PropertyScopeCallback
  canDeleteProperty: PropertyScopeCallback
  canViewContactUsBanner: boolean
  canSaveProperty: boolean
  canAddXml: boolean
  canViewXmlRequests: boolean
  canSeeInteractions: PropertyScopeCallback
}

// for buy and sell requests permissions
type RequestScopeCallback = (
  user: User | null,
  request?: RequestBuyProperty | RequestSellProperty | null
) => boolean

export interface BuyPropertyRequestsRolePermissions {
  canViewAllBuyPropertyRequests: boolean
  canViewMyBuyPropertyRequests: boolean
  canAddBuyPropertyRequest: boolean
  canEditBuyPropertyRequest: RequestScopeCallback
  canDeletedBuyPropertyRequest: RequestScopeCallback
}
export interface SellPropertyRequestRolePermissions {
  canViewAllSellPropertyRequests: boolean
  canViewMySellPropertyRequests: boolean
  canAddSellPropertyRequest: boolean
  canEditSellPropertyRequest: RequestScopeCallback
  canDeletedSellPropertyRequest: RequestScopeCallback
}

type ProjectScopeCallback = (
  user: User | null,
  project?: Project | null
) => boolean

export interface ProjectsRolePermissions {
  canViewMyProjects: boolean
  canCreateProject: boolean
  canAddPropertyToProject: ProjectScopeCallback

  canEditProject: ProjectScopeCallback
  canDeleteProject: ProjectScopeCallback
  canRecommendProject: ProjectScopeCallback
  canSeeInteractions: ProjectScopeCallback
}

export interface ChatPermissions {
  canSeeHelpCenterButton: boolean
}

export interface EmployeesPermissions {
  canSeeMyTeam: boolean
  canAddEmployee: boolean
  canSeeEmployeesPage: boolean
  canEditEmployee: (user: User | null, employee?: User | null) => boolean
}

export interface LeadsPermissions {
  canSeeLeadsRequests: boolean
  canInteractWithLead: boolean
  canViewLeadsPage: boolean
  canCreateALead: boolean
}

export interface OfficialBlogsPermissions {
  canAddOfficialBlog: boolean
  canEditOfficialBlog: boolean
  canDeleteOfficialBlog: boolean
}

export interface AnalyticsPermissions {
  canViewAnalyticsPage: boolean
}

export interface SettingsPermissions {
  canViewSettingsPage: boolean
}

export interface UsersPermissions {
  canViewUsersPage: boolean
}

export interface CreditsPermissions {
  canAddCredits: boolean
  canViewCreditsPage: boolean
}

export interface RolePermissions {
  [Modules.COMMUNITY]: CommunityRolePermissions
  [Modules.PROPERTIES]: PropertiesRolePermissions
  [Modules.PROJECTS]: ProjectsRolePermissions
  [Modules.BUY_PROPERTY_REQUESTS]: BuyPropertyRequestsRolePermissions
  [Modules.CHAT]: ChatPermissions
  [Modules.SELL_PROPERTY_REQUESTS]: SellPropertyRequestRolePermissions
  [Modules.EMPLOYEES]: EmployeesPermissions
  [Modules.LEADS]: LeadsPermissions
  [Modules.OFFICIAL_BLOGS]: OfficialBlogsPermissions
  [Modules.ANALYTICS]: AnalyticsPermissions
  [Modules.SETTINGS]: SettingsPermissions
  [Modules.USERS]: UsersPermissions
  [Modules.CREDITS]: CreditsPermissions
}
