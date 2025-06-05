import { Blog, Post, Project, Property, User } from '@commonTypes'
import { Modules } from '@enums'

import { RolePermissions } from '@interfaces'
import { extractId } from '@utils'

const postScopeCallback = (user: User | null, post?: Post | null) =>
  user?._id === extractId(post?.user, '_id')
const blogPostScopeCallback = (user: User | null, blogPost?: Blog | null) =>
  user?._id === extractId(blogPost?.user, '_id')

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
  canSeeMemberSuggestions: false,
  canSearchWithInPage: false,
  canInteractWithPost: true
}

const propertyScopeCallback = (user: User | null, property?: Property | null) =>
  user?._id === extractId(property?.createdBy, '_id')
const propertiesPermissions: RolePermissions[Modules.PROPERTIES] = {
  canCreateProperty: true,
  canEditProperty: propertyScopeCallback,
  canDeleteProperty: propertyScopeCallback,
  canViewMyProperties: true,
  canViewSavedProperties: true,
  canViewContactUsBanner: false,
  canSaveProperty: true,
  canAddXml: true,
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
    canEditBuyPropertyRequest: propertyRequestScopeCallback,
    canDeletedBuyPropertyRequest: propertyRequestScopeCallback
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
  canSeeHelpCenterButton: true
}
const projectScopeCallback = (user: User | null, project?: Project | null) =>
  user?._id === extractId(project?.owner, '_id')

const projectsPermissions: RolePermissions[Modules.PROJECTS] = {
  canViewMyProjects: true,
  canCreateProject: true,
  canAddPropertyToProject: projectScopeCallback,
  canEditProject: projectScopeCallback,
  canDeleteProject: projectScopeCallback,
  canRecommendProject: projectScopeCallback,
  canSeeInteractions: projectScopeCallback
}

const employeeScopeCallback = (user: User | null, employee?: User | null) =>
  user?.company === extractId(employee?.company, '_id')

const employeesPermissions: RolePermissions[Modules.EMPLOYEES] = {
  canSeeMyTeam: false,
  canAddEmployee: false,
  canSeeEmployeesPage: true,
  canEditEmployee: employeeScopeCallback
}

const leadsPermissions: RolePermissions[Modules.LEADS] = {
  canSeeLeadsRequests: false,
  canViewLeadsPage: true,
  canCreateALead: true,
  canInteractWithLead: false
}

const officialBlogsPermissions: RolePermissions[Modules.OFFICIAL_BLOGS] = {
  canAddOfficialBlog: false,
  canEditOfficialBlog: false,
  canDeleteOfficialBlog: false
}
const analyticsPermissions: RolePermissions[Modules.ANALYTICS] = {
  canViewAnalyticsPage: true
}
const settingsPermissions: RolePermissions[Modules.SETTINGS] = {
  canViewSettingsPage: true
}
const usersPermissions: RolePermissions[Modules.USERS] = {
  canViewUsersPage: false
}
const creditsPermissions: RolePermissions[Modules.CREDITS] = {
  canAddCredits: true,
  canViewCreditsPage: true
}
export const agentRolePermissions: RolePermissions = {
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
