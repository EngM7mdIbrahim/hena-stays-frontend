import { RequestBuyProperty, User } from '@commonTypes'
import { Modules } from '@enums'

import { RolePermissions } from '@interfaces'
import { extractId } from '@utils'

const postScopeCallback = () => false
const blogPostScopeCallback = () => false

const communityPermissions: RolePermissions[Modules.COMMUNITY] = {
  canCreatePost: false,
  canCreateBlogPost: false,
  canEditPost: postScopeCallback,
  canDeletePost: postScopeCallback,
  canEditBlogPost: blogPostScopeCallback,
  canDeleteBlogPost: blogPostScopeCallback,
  canViewPosts: true,
  canSeeCommunityHeaderTitle: true,
  canSeeMemberSuggestions: true,
  canCheckMyProfile: false,
  canSearchWithInPage: true,
  canInteractWithPost: true
}

// Property permissions

const propertyScopeCallback = () => false
const propertiesPermissions: RolePermissions[Modules.PROPERTIES] = {
  canCreateProperty: false,
  canEditProperty: propertyScopeCallback,
  canDeleteProperty: propertyScopeCallback,
  canViewMyProperties: false,
  canViewSavedProperties: false,
  canViewContactUsBanner: true,
  canSaveProperty: true,
  canAddXml: false,
  canViewXmlRequests: false,
  canSeeInteractions: propertyScopeCallback
}

// for sell and buy requests
const propertyRequestScopeCallback = (
  user: User | null,
  request?: Pick<RequestBuyProperty, 'createdBy'> | null
) => user?._id === extractId(request?.createdBy, '_id')

const buyPropertyRequestsPermissions: RolePermissions[Modules.BUY_PROPERTY_REQUESTS] =
  {
    canViewAllBuyPropertyRequests: false,
    canViewMyBuyPropertyRequests: true,
    canAddBuyPropertyRequest: true,
    canEditBuyPropertyRequest: propertyRequestScopeCallback,
    canDeletedBuyPropertyRequest: propertyRequestScopeCallback
  }

const sellPropertyRequestsPermissions: RolePermissions[Modules.SELL_PROPERTY_REQUESTS] =
  {
    canViewAllSellPropertyRequests: true,
    canViewMySellPropertyRequests: true,
    canAddSellPropertyRequest: true,
    canEditSellPropertyRequest: propertyRequestScopeCallback,
    canDeletedSellPropertyRequest: propertyRequestScopeCallback
  }
const chatPermissions: RolePermissions[Modules.CHAT] = {
  canSeeHelpCenterButton: true
}

const projectScopeCallback = () => false

const projectsPermissions: RolePermissions[Modules.PROJECTS] = {
  canViewMyProjects: false,
  canCreateProject: false,
  canAddPropertyToProject: projectScopeCallback,
  canEditProject: projectScopeCallback,
  canDeleteProject: projectScopeCallback,
  canRecommendProject: projectScopeCallback,
  canSeeInteractions: projectScopeCallback
}

const employeeScopeCallback = () => false

const employeesPermissions: RolePermissions[Modules.EMPLOYEES] = {
  canSeeMyTeam: false,
  canAddEmployee: false,
  canSeeEmployeesPage: false,
  canEditEmployee: employeeScopeCallback
}

const leadsPermissions: RolePermissions[Modules.LEADS] = {
  canSeeLeadsRequests: false,
  canCreateALead: true,
  canViewLeadsPage: false,
  canInteractWithLead: false
}

const officialBlogsPermissions: RolePermissions[Modules.OFFICIAL_BLOGS] = {
  canAddOfficialBlog: false,
  canEditOfficialBlog: false,
  canDeleteOfficialBlog: false
}

const analyticsPermissions: RolePermissions[Modules.ANALYTICS] = {
  canViewAnalyticsPage: false
}

const settingsPermissions: RolePermissions[Modules.SETTINGS] = {
  canViewSettingsPage: false
}
const usersPermissions: RolePermissions[Modules.USERS] = {
  canViewUsersPage: false
}

const creditsPermissions: RolePermissions[Modules.CREDITS] = {
  canAddCredits: false,
  canViewCreditsPage: false
}

export const userRolePermissions: RolePermissions = {
  [Modules.COMMUNITY]: communityPermissions,
  [Modules.PROPERTIES]: propertiesPermissions,
  [Modules.PROJECTS]: projectsPermissions,
  [Modules.BUY_PROPERTY_REQUESTS]: buyPropertyRequestsPermissions,
  [Modules.CHAT]: chatPermissions,
  [Modules.SELL_PROPERTY_REQUESTS]: sellPropertyRequestsPermissions,
  [Modules.EMPLOYEES]: employeesPermissions,
  [Modules.LEADS]: leadsPermissions,
  [Modules.OFFICIAL_BLOGS]: officialBlogsPermissions,
  [Modules.ANALYTICS]: analyticsPermissions,
  [Modules.SETTINGS]: settingsPermissions,
  [Modules.USERS]: usersPermissions,
  [Modules.CREDITS]: creditsPermissions
}
