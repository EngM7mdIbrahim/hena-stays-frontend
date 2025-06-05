import { UserRole, UserRoleType } from '@commonTypes'
import {
  DEFAULT_AGENT_SIGNUP_FORM_DATA,
  DEFAULT_COMPANY_SIGNUP_FORM_DATA,
  DEFAULT_USER_SIGNUP_FORM_DATA
} from '@constants'
import {
  AGENT_SIGN_UP_FORM_SCHEMA_MERGED,
  COMPANY_SIGN_UP_FORM_SCHEMA,
  USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS
} from '@schemas/auth'
import SignUpAgent from '@sections/Auth/SignUp/Agent/SignUpAgent'
import SignUpCompany from '@sections/Auth/SignUp/Company/SignUpCompany'
import SignUpUser from '@sections/Auth/SignUp/SignUpUser'

import { transformData } from '@utils'

interface UserFormProps {
  loading: boolean
  role: UserRoleType
  defaultValues?:
    | typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA
    | typeof DEFAULT_AGENT_SIGNUP_FORM_DATA
    | typeof DEFAULT_USER_SIGNUP_FORM_DATA
    | null
  onImageUpload: (
    licenseCopies: File[],
    watermark?: File | null
  ) => Promise<{
    licenseCopies?: string[]
    watermark?: string
  }>
  onSubmit: (
    data: NonNullable<
      ReturnType<
        typeof transformData<
          | ReturnType<typeof COMPANY_SIGN_UP_FORM_SCHEMA>
          | ReturnType<typeof AGENT_SIGN_UP_FORM_SCHEMA_MERGED>
          | ReturnType<typeof USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS>
        >
      >
    >
  ) => Promise<void>
}

function UserForm({
  role,
  loading,
  defaultValues,
  onImageUpload,
  onSubmit
}: UserFormProps) {
  switch (role) {
    case UserRole.Company:
      return (
        <SignUpCompany
          defaultValues={
            defaultValues as typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA
          }
          onImageUpload={onImageUpload}
          onSubmit={onSubmit}
        />
      )
    case UserRole.Broker:
      return (
        <SignUpAgent
          defaultValues={defaultValues as typeof DEFAULT_AGENT_SIGNUP_FORM_DATA}
          onImageUpload={onImageUpload}
          onSubmit={onSubmit}
        />
      )
    case UserRole.User:
      return (
        <SignUpUser
          loading={loading}
          defaultValues={defaultValues as typeof DEFAULT_USER_SIGNUP_FORM_DATA}
          onSubmit={onSubmit}
        />
      )
    case UserRole.Support:
      return (
        <SignUpUser
          loading={loading}
          defaultValues={defaultValues as typeof DEFAULT_USER_SIGNUP_FORM_DATA}
          onSubmit={onSubmit}
        />
      )
    default:
      return null
  }
}

export default UserForm
