'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ChatTypes,
  LeadsContactsTypesEnum,
  Property,
  RequestBuyProperty,
  RequestSellProperty,
  User,
  UserRole
} from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { Modules } from '@enums'
import {
  useCreateChat,
  useCreateLead,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import { Flex, Loader, UnstyledButton } from '@mantine/core'
import { useLocale } from 'next-intl'

import { appNotifications, cn } from '@utils'

export type MethodsCommunicationProps = {
  wrap?: boolean
  makeLead?: boolean
  property?: Property | RequestBuyProperty | RequestSellProperty
} & User &
  Partial<Pick<RequestBuyProperty, 'contactWays'>>

export enum MethodsCommunicationEnum {
  Chat = 'truedar',
  Email = 'email',
  Whatsapp = 'whatsapp',
  Call = 'phone'
}
function MethodsCommunication({
  _id,
  email,
  phone,
  wrap = false,
  // makeLead is related to the component because methods of communication used in the buy property request also and the leads are on the properties only
  makeLead = false,
  property,
  role,
  contactWays = {
    email: true,
    whatsapp: true,
    phone: true,
    truedar: true
  }
}: MethodsCommunicationProps) {
  const locale = useLocale()
  const { constructLink } = useLinkConstructor()

  const router = useRouter()
  const [loadingContactType, setLoadingContactType] =
    useState<MethodsCommunicationEnum | null>(null) // Track which contact type is loading

  const { permissions } = useGetUserPermissions(Modules.LEADS)
  const { canCreateALead } = permissions

  const createChat = useCreateChat({
    onSuccess: ({ chat }) => {
      // push to chats with chatId
      router.push(
        constructLink(navigationLinks.chats, {
          [SEARCH_PARAM_KEYS.CHAT_KEY]: chat?._id
        })
      )
    }
  })

  const createLead = useCreateLead({
    onSuccess: () => {
      setLoadingContactType(null)
    }
  })

  const baseUrl = window.location.href
    ? (window.location.href.split(/(?<=[a-z0-9])\/(?=[a-z0-9])/).at(0) ?? '')
    : ''

  const currentUrl = `${baseUrl}${navigationLinks.properties.viewProperty(property?._id ?? '')}`

  const handleRouteClick = (
    method: MethodsCommunicationEnum,
    e: React.MouseEvent
  ) => {
    e.stopPropagation()

    let route: string | undefined = ''

    if (makeLead) {
      setLoadingContactType(method)
      createLead.mutate({
        property: property?._id || '',
        contactType: LeadsContactsTypesEnum[method]
      })
    }

    if (method === MethodsCommunicationEnum.Chat) {
      createChat.mutate({
        type: ChatTypes.NORMAL,
        user: _id
      })
    }
    if (method === MethodsCommunicationEnum.Email) {
      route = navigationLinks.methodsCommunication.email(
        email,
        canCreateALead ? makeLead : false,
        property as Property,
        currentUrl,
        locale
      )
    }
    if (method === MethodsCommunicationEnum.Whatsapp) {
      route = navigationLinks.methodsCommunication.whatsapp(
        phone,
        canCreateALead ? makeLead : false,
        property as Property,
        canCreateALead
      )
    }
    if (method === MethodsCommunicationEnum.Call) {
      route = navigationLinks.methodsCommunication.call(phone)
    }
    if (route) {
      window.open(route, '_blank')
    } else if (!route && method !== MethodsCommunicationEnum.Chat) {
      appNotifications.error(
        'Unable to get the communication methods for this user, please contact support.'
      )
    }
  }

  if (role === UserRole.Support) {
    return null
  }

  return (
    <Flex className={cn('mt-2 gap-2', wrap && 'flex-col md:flex-row')}>
      {contactWays.truedar && (
        <UnstyledButton
          onClick={(e) => handleRouteClick(MethodsCommunicationEnum.Chat, e)}
          className='relative z-50 flex flex-1 items-center justify-center rounded-lg bg-neutral-50 p-3'
        >
          {createChat.isPending ||
          loadingContactType === MethodsCommunicationEnum.Chat ? (
            <Loader />
          ) : (
            <Image alt='chat' src='/svgs/chat.svg' width={25} height={25} />
          )}
        </UnstyledButton>
      )}
      {contactWays.email && (
        <UnstyledButton
          onClick={(e) => handleRouteClick(MethodsCommunicationEnum.Email, e)}
          className='flex flex-1 items-center justify-center rounded-lg bg-neutral-50 p-3'
        >
          {loadingContactType === MethodsCommunicationEnum.Email ? (
            <Loader />
          ) : (
            <Image alt='email' src='/svgs/email.svg' width={25} height={25} />
          )}
        </UnstyledButton>
      )}
      {contactWays.whatsapp && (
        <UnstyledButton
          onClick={(e) =>
            handleRouteClick(MethodsCommunicationEnum.Whatsapp, e)
          }
          className='flex flex-1 items-center justify-center rounded-lg bg-neutral-50 p-3'
        >
          {loadingContactType === MethodsCommunicationEnum.Whatsapp ? (
            <Loader />
          ) : (
            <Image
              alt='whatsapp'
              src='/svgs/whatsapp.svg'
              width={25}
              height={25}
            />
          )}
        </UnstyledButton>
      )}
      {contactWays.phone && (
        <UnstyledButton
          onClick={(e) => handleRouteClick(MethodsCommunicationEnum.Call, e)}
          className='flex flex-1 items-center justify-center rounded-lg bg-neutral-50 p-3'
        >
          {loadingContactType === MethodsCommunicationEnum.Call ? (
            <Loader />
          ) : (
            <Image alt='call' src='/svgs/call.svg' width={30} height={30} />
          )}
        </UnstyledButton>
      )}
    </Flex>
  )
}

export default MethodsCommunication
