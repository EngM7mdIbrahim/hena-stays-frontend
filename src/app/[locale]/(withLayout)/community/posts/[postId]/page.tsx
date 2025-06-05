import React from 'react'
import { notFound } from 'next/navigation'
import { getDefaultSupportUser, getPostById } from '@apis'
import { generateMetadataPosts, navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import SinglePostViewSection from '@sections/Community/SinglePostView'
import { Article } from 'schema-dts'

import Breadcrumb from '@components/Breadcrumb'
import HeadScript from '@components/HeadScript'
import { safeFetch } from '@utils'

export interface PostPageProps {
  params: {
    postId: string
  }
}

export async function generateMetadata({ params }: PostPageProps) {
  const { success, data } = await safeFetch(getPostById, [
    {
      id: params.postId,
      showFields: {
        user: true
      }
    }
  ])

  if (!success) {
    return {
      title: 'Post not found'
    }
  }
  const { post } = data
  const { user: defaultSupportUser } = await getDefaultSupportUser()

  return {
    ...generateMetadataPosts({
      title: post?.description?.slice(0, 50),
      description: post?.description,
      imageUrl: post?.media?.[0]?.url,
      publishedTime: post?.createdAt
        ? new Date(post.createdAt).toISOString()
        : '',

      url: `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.community.viewPost(
        post?._id
      )}`,
      defaultSupportUser
    })
  }
}

async function PostPage({ params: { postId } }: PostPageProps) {
  const { data, success } = await safeFetch(getPostById, [
    {
      id: postId,
      showFields: {
        user: true
      }
    }
  ])

  if (!success) {
    return notFound()
  }
  const { post } = data

  const { user: defaultSupportUser } = await getDefaultSupportUser()

  const jsonLd: Article & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post?.description?.slice(0, 50),
    'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.community.viewPost(
      post?._id
    )}`,
    'name': post?.description?.slice(0, 50),
    'image': post?.media?.[0]?.url || '',
    'description': post?.description,
    'keywords': ['TrueDar', 'Community', 'Blog', 'Post', 'TrueDar Team'],
    'datePublished': post?.createdAt
      ? new Date(post.createdAt).toISOString()
      : '',
    'publisher': {
      '@type': 'Organization',
      'name': 'TrueDar Team'
    },
    'author': {
      '@type': 'Person',
      'name': 'TrueDar Team',
      ...(defaultSupportUser && {
        url: `${process.env.NEXT_PUBLIC_HOST_URL}/community/profile/${defaultSupportUser._id}`,
        email: defaultSupportUser.email,
        phone: defaultSupportUser.phone,
        photo: defaultSupportUser.image
      })
    }
  }
  const breadCrumbList = [
    {
      label: 'Home',
      link: navigationLinks.landingPage
    },

    {
      label: 'Posts',
      link: navigationLinks.community.allPosts
    },
    {
      label:
        post?.description?.length > 50
          ? `${post.description.slice(0, 50)}...`
          : post.description || 'Post View',
      link: navigationLinks.community.viewPost(postId)
    }
  ]
  return (
    <Stack className='gap-6 px-4 py-10 md:px-8 lg:px-12'>
      <HeadScript id='json-ld' content={jsonLd} />
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <SinglePostViewSection id={postId} />
    </Stack>
  )
}

export default PostPage
