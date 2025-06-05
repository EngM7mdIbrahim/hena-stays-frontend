import { Metadata } from 'next'
import { User } from '@commonTypes'

import { MetadataProps } from './properties'

export interface MetaDataBlogsProps extends MetadataProps {
  imageUrl: string
  keywords?: string[]
  defaultSupportUser?: User
}

export function generateMetadataBlogs({
  title,
  description,
  imageUrl,
  publishedTime,
  modifiedTime,
  url,
  keywords,
  defaultSupportUser
}: MetaDataBlogsProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: {
        url: imageUrl
      },
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
    keywords,
    authors: {
      name: 'TrueDar Team',
      url: process.env.NEXT_PUBLIC_HOST_URL
    },
    alternates: {
      canonical: url
    }
  }
}
