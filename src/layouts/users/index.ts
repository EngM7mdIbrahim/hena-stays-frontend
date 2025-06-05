import { UserRole } from '@commonTypes'
import { GUEST_USER_TYPE } from '@permissions'

import { AdminLayout } from './AdminLayout'
import { AdminViewerLayout } from './AdminViewerLayout'
import { BrokerLayout } from './BrokerLayout'
import { CompanyAdminLayout } from './CompanyAdminLayout'
import { CompanyAgentLayout } from './CompanyAgentLayout'
import { CompanyLayout } from './CompanyLayout'
import { GuestLayout } from './GuestLayout'
import { SupportLayout } from './SupportLayout'
import { UserLayout } from './UserLayout'

export const UsersLayouts = {
  [GUEST_USER_TYPE]: GuestLayout,
  [UserRole.User]: UserLayout,
  [UserRole.Company]: CompanyLayout,
  [UserRole.CompanyAdmin]: CompanyAdminLayout,
  [UserRole.Agent]: CompanyAgentLayout,
  [UserRole.Broker]: BrokerLayout,
  [UserRole.Support]: SupportLayout,
  [UserRole.Admin]: AdminLayout,
  [UserRole.AdminViewer]: AdminViewerLayout
}
