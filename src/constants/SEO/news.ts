import { Metadata } from 'next'
import { User } from '@commonTypes'

import { MetaDataBlogsProps } from './blogs'

export interface MetadataNewsProps extends MetaDataBlogsProps {
  author: string
  defaultSupportUser?: User
}

export function generateMetadataNews({
  title,
  description,
  imageUrl,
  publishedTime,
  modifiedTime,
  authors,
  author,
  url,
  defaultSupportUser
}: MetadataNewsProps): Metadata {
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
      authors,
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
    keywords: ['news', 'latest', 'trending', 'update', 'article'],
    authors: {
      name: author,
      url: process.env.NEXT_PUBLIC_HOST_URL
    }
  }
}
