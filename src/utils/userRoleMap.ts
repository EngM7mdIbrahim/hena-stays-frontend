import { UserRole } from '@commonTypes'

import { TranslationFn } from '@interfaces'

export const userRoleMap = (
  t: TranslationFn,
  role: (typeof UserRole)[keyof typeof UserRole]
): string => {
  const roleMap = {
    [UserRole.Admin]: t('shared.userRoles.admin'),
    [UserRole.CompanyAdmin]: t('shared.userRoles.companyAdmin'),
    [UserRole.Agent]: t('shared.userRoles.agent'),
    [UserRole.User]: t('shared.userRoles.user'),
    [UserRole.Broker]: t('shared.userRoles.broker'),
    [UserRole.Company]: t('shared.userRoles.company'),
    [UserRole.AdminViewer]: t('shared.userRoles.adminViewer'),
    [UserRole.Support]: t('shared.userRoles.support')
  } as const
  return roleMap[role]
}
