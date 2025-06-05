import { UserRole, UserRoleType } from '@commonTypes'

import { RolePermissions } from '@interfaces'

import { adminViewerRolePermissions } from './admin-viewer.role'
import { adminRolePermissions } from './admin.role'
import { agentRolePermissions } from './agent.role'
import { companyAdminRolePermissions } from './company-admin.role'
import { companyAgentRolePermissions } from './company-agent.role'
import { companyRolePermissions } from './company.role'
import { guestRolePermissions } from './guest.role'
import { supportRolePermissions } from './support.role'
import { userRolePermissions } from './user.role'

export const GUEST_USER_TYPE = 'GUEST' as const
export const rolePermissions: Record<
  UserRoleType | typeof GUEST_USER_TYPE,
  RolePermissions
> = {
  [UserRole.User]: userRolePermissions,
  [UserRole.Company]: companyRolePermissions,
  [UserRole.Agent]: companyAgentRolePermissions,
  [UserRole.Admin]: adminRolePermissions,
  [UserRole.CompanyAdmin]: companyAdminRolePermissions,
  [UserRole.Broker]: agentRolePermissions,
  [GUEST_USER_TYPE]: guestRolePermissions,
  [UserRole.AdminViewer]: adminViewerRolePermissions,
  [UserRole.Support]: supportRolePermissions
}
