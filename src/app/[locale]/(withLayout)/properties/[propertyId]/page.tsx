import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProperty } from '@apis'
import { MediaTypes, User } from '@commonTypes'
import { generateMetadataProperties, navigationLinks } from '@constants'
import { isPopulated } from '@guards'
import { Stack } from '@mantine/core'
import PropertyViewSection from '@sections/Properties/PropertyViewSection'

import HeadScript from '@components/HeadScript'
import { safeFetch } from '@utils'

export interface PropertyViewPageProps {
  params: {
    propertyId: string
  }
}

export async function generateMetadata({
  params
}: PropertyViewPageProps): Promise<Metadata> {
  const { propertyId } = params

  const { success, data } = await safeFetch(getProperty, [
    {
      id: propertyId,
      showFields: {
        createdBy: {
          company: true
        },
        subCategory: true,
        amenities: {
          basic: true
        }
      }
    }
  ])

  if (!success)
    return {
      title: 'Property not found'
    }
  const { property } = data

  if (!isPopulated<User>(property?.createdBy)) return {}

  return {
    ...generateMetadataProperties({
      title: `${property?.title} | TrueDar`,
      creator: property?.createdBy?.name,
      description: property?.description,
      images: property?.media
        ?.filter((item) => item.type === MediaTypes.Image)
        .map((item) => item.url),
      publishedTime: new Date(property?.createdAt).toISOString(),
      url: `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.properties.viewProperty(
        propertyId
      )}`,
      authors: [property?.createdBy?.name]
    })
  }
}

async function PropertyViewPage({ params }: PropertyViewPageProps) {
  const keywords = [
    'property',
    'real estate',
    'home',
    'apartment',
    'buy',
    'sell',
    'rent'
  ]

  const { success, data } = await safeFetch(getProperty, [
    {
      id: params.propertyId,
      showFields: {
        createdBy: {
          company: true
        },
        subCategory: true,
        amenities: {
          basic: true
        }
      }
    }
  ])

  if (!success) {
    return notFound()
  }
  const { property } = data

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'keywords': keywords,
    'name': property?.title,
    'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.properties.viewProperty(
      params.propertyId
    )}`,
    'image': property?.media
      ?.filter((item) => item.type === MediaTypes.Image)
      .map((item) => item.url),
    'description': property?.description,
    'brand': {
      '@type': 'Brand',
      'name': 'TrueDar'
    },
    'offers': {
      '@type': 'Offer',
      'price': property?.price?.value,
      'priceCurrency': property?.price?.currency,
      'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.properties.viewProperty(
        params.propertyId
      )}`
    }
  }

  return (
    <>
      <HeadScript id='json-ld' content={jsonLd} />
      <Stack className='gap-4 px-4 md:px-8 lg:px-12'>
        <PropertyViewSection propertyId={params.propertyId} />
      </Stack>
    </>
  )
}

export default PropertyViewPage
