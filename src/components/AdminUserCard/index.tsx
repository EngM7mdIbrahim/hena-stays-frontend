'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GetAllUsersResponse, UserRole, UserStatus } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import {
  useDeleteUserAsAdmin,
  useLinkConstructor,
  useLoginAs,
  useUser
} from '@hooks'
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  Tooltip
} from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { GoPasskeyFill } from 'react-icons/go'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import { Details } from '@components/Analytics/PropertyAdCard'
import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications, cn } from '@utils'

export interface AdminUserCardProps {
  user: GetAllUsersResponse['items'][number]
}

function AdminUserCard({ user }: AdminUserCardProps) {
  const locale = useLocale()
  const t = useTranslations()
  const { login } = useUser()
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { constructLink } = useLinkConstructor()

  const loginAs = useLoginAs({
    onSuccess: ({ token, user: newUser }) => {
      login(token, newUser)
      appNotifications.success(`Logged in as ${newUser.name} successfully`)
      window.location.href = navigationLinks.landingPage
    }
  })

  const deleteUser = useDeleteUserAsAdmin({
    onSuccess: () => {
      appNotifications.success('User deleted successfully')
      setShowDeleteModal(false)
    }
  })

  const handleDeleteUser = () => {
    deleteUser.mutate({
      id: user._id
    })
  }
  const menuItems = [
    {
      label: `${t('adminUsers.loginAs')} ${user?.name}`,
      icon: loginAs.isPending ? <Loader size='xs' /> : <GoPasskeyFill />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        loginAs.mutate({
          userId: user._id
        })
      }
    },
    {
      label: t('shared.actions.edit'),
      icon: <PiPencilCircleLight />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        router.push(
          constructLink(navigationLinks.admin.users.editUser(user?._id), {
            [SEARCH_PARAM_KEYS.TYPE_KEY]: user?.role
          })
        )
      }
    },
    {
      label: t('shared.actions.delete'),
      icon: <BiTrash />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setShowDeleteModal(true)
      }
    }
  ]
  return (
    <Card
      onClick={() => {
        if (user?.role === UserRole.User) return
        router.push(navigationLinks.admin.users.viewUser(user?._id))
      }}
      className={cn(
        'border border-neutral-200',
        user?.role !== UserRole.User ? 'cursor-pointer' : 'cursor-default'
      )}
      shadow='sm'
      padding='lg'
      radius='md'
    >
      <DeleteModal
        loading={deleteUser.isPending}
        onDelete={handleDeleteUser}
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        itemName={user?.name}
      />
      <Stack className='flex-grow'>
        {/* Profile section */}
        <Flex className='justify-between'>
          <Flex className='items-center gap-3'>
            <Avatar src={user?.image} name={user?.name} size={50} radius='xl' />
            <Stack className='ms-1 gap-0'>
              <Tooltip className='capitalize' label={user?.name}>
                <Text className='text-sm font-semibold capitalize'>
                  {user?.name}
                </Text>
              </Tooltip>
              <Badge
                color={user?.status === UserStatus.Active ? 'green' : 'yellow'}
                className='border-0 bg-transparent p-px'
                variant='dot'
                size='sm'
              >
                <Text
                  className={cn('text-xs font-semibold capitalize', {
                    'text-success-500': user?.status === UserStatus.Active,
                    'text-warning-500': user?.status !== UserStatus.Active
                  })}
                >
                  {user?.status}
                </Text>
              </Badge>
            </Stack>
          </Flex>

          <Actions
            width={300}
            items={menuItems}
            targetTrigger={
              <ActionIcon
                bg='transparent'
                onClick={(e) => e.stopPropagation()}
                className='flex h-10 w-10 cursor-pointer items-center justify-center'
              >
                <BsThreeDots className='text-neutral-600' />
              </ActionIcon>
            }
          />
        </Flex>
        {/* Details */}
        {user?.role !== UserRole.User && (
          <Group>
            <Details
              title={t('adminUsers.agents')}
              value={Number(user?.agents || 0)}
            />
            <Details
              title={t('adminUsers.listings')}
              value={Number(user?.totalProperties || 0)}
            />
            <Details
              title={t('adminUsers.followers')}
              value={Number(user?.totalFollowers || 0)}
            />
            <Details
              title={t('adminUsers.followings')}
              value={Number(user?.totalFollowing || 0)}
            />
            <Details
              title={t('adminUsers.crm')}
              value={Number(user?.conversionRate || 0)}
            />

            <Details
              title={t('adminUsers.join')}
              value={moment(user?.createdAt)
                .locale(locale)
                .format(locale.startsWith('ar') ? 'DD/MM/YYYY' : 'MM/DD/YYYY')}
            />
          </Group>
        )}
      </Stack>

      {/* Button */}
      {/* {user?.role !== UserRole.User && (
        <Button
          component={Link}
          href={constructLink(navigationLinks.employees.employeesAnalytics, {
            [SEARCH_PARAM_KEYS.USER_KEY]: user?._id
          })}
          fullWidth
          mt='md'
          variant='outline'
          radius='md'
          className='border-primary text-primary'
        >
          See Analytics
        </Button>
      )} */}
    </Card>
  )
}

export default AdminUserCard
