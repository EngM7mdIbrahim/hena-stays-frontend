import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlog, getDefaultSupportUser } from '@apis'
import { MediaTypes, User } from '@commonTypes'
import { generateMetadataBlogs, navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import BlogViewSection from '@sections/Community/BlogViewSection'
import { Article } from 'schema-dts'

import HeadScript from '@components/HeadScript'
import { safeFetch } from '@utils'

export interface BlogViewPageProps {
  params: {
    blogId: string
    profileId: string
  }
}

const keywords = [
  'real estate',
  'property',
  'housing',
  'home buying',
  'home selling',
  'real estate investment',
  'property market',
  'real estate tips',
  'property management',
  'real estate trends'
]
export async function generateMetadata({
  params
}: BlogViewPageProps): Promise<Metadata> {
  const { blogId, profileId } = params
  const { user: defaultSupportUser } = await getDefaultSupportUser()

  const { success, data } = await safeFetch(getBlog, [
    {
      id: blogId,
      showFields: {
        user: true
      }
    }
  ])

  if (!success)
    return {
      title: 'Blog not found'
    }

  const { blog } = data

  if (!isPopulated<User>(blog?.user)) return {}

  return {
    ...generateMetadataBlogs({
      imageUrl: blog?.media
        ?.filter((item) => item.type === MediaTypes.Image)
        .map((item) => item.url)[0],
      title: `${blog?.title} | TrueDar`,
      creator: blog?.user?.name,
      description: blog?.description,
      images: blog?.media
        ?.filter((item) => item.type === MediaTypes.Image)
        .map((item) => item.url),
      publishedTime: new Date(blog?.createdAt).toISOString(),

      url: `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.community.profileBlogView(
        profileId,
        blogId
      )}`,
      authors: [blog?.user?.name],
      keywords,
      defaultSupportUser
    })
  }
}

async function ProfileBlogPage({ params }: BlogViewPageProps) {
  const { blogId, profileId } = params

  const { data, success } = await safeFetch(getBlog, [
    {
      id: blogId,
      showFields: {
        user: true
      }
    }
  ])

  if (!success) {
    return notFound()
  }

  const { blog } = data

  if (!isPopulated<User>(blog?.user)) return {}

  const jsonLd: Article & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': blog?.title,
    'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.community.profileBlogView(
      profileId,
      blogId
    )}`,
    'name': blog?.title,
    'image': blog?.media?.[0]?.url,
    'description': blog?.description,
    'keywords': keywords.join(', '),
    'datePublished': blog?.createdAt
      ? new Date(blog.createdAt).toISOString()
      : new Date().toISOString(),
    'publisher': {
      '@type': 'Organization',
      'name': blog?.user?.name
    },
    'author': {
      '@type': 'Person',
      'name': blog?.user?.name,
      'email': blog?.user?.email
    }
  }

  return (
    <>
      <HeadScript id='json-ld' content={jsonLd} />
      <BlogViewSection params={params} />
    </>
  )
}

export default ProfileBlogPage
