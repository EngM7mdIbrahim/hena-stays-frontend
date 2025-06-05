import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { GetTopPerformersResponse } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Badge, Box, Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiUserCircle } from 'react-icons/bi'

import MethodsCommunication from '@components/MethodsCommunication'
import { cn, formatNumberToShortForm, userRoleMap } from '@utils'

export function TeamCardSkeleton() {
  return (
    <Stack className='h-[300px] w-[255px] rounded-lg border shadow-md' p={8}>
      <Box className='flex h-full w-full items-center justify-center bg-neutral-200'>
        <BiUserCircle className='text-4xl text-neutral-500' />
      </Box>
    </Stack>
  )
}

export interface TeamCardProps {
  user: GetTopPerformersResponse['topAgents'][number] &
    GetTopPerformersResponse['topCompanies'][number]
}

function TeamCard({ user }: TeamCardProps) {
  const t = useTranslations()
  const router = useRouter()

  return (
    <Stack
      onClick={() =>
        router.push(navigationLinks.community.profile(user?.user?._id))
      }
      className='cursor-pointer rounded-lg border shadow-md'
      p={8}
    >
      <Box
        className={cn('relative h-[250px] w-full overflow-hidden rounded-lg')}
      >
        {user?.user?.image ? (
          <Image
            src={user.user.image}
            alt={user.user.name}
            width={300}
            height={300}
            className='h-full w-full object-cover'
            priority
          />
        ) : (
          <Box className='flex h-full w-full items-center justify-center bg-neutral-200'>
            <BiUserCircle className='text-4xl text-neutral-500' />
          </Box>
        )}

        <Badge
          variant='gradient'
          gradient={{ from: '#041A47', to: '#0A3FAD', deg: 180 }}
          className='absolute -left-1 bottom-2 rounded-md p-4 text-sm font-normal text-white opacity-80'
        >
          {formatNumberToShortForm(user?.totalImpressions)}{' '}
          {t('homePage.team.impressions')}
        </Badge>
      </Box>
      <Flex className='justify-between'>
        <Text className='line-clamp-1 text-lg font-semibold capitalize text-secondary dark:text-neutral-700'>
          {user?.user?.name}
        </Text>
        <Text className='text-neutral-500'>
          {userRoleMap(t, user?.user?.role)}
        </Text>
      </Flex>
      {user && <MethodsCommunication {...user.user} />}
    </Stack>
  )
}

export default TeamCard
