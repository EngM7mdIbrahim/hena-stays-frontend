import { Metadata } from 'next'

import { MetaDataBlogsProps } from './blogs'

export function generateMetadataPosts({
  title,
  description,
  imageUrl,
  publishedTime,
  modifiedTime,
  url,
  defaultSupportUser
}: MetaDataBlogsProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: [
        {
          url: imageUrl
        }
      ],
      authors: 'TrueDar Team',
      emails: defaultSupportUser?.email ? [defaultSupportUser.email] : [],
      phoneNumbers: defaultSupportUser?.phone ? [defaultSupportUser.phone] : [],
      publishedTime,
      modifiedTime,
      url
    },
    twitter: {
      title,
      description,
      images: [
        {
          url: imageUrl
        }
      ]
    },
    keywords: ['post', 'community', 'discussion', 'topic'],
    authors: {
      name: 'TrueDar Team',
      url: process.env.NEXT_PUBLIC_HOST_URL
    }
  }
}
