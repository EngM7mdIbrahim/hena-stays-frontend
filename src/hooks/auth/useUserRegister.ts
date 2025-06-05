// this hook is used to register a user(company, broker)
import { useRouter } from 'next/navigation'
import { RegisterRequest, UserRole } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { AGENT_SIGN_UP_FORM_SCHEMA_MERGED } from '@schemas/auth'
import { COMPANY_SIGN_UP_FORM_SCHEMA } from '@schemas/auth/signupCompany'

import { useSendOTP } from '@hooks/query'
import { useRegisterUser } from '@hooks/query/auth/useRegisterUser'
import { useLinkConstructor } from '@hooks/useLinkConstructor'
import { useUser } from '@hooks/useUser'
import { appNotifications, transformData } from '@utils'

import { useUploadImageAuth } from './useUploadImageAuth'

export function useUserRegister() {
  const { login, user } = useUser()
  const router = useRouter()
  const { onImageUpload } = useUploadImageAuth()
  const { constructLink } = useLinkConstructor()

  const sendOTP = useSendOTP({
    onSuccess: ({ msg }) => {
      appNotifications.success(msg)
      if (user?.email) {
        router.push(
          constructLink(navigationLinks.auth.verifyCode, {
            [SEARCH_PARAM_KEYS.EMAIL_KEY]: user?.email
          })
        )
      }
    }
  })

  const registerUser = useRegisterUser({
    onSuccess: ({ user: registeredUser }) => {
      sendOTP.mutate({
        email: registeredUser.email
      })
      login('', registeredUser)
    }
  })

  const onSubmit = async (
    data: NonNullable<
      ReturnType<
        typeof transformData<
          | ReturnType<typeof COMPANY_SIGN_UP_FORM_SCHEMA>
          | ReturnType<typeof AGENT_SIGN_UP_FORM_SCHEMA_MERGED>
        >
      >
    >,
    role: typeof UserRole.Broker | typeof UserRole.Company
  ) => {
    registerUser.mutate({
      ...data,
      role
    } as RegisterRequest)
  }

  return {
    onImageUpload,
    onSubmit
  }
}
