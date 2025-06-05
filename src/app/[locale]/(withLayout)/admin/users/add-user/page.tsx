import { UserRoleType } from '@commonTypes'
import { SEARCH_PARAM_KEYS } from '@constants'
import AddUserForm from '@sections/Users/AdminUsersForm/addUserForm'

export interface AddAdminUserPageProps {
  searchParams: { [key: string]: string }
}

export default function AddAdminUserPage({
  searchParams
}: AddAdminUserPageProps) {
  const userRole = searchParams[SEARCH_PARAM_KEYS.TYPE_KEY]

  if (!userRole) return null
  return <AddUserForm role={userRole as UserRoleType} />
}
