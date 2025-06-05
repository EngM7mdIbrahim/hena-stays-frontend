import { Modules } from '@enums'

import { RolePermissions } from '@interfaces'

const postScopeCallback = () => true
const blogPostScopeCallback = () => true

const communityPermissions: RolePermissions[Modules.COMMUNITY] = {
  canCreatePost: true,
  canCreateBlogPost: true,
  canEditPost: postScopeCallback,
  canDeletePost: postScopeCallback,
  canEditBlogPost: blogPostScopeCallback,
  canDeleteBlogPost: blogPostScopeCallback,
  canViewPosts: true,
  canSeeCommunityHeaderTitle: true,
  canCheckMyProfile: true,
  canSeeMemberSuggestions: true,
  canSearchWithInPage: false,
  canInteractWithPost: true
}

// Property permissions

const propertyScopeCallback = () => true
const propertiesPermissions: RolePermissions[Modules.PROPERTIES] = {
  canCreateProperty: false,
  canEditProperty: propertyScopeCallback,
  canDeleteProperty: propertyScopeCallback,
  canViewMyProperties: false,
  canViewSavedProperties: false,
  canViewContactUsBanner: false,
  canSaveProperty: false,
  canAddXml: false,
  canViewXmlRequests: true,
  canSeeInteractions: propertyScopeCallback
}
// for buy and sell requests
const propertyRequestScopeCallback = () => true
const buyPropertyRequestsPermissions: RolePermissions[Modules.BUY_PROPERTY_REQUESTS] =
  {
    canViewAllBuyPropertyRequests: true,
    canViewMyBuyPropertyRequests: false,
    canAddBuyPropertyRequest: false,
    canDeletedBuyPropertyRequest: propertyRequestScopeCallback,
    canEditBuyPropertyRequest: propertyRequestScopeCallback
  }

const sellPropertyRequestsPermissions: RolePermissions[Modules.SELL_PROPERTY_REQUESTS] =
  {
    canViewAllSellPropertyRequests: true,
    canViewMySellPropertyRequests: false,
    canAddSellPropertyRequest: false,
    canEditSellPropertyRequest: propertyRequestScopeCallback,
    canDeletedSellPropertyRequest: propertyRequestScopeCallback
  }
const chatPermissions: RolePermissions[Modules.CHAT] = {
  canSeeHelpCenterButton: false
}

const projectScopeCallback = () => true

const projectsPermissions: RolePermissions[Modules.PROJECTS] = {
  canViewMyProjects: true,
  canCreateProject: false,
  canAddPropertyToProject: projectScopeCallback,
  canEditProject: projectScopeCallback,
  canDeleteProject: projectScopeCallback,
  canRecommendProject: projectScopeCallback,
  canSeeInteractions: projectScopeCallback
}

const employeeScopeCallback = () => true

const employeesPermissions: RolePermissions[Modules.EMPLOYEES] = {
  canSeeMyTeam: false,
  canAddEmployee: false,
  canSeeEmployeesPage: true,
  canEditEmployee: employeeScopeCallback
}

const leadsPermissions: RolePermissions[Modules.LEADS] = {
  canSeeLeadsRequests: true,
  canViewLeadsPage: true,
  canCreateALead: false,
  canInteractWithLead: true
}

const officialBlogsPermissions: RolePermissions[Modules.OFFICIAL_BLOGS] = {
  canAddOfficialBlog: true,
  canEditOfficialBlog: true,
  canDeleteOfficialBlog: true
}
const analyticsPermissions: RolePermissions[Modules.ANALYTICS] = {
  canViewAnalyticsPage: false
}
const settingsPermissions: RolePermissions[Modules.SETTINGS] = {
  canViewSettingsPage: true
}
const usersPermissions: RolePermissions[Modules.USERS] = {
  canViewUsersPage: true
}
const creditsPermissions: RolePermissions[Modules.CREDITS] = {
  canAddCredits: false,
  canViewCreditsPage: false
}

export const adminRolePermissions: RolePermissions = {
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
