'use client'

import React from 'react'
import {
  Property,
  RequestBuyProperty,
  RequestSellProperty,
  User,
  UserRoleType
} from '@commonTypes'
import { isPopulated } from '@guards'
import { Avatar, Box, Flex, Group, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import CustomRating from '@components/AppRating'
import MethodsCommunication from '@components/MethodsCommunication'
import { cn, userRoleMap } from '@utils'

export interface AgentCardProps {
  name: string | undefined
  agentRole: string
  avatar?: string
  className?: string
  showRating?: boolean
  RatingValue?: number
  numberOfVotes?: number
  respondTime?: string
  property?: Property | RequestBuyProperty | RequestSellProperty
  onClick?: () => void
  makeLead?: boolean
}

function AgentCard({
  name,
  agentRole,
  avatar,
  className,
  showRating,
  RatingValue,
  numberOfVotes,
  property,
  makeLead = false,
  onClick,
  respondTime
}: AgentCardProps) {
  const t = useTranslations()
  return (
    <Box onClick={onClick} className={cn('flex flex-col gap-4', className)}>
      <Flex justify='space-between'>
        <Group>
          <Avatar
            name={name === 'Welcome Back' ? '' : name}
            src={avatar}
            radius='xl'
          />
          <Box className='capitalize'>
            <Text fz='sm' fw={500}>
              {name}
            </Text>
            <Text fz='xs' c='dimmed'>
              {userRoleMap(t, agentRole as UserRoleType)}
            </Text>
          </Box>
        </Group>
        <Text fz='lg' fw={500}>
          〉
        </Text>
      </Flex>
      {showRating ? (
        <>
          <Flex className='items-center gap-2'>
            <CustomRating readOnly value={RatingValue || 2} />
            <Text fz='sm' c='dimmed'>
              ({numberOfVotes}) votes
            </Text>
          </Flex>
          <Text fz='sm'>
            Always responds in{' '}
            <Text component='span' className='text-sm font-bold'>
              {' '}
              {respondTime}
            </Text>
          </Text>
        </>
      ) : null}
      {isPopulated<User>(property?.createdBy) && (
        <MethodsCommunication
          makeLead={makeLead}
          property={property}
          {...property?.createdBy}
        />
      )}
    </Box>
  )
}

export default AgentCard
