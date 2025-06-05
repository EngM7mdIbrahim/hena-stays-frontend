'use client'

import React from 'react'
import { User } from '@commonTypes'
import { Modules } from '@enums'
import { useGetUserPermissions } from '@hooks'
import { Skeleton, Stack } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

import MemberSuggestionCard from './MemberSuggestionCard'

export interface MemberSuggestionsProps {
  featuredMembers: User[]
  peopleYouMayKnow: User[]
  className?: string
  loading?: boolean
}

function Loading() {
  return (
    <Stack className='hidden w-[30%] gap-8 lg:flex'>
      <Skeleton width='100%' height={500} />
      <Skeleton width='100%' height={500} />
    </Stack>
  )
}

function MemberSuggestions({
  featuredMembers,
  peopleYouMayKnow,
  className,
  loading
}: MemberSuggestionsProps) {
  const t = useTranslations()
  const { permissions } = useGetUserPermissions(Modules.COMMUNITY)
  const { canSeeMemberSuggestions } = permissions

  if (loading) {
    return <Loading />
  }
  return canSeeMemberSuggestions ? (
    <Stack className={cn('hidden w-[30%] gap-8 lg:flex', className)}>
      <MemberSuggestionCard
        title={t('community.featuredMembers')}
        items={featuredMembers}
      />
      <MemberSuggestionCard
        title={t('community.peopleYouMayKnow')}
        items={peopleYouMayKnow}
      />
    </Stack>
  ) : null
}

export default MemberSuggestions
