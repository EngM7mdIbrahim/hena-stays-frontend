import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserStatus } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { useDeleteUserAsCompany, useLinkConstructor } from '@hooks'
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
  Tooltip
} from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import { EmployeeTeamCardProps } from '@components/EmployeeTeamCard'
import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications, cn } from '@utils'

export function EmployeeAgentCardSkeleton() {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Flex className='items-center gap-3'>
        <Skeleton height={50} circle />
        <Box>
          <Skeleton height={20} width={100} radius='sm' mb={4} />
          <Skeleton height={16} width={80} radius='sm' />
        </Box>
      </Flex>

      <Group mt='md'>
        <Box>
          <Skeleton height={14} width={50} radius='sm' mb={4} />
          <Skeleton height={18} width={30} radius='sm' />
        </Box>
        <Box>
          <Skeleton height={14} width={70} radius='sm' mb={4} />
          <Skeleton height={18} width={30} radius='sm' />
        </Box>
      </Group>

      <Skeleton height={36} radius='md' mt='md' />
    </Card>
  )
}

function EmployeeAgentCard({ user }: EmployeeTeamCardProps) {
  const t = useTranslations()
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteEmployee = useDeleteUserAsCompany({
    onSuccess: () => {
      appNotifications.success('Employee deleted successfully')
      setShowDeleteModal(false)
    }
  })

  const handleDeleteEmployee = () => {
    deleteEmployee.mutate({
      id: user._id
    })
  }
  const menuItems = [
    {
      label: t('shared.actions.edit'),
      icon: <PiPencilCircleLight />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        router.push(navigationLinks.employees.editEmployee(user?._id))
      }
    },
    {
      label: t('shared.actions.delete'),
      icon: <BiTrash />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowDeleteModal(true)
      }
    }
  ]
  return (
    <Card
      className='border border-neutral-200'
      shadow='sm'
      padding='lg'
      radius='md'
    >
      <DeleteModal
        loading={deleteEmployee.isPending}
        onDelete={handleDeleteEmployee}
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        itemName={user?.username}
      />
      <Stack className='flex-grow'>
        {/* Profile section */}
        <Flex className='justify-between'>
          <Flex className='items-center gap-3'>
            <Avatar src={user?.image} name={user?.name} size={50} radius='xl' />
            <Box>
              <Tooltip className='capitalize' label={user?.username}>
                <Text className='line-clamp-1 capitalize'>
                  {user?.username}
                </Text>
              </Tooltip>
              <Badge
                color={user?.status === UserStatus.Active ? 'green' : 'yellow'}
                className='border-0 bg-transparent p-0'
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
            </Box>
          </Flex>
          {/* Options Menu Placeholder */}
          <Actions
            withinPortal={false}
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
      </Stack>

      {/* Button */}
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
        {t('employees.buttons.seeAnalytics')}
      </Button>
    </Card>
  )
}

export default EmployeeAgentCard
