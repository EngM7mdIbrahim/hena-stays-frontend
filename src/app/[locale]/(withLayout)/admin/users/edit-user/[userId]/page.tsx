import { UserRoleType } from '@commonTypes'
import { SEARCH_PARAM_KEYS } from '@constants'
import EditUserForm from '@sections/Users/AdminUsersForm/EditUserForm'

export interface EditAdminUserPageProps {
  params: { userId: string }
  searchParams: { [key: string]: string }
}

export default function EditAdminUserPage({
  params,
  searchParams
}: EditAdminUserPageProps) {
  const userRole = searchParams[SEARCH_PARAM_KEYS.TYPE_KEY]

  if (!userRole) return null
  return <EditUserForm role={userRole as UserRoleType} userId={params.userId} />
}
