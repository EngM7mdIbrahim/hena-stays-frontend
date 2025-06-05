import { Modules } from '@enums'

import { RolePermissions } from '@interfaces'

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
  canCheckMyProfile: false,
  canSeeMemberSuggestions: true,
  canSearchWithInPage: false,
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
  canViewContactUsBanner: false,
  canSaveProperty: false,
  canAddXml: false,
  canViewXmlRequests: false,
  canSeeInteractions: propertyScopeCallback
}
// for buy and sell requests
const propertyRequestScopeCallback = () => false
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
  canInteractWithLead: false
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
  canViewUsersPage: false
}
const creditsPermissions: RolePermissions[Modules.CREDITS] = {
  canAddCredits: false,
  canViewCreditsPage: false
}

export const adminViewerRolePermissions: RolePermissions = {
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
