import { useRouter } from 'next/navigation'
import { UserRole } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS } from '@schemas/auth'

import { useRegisterUser, useSendOTP } from '@hooks/query'
import { useLinkConstructor } from '@hooks/useLinkConstructor'
import { useUser } from '@hooks/useUser'
import { appNotifications, transformData } from '@utils'

export function useNormalUserRegister() {
  const { login, user } = useUser()
  const router = useRouter()

  const { constructLink } = useLinkConstructor()

  const sendOTP = useSendOTP({
    onSuccess: ({ msg }) => {
      appNotifications.success(msg)
      router.push(
        constructLink(navigationLinks.auth.verifyCode, {
          [SEARCH_PARAM_KEYS.EMAIL_KEY]: user?.email
        })
      )
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
          ReturnType<typeof USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS>
        >
      >
    >
  ) => {
    registerUser.mutate({
      ...data,
      // it will be there anyway because this is used in the signup user form in the auth pages not from the admin
      password: 'password' in data ? data.password || '' : '',
      role: UserRole.User
    })
  }

  return {
    onSubmit,
    loading: registerUser.isPending
  }
}
