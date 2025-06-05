import { Metadata } from 'next'

export interface MetadataProps {
  title?: string
  description?: string
  images?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[] // We receive authors as a string array
  creator?: string
  url?: string
  emails?: string | string[]
  phoneNumbers?: string | string[]
}

export function generateMetadataProperties({
  title,
  description,
  images,
  publishedTime,
  modifiedTime,
  authors,
  creator,
  emails,
  phoneNumbers,
  url
}: MetadataProps): Metadata {
  return {
    creator,
    category: 'property',
    title,

    description,
    openGraph: {
      type: 'article',
      title: title ?? undefined,
      description: description ?? undefined,
      images,
      emails,
      phoneNumbers,
      authors,
      publishedTime,
      modifiedTime,
      url
    },
    twitter: {
      title: title ?? undefined,
      description: description ?? undefined,
      images
    },
    keywords: [
      'property',
      'real estate',
      'home',
      'apartment',
      'buy',
      'sell',
      'rent'
    ],
    authors: authors?.map((author) => ({ name: author })) // Fix the authors type
  }
}
