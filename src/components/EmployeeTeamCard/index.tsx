import { useState } from 'react'
import Link from 'next/link'
import { User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useDeleteUserAsCompany } from '@hooks'
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'

import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications, userRoleMap } from '@utils'

export function EmployeeTeamCardSkeleton() {
  return (
    <Card
      className='relative w-full border-neutral-200 duration-200 hover:border-primary'
      radius='md'
      padding='lg'
    >
      <Stack className='h-full items-center justify-center text-center'>
        <Skeleton circle height={100} width={100} />

        <Box className='w-full space-y-2'>
          <Skeleton height={24} width='60%' className='mx-auto' />
          <Skeleton height={16} width='40%' className='mx-auto' />
        </Box>

        <Skeleton height={36} width={100} className='mx-auto' />
      </Stack>
    </Card>
  )
}

export interface EmployeeTeamCardProps {
  user: User
}

function EmployeeTeamCard({ user }: EmployeeTeamCardProps) {
  const t = useTranslations()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteEmployee = useDeleteUserAsCompany({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('shared.breadcrumb.employee')
        })
      )
      setShowDeleteModal(false)
    }
  })

  const handleDeleteEmployee = () => {
    deleteEmployee.mutate({
      id: user._id
    })
  }

  return (
    <Card
      className='relative w-full border border-neutral-200 text-default-text duration-200 hover:border-primary'
      radius='md'
      padding='lg'
    >
      <DeleteModal
        loading={deleteEmployee.isPending}
        onDelete={handleDeleteEmployee}
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        itemName={user?.username}
      />

      <Box className='absolute right-2 top-2'>
        <ActionIcon
          variant='subtle'
          color='red'
          aria-label='Delete'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowDeleteModal(true)
          }}
        >
          <BiTrash size={18} />
        </ActionIcon>
      </Box>
      <Stack className='h-full items-center justify-center text-center'>
        <Avatar
          src={user?.image}
          alt={user?.name}
          name={user?.name}
          size={100}
          radius='50%'
          className='object-cover'
        />

        <Box>
          <Text className='text-lg font-semibold capitalize'>
            {user?.username}
          </Text>
          <Text className='text-sm text-neutral-400'>
            {userRoleMap(t, user?.role)}
          </Text>
        </Box>
        <Button
          component={Link}
          href={navigationLinks.employees.editEmployee(user?._id)}
          variant='outline'
          className='flex items-center gap-2 border-0 px-4 py-2 text-primary'
          leftSection={<FaRegEdit size={16} />}
        >
          {t('shared.actions.edit')}
        </Button>
      </Stack>
    </Card>
  )
}

export default EmployeeTeamCard
