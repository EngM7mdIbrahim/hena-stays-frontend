import { GetAllUsersResponse, User } from '@commonTypes'
import { Box, Stack } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppPagination from '@components/AppPagination'
import EmployeeAgentCard, {
  EmployeeAgentCardSkeleton
} from '@components/EmployeeAgentCard'
import EmptyWrapper from '@components/EmptyWrapper'
import ItemsWrapper from '@components/ItemWrapper'

export interface AgentsSectionProps {
  users: User[]
  isLoading: boolean
  data: GetAllUsersResponse | undefined
  page: string
  setPage: (page: string) => void
}

function AgentsSection({
  users,
  isLoading,
  data,
  page,
  setPage
}: AgentsSectionProps) {
  const t = useTranslations()
  return (
    <Stack className='gap-8'>
      <ItemsWrapper
        loading={isLoading}
        className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        LoadingComponent={<EmployeeAgentCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('employees.title')
            })}
          />
        }
      >
        {users?.map((user) => <EmployeeAgentCard key={user._id} user={user} />)}
      </ItemsWrapper>
      <Box className='flex items-center justify-center'>
        <AppPagination
          activeBgColor='linear-gradient(180deg, #F6A649 0%, #90612B 100%)'
          value={data?.page || +page}
          onChange={(value) => setPage(String(value))}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Stack>
  )
}

export default AgentsSection
