'use client'

import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { POST_ACTIVE_PANEL_KEY } from '@constants'
import { PostActivePanel } from '@enums'
import { useGetPostById } from '@hooks'
import Post from '@sections/Community/Post/Post'

import FullScreenError from '@components/FullScreenError'

import { PostLoading } from './PostsSection'

export interface SinglePostViewSectionProps {
  id: string
}

function SinglePostViewSection({ id }: SinglePostViewSectionProps) {
  const searchParams = useSearchParams()
  const activePanel = useMemo(() => {
    const activePanelValue = searchParams.get(POST_ACTIVE_PANEL_KEY)
    return activePanelValue &&
      Object.values(PostActivePanel).includes(
        activePanelValue as PostActivePanel
      )
      ? (activePanelValue as PostActivePanel)
      : null
  }, [searchParams])
  const { data, isLoading, isError, error } = useGetPostById({
    id,
    showFields: {
      user: true
    }
  })

  const post = data?.post

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  if (isLoading) {
    return <PostLoading />
  }

  if (!post) {
    return <FullScreenError error={new Error('Post not found')} />
  }

  return <Post initialActivePanel={activePanel} post={post} />
}

export default SinglePostViewSection
