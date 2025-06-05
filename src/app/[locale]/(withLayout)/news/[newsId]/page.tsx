import { notFound } from 'next/navigation'
import { getDefaultSupportUser, getNewsById } from '@apis'
import { generateMetadataNews, navigationLinks } from '@constants'
import NewsViewSection from '@sections/News/NewsViewSection'
import { Article } from 'schema-dts'

import HeadScript from '@components/HeadScript'
import { getPlainText, safeFetch } from '@utils'

interface NewsPageProps {
  params: {
    newsId: string
  }
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { newsId } = params
  const { success, data } = await safeFetch(getNewsById, [{ id: newsId }])
  if (!success) {
    return {
      title: 'Article not found'
    }
  }
  const { news } = data
  const { user: defaultSupportUser } = await getDefaultSupportUser()
  // Extract plain text from article.content (HTML)
  const plainTextContent = news?.content ? getPlainText(news?.content) : ''
  return generateMetadataNews({
    title: `${news?.title} | TrueDar`,
    description: plainTextContent,
    imageUrl: news?.image,
    publishedTime: news?.createdAt
      ? new Date(news.createdAt).toISOString()
      : undefined,
    url: `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.news.viewNews(news?._id)}`,
    author: news?.author,
    defaultSupportUser
  })
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { success, data } = await safeFetch(getNewsById, [
    { id: params.newsId }
  ])
  if (!success) {
    return notFound()
  }
  const { news } = data
  const { user: defaultSupportUser } = await getDefaultSupportUser()

  const keywords = ['news', 'latest', 'trending', 'update', 'article']
  const jsonLd: Article & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': news?.title,
    'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.news.viewNews(news?._id)}`,
    'name': news?.title,
    'image': news?.image,
    'description': getPlainText(news?.content || ''),
    'keywords': keywords.join(', '),
    'datePublished': news?.createdAt
      ? new Date(news.createdAt).toISOString()
      : new Date().toISOString(),
    'publisher': {
      '@type': 'Organization',
      'name': news?.author
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

  return (
    <>
      <HeadScript id='json-ld' content={jsonLd} />
      <NewsViewSection id={params.newsId} />
    </>
  )
}
