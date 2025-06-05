import React from 'react'
import { useSearchParams } from 'next/navigation'
import { SEARCH_PARAM_KEYS } from '@constants'
import { useGetLatestComments } from '@hooks'
import { ScrollArea, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import CommentCard, {
  LoadingCommentCard
} from '@components/Analytics/CommentCard'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'

function LatestComments() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const userId = searchParams.get(SEARCH_PARAM_KEYS.USER_KEY)
  const { data, isLoading, isError, error } = useGetLatestComments({
    filter: {
      ...(userId && { _id: userId })
    }
  })
  if (isError && error) {
    return <FullScreenError error={error} />
  }
  const commentsData = data?.comments || []
  return (
    <Stack className='rounded-lg border border-neutral-200 p-4'>
      <Text className='text-lg font-semibold text-neutral-700'>
        {t('userAnalytics.lastComments')}
      </Text>
      <ScrollArea offsetScrollbars className='h-[500px]'>
        <ItemsWrapper
          loading={isLoading}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('community.comments')
              })}
            />
          }
          LoadingComponent={<LoadingCommentCard />}
        >
          {commentsData.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </ItemsWrapper>
      </ScrollArea>
    </Stack>
  )
}

export default LatestComments
