import { Modules } from '@enums'

import { RolePermissions } from '@interfaces'

const postScopeCallback = () => false
const blogPostScopeCallback = () => false

const communityPermissions: RolePermissions[Modules.COMMUNITY] = {
  canViewPosts: true,
  canCreatePost: false,
  canCreateBlogPost: false,
  canEditPost: postScopeCallback,
  canDeletePost: postScopeCallback,
  canEditBlogPost: blogPostScopeCallback,
  canDeleteBlogPost: blogPostScopeCallback,
  canSeeCommunityHeaderTitle: true,
  canCheckMyProfile: false,
  canSeeMemberSuggestions: true,
  canSearchWithInPage: true,
  canInteractWithPost: false
}

const settingsPermissions: RolePermissions[Modules.SETTINGS] = {
  canViewSettingsPage: false
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
  canAddXml: false,
  canSaveProperty: false,
  canViewXmlRequests: false,
  canSeeInteractions: propertyScopeCallback
}

// for buy and sell requests
const propertyRequestScopeCallback = () => false

const buyPropertyRequestsPermissions: RolePermissions[Modules.BUY_PROPERTY_REQUESTS] =
  {
    canViewAllBuyPropertyRequests: false,
    canViewMyBuyPropertyRequests: false,
    canAddBuyPropertyRequest: true,
    canEditBuyPropertyRequest: propertyRequestScopeCallback,
    canDeletedBuyPropertyRequest: propertyRequestScopeCallback
  }

const sellPropertyRequestsPermissions: RolePermissions[Modules.SELL_PROPERTY_REQUESTS] =
  {
    canViewAllSellPropertyRequests: false,
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

const employeeScopeCallback = () => false

const employeesPermissions: RolePermissions[Modules.EMPLOYEES] = {
  canSeeMyTeam: false,
  canAddEmployee: false,
  canSeeEmployeesPage: false,
  canEditEmployee: employeeScopeCallback
}

const leadsPermissions: RolePermissions[Modules.LEADS] = {
  canSeeLeadsRequests: false,
  canCreateALead: false,
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
const usersPermissions: RolePermissions[Modules.USERS] = {
  canViewUsersPage: false
}

const creditsPermissions: RolePermissions[Modules.CREDITS] = {
  canAddCredits: false,
  canViewCreditsPage: false
}

export const guestRolePermissions: RolePermissions = {
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
