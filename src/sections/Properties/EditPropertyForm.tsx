'use client'

import React from 'react'
import { Amenity, MediaTypes, Property, SubCategory } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useGetPropertyById,
  useGetUserPermissions,
  useProtectRoute
} from '@hooks'
import { Box } from '@mantine/core'
import PropertyForm from '@sections/Properties/PropertyForm'

import LoaderScreen from '@components/LoaderScreen'

import { PropertyViewSectionProps } from './PropertyViewSection'

function EditPropertyForm({ propertyId }: PropertyViewSectionProps) {
  const getProperty = useGetPropertyById(
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
    },
    {
      // This because if the user go to another page then the refetch will be triggered and the data will be lost

      refetchOnWindowFocus: false, // No refetch on window focus
      refetchOnReconnect: false, // No refetch on reconnect
      queryKey: [QUERY_KEYS.PROPERTIES.SINGLE_PROPERTY(propertyId)]
    }
  )
  const property = getProperty?.data?.property

  const defaultValues = {
    ...property,
    media: property?.media.map((mediaItem) => ({
      file: new File([mediaItem.url], mediaItem.url, {
        type: mediaItem.type
      }),
      preview: mediaItem.url
    })),
    subCategory: !isPopulated<SubCategory>(property?.subCategory)
      ? property?.subCategory
      : property?.subCategory?._id,
    permit: {
      ...property?.permit,
      tarkheesi:
        property?.permit?.tarkheesi &&
        new File([property?.permit?.tarkheesi], property?.permit?.tarkheesi, {
          type: MediaTypes.Image
        })
    },
    amenities: {
      ...property?.amenities,
      basic: Array.isArray(property?.amenities?.basic)
        ? property.amenities.basic.map((amenity) =>
            isPopulated<Amenity>(amenity) ? amenity._id : amenity
          )
        : property?.amenities?.basic
    }
  }
  const { permissions } = useGetUserPermissions(Modules.PROPERTIES)
  const isLoaded = useProtectRoute(permissions.canEditProperty, property)

  // Show loader while loading or if no permission
  if (getProperty.isLoading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box>
      <PropertyForm
        isEdit
        defaultValues={defaultValues as unknown as Property}
      />
    </Box>
  )
}

export default EditPropertyForm
