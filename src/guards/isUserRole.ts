import { UserRole, UserRoleType } from '@commonTypes'

export function isUserRole(role: string): role is UserRoleType {
  return Object.values(UserRole).includes(role as UserRoleType)
}
