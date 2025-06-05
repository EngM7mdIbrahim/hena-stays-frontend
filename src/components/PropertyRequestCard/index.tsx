'use client'

import React from 'react'
import { RequestBuyProperty, User } from '@commonTypes'
import { isPopulated } from '@guards'
import { Box, Card, Skeleton, Stack, Text } from '@mantine/core'

import MethodsCommunication from '@components/MethodsCommunication'

import PropertyRequestCardDetails from './PropertyRequestCardDetails'
import PropertyRequestCardFeatures from './PropertyRequestCardFeatures'
import PropertyRequestCardHeader from './PropertyRequestCardHeader'

export function PropertyRequestCardSkeleton() {
  return (
    <Card withBorder shadow='sm' padding='lg' radius='md'>
      <Stack gap='md'>
        <Skeleton height={30} mt='md' radius='md' width='100%' />
        <Box mt={6} className='flex items-center justify-between gap-2'>
          <Skeleton height={40} radius='md' width='20%' />
          <Skeleton height={40} radius='md' width='20%' />
          <Skeleton height={40} radius='md' width='20%' />
        </Box>
        <Skeleton height={30} mt='md' radius='md' width='100%' />
        <Skeleton height={30} mt={6} radius='md' width='100%' />
        <Skeleton height={30} mt={6} radius='md' width='100%' />
        <Box mt={6} className='flex items-center justify-between gap-2'>
          <Skeleton height={50} radius='md' width='25%' />
          <Skeleton height={50} radius='md' width='25%' />
          <Skeleton height={50} radius='md' width='25%' />
          <Skeleton height={50} radius='md' width='25%' />
        </Box>
      </Stack>
    </Card>
  )
}
export interface PropertyRequestCardProps extends RequestBuyProperty {}

function PropertyRequestCard(request: PropertyRequestCardProps) {
  const { createdBy, contactWays } = request
  return (
    <Card
      className='relative flex h-full flex-col'
      shadow='sm'
      padding='lg'
      radius='lg'
      withBorder
    >
      <Stack className='flex-grow' gap='md'>
        <PropertyRequestCardHeader request={request} />
        <PropertyRequestCardFeatures {...request} />
        <PropertyRequestCardDetails {...request} />
      </Stack>
      {isPopulated<User>(createdBy) && (
        <Stack className='mt-5'>
          {' '}
          {/* Pushes this to the bottom */}
          <Text className='capitalize' size='xl' fw={500}>
            {createdBy.name}
          </Text>
          <MethodsCommunication {...createdBy} contactWays={contactWays} />
        </Stack>
      )}
    </Card>
  )
}

export default PropertyRequestCard
