import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOfficialBlog } from '@apis'
import { generateMetadataBlogs, navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import OfficialBlogViewSection from '@sections/OfficialBlog/OfficialBlogViewSection'
import { Article, FAQPage } from 'schema-dts'

import HeadScript from '@components/HeadScript'
import { getPlainText, safeFetch } from '@utils'

export interface OfficialBlogViewPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params
}: OfficialBlogViewPageProps): Promise<Metadata> {
  const { slug } = params
  const { success, data } = await safeFetch(getOfficialBlog, [{ slug }])

  if (!success)
    return {
      title: 'Blog not found'
    }
  const { officialBlog } = data

  return generateMetadataBlogs({
    title: officialBlog?.seo?.title,
    description: officialBlog?.seo?.description,
    imageUrl: officialBlog?.media?.url || '',
    publishedTime: officialBlog?.createdAt
      ? new Date(officialBlog.createdAt).toISOString()
      : new Date().toISOString(),
    url: `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.officialBlogs.viewOfficialBlog(slug)}`,
    keywords: officialBlog?.seo?.keywords
  })
}

async function OfficialBlogPage({ params }: OfficialBlogViewPageProps) {
  const { slug } = params

  const { success, data } = await safeFetch(getOfficialBlog, [{ slug }])
  if (!success) {
    return notFound()
  }
  const { officialBlog } = data

  const jsonLd: Article & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': officialBlog?.seo?.title,
    'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.officialBlogs.viewOfficialBlog(slug)}`,
    'name': officialBlog?.seo?.title,
    'image': officialBlog?.media?.url,
    'description': officialBlog?.seo?.description,
    'keywords': officialBlog?.seo?.keywords?.join(', '),
    'datePublished': officialBlog?.createdAt
      ? new Date(officialBlog.createdAt).toISOString()
      : new Date().toISOString(),
    'publisher': {
      '@type': 'Organization',
      'name': 'TrueDar Team'
    },
    'author': {
      '@type': 'Person',
      'name': 'TrueDar Team'
      // 'url': `${process.env.NEXT_PUBLIC_HOST_URL}/community/profile/6673e30df17faf8573a1cc6e`,
    }
  }

  const faqList: FAQPage & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': officialBlog?.faq?.map((faq) => ({
      '@type': 'Question',
      'name': getPlainText(faq?.question),
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': getPlainText(faq?.answer)
      }
    }))
  }

  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <HeadScript id='json-ld' content={jsonLd} />
      <HeadScript id='faq-json-ld' content={faqList} />

      <OfficialBlogViewSection slug={slug} />
    </Stack>
  )
}

export default OfficialBlogPage
