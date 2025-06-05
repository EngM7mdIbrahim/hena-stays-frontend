'use client'

import React from 'react'
import { Amenity, SubCategory } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useGetSellPropertyRequestById,
  useGetUserPermissions,
  useProtectRoute
} from '@hooks'
import { Box } from '@mantine/core'

import LoaderScreen from '@components/LoaderScreen'

import SellPropertyForm from './SellPropertyForm'
import { SellPropertyViewSectionProps } from './SellPropertyViewSection'

function EditSellPropertyForm({ requestId }: SellPropertyViewSectionProps) {
  const getSellPropertyRequest = useGetSellPropertyRequestById(
    {
      id: requestId,
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
      queryKey: [
        QUERY_KEYS.SELL_PROPERTY_REQUESTS.SINGLE_SELL_PROPERTY_REQUEST(
          requestId
        )
      ]
    }
  )
  const property = getSellPropertyRequest?.data?.requestSellProperty

  const defaultValues = {
    ...property,
    media: property?.media?.map((mediaItem) => ({
      file: new File([mediaItem.url], mediaItem.url, {
        type: mediaItem.type
      }),
      preview: mediaItem.url
    })),
    subCategory: !isPopulated<SubCategory>(property?.subCategory)
      ? property?.subCategory
      : property?.subCategory?._id,
    amenities: {
      basic:
        property?.amenities?.basic?.map((amenity) =>
          isPopulated<Amenity>(amenity) ? amenity._id : amenity
        ) || [],
      other: property?.amenities?.other || []
    }
  } as const

  const { permissions } = useGetUserPermissions(Modules.SELL_PROPERTY_REQUESTS)
  const isLoaded = useProtectRoute(
    permissions.canEditSellPropertyRequest,
    property
  )

  // Show loader while loading or if no permission
  if (getSellPropertyRequest.isLoading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box>
      <SellPropertyForm isEdit defaultValues={defaultValues} />
    </Box>
  )
}

export default EditSellPropertyForm
