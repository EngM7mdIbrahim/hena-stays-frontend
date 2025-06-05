'use client'

import React from 'react'
import { Amenity, CurrencyCode, SubCategory } from '@commonTypes'
import { DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA, QUERY_KEYS } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useGetBuyPropertyRequestById,
  useGetUserPermissions,
  useProtectRoute
} from '@hooks'
import { Box } from '@mantine/core'
import BuyPropertyRequestForm from '@sections/BuyPropertyRequests/BuyPropertyRequestForm'

import { RangeFieldValue } from '@components/CustomFields/RangeFields'
import LoaderScreen from '@components/LoaderScreen'

export interface EditBuyPropertyRequestFormProps {
  requestId: string
}

function EditBuyPropertyRequestForm({
  requestId
}: EditBuyPropertyRequestFormProps) {
  const getBuyRequest = useGetBuyPropertyRequestById(
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
        QUERY_KEYS.BUY_PROPERTY_REQUESTS.BUY_PROPERTY_REQUESTS,
        requestId
      ]
    }
  )
  const request = getBuyRequest?.data?.requestBuyProperty

  const defaultValues = {
    _id: request?._id,
    ...DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA,
    ...(request ?? {}),
    sameAsWhatsapp:
      request?.contactInfo?.whatsapp === request?.contactInfo?.phone,
    age: [request?.age?.from || 0, request?.age?.to || 0] as RangeFieldValue,
    area: [request?.area?.from || 0, request?.area?.to || 0] as RangeFieldValue,
    bedroom: [
      request?.bedroom?.from || 0,
      request?.bedroom?.to || 0
    ] as RangeFieldValue,
    living: [
      request?.living?.from || 0,
      request?.living?.to || 0
    ] as RangeFieldValue,
    toilets: [
      request?.toilets?.from || 0,
      request?.toilets?.to || 0
    ] as RangeFieldValue,
    price: {
      value: [
        request?.price?.from || 0,
        request?.price?.to || 0
      ] as RangeFieldValue,
      currency: request?.price?.currency || CurrencyCode.Aed,
      duration: request?.price?.duration
    },
    amenities:
      request?.amenities?.basic?.map((amenity) =>
        isPopulated<Amenity>(amenity) ? amenity._id : amenity
      ) || [],
    subCategory: isPopulated<SubCategory>(request?.subCategory)
      ? request?.subCategory?._id
      : (request?.subCategory ?? '')
  }

  const { permissions } = useGetUserPermissions(Modules.BUY_PROPERTY_REQUESTS)
  const isLoaded = useProtectRoute(
    permissions.canEditBuyPropertyRequest,
    request
  )

  // Show loader while loading or if no permission
  if (getBuyRequest.isLoading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box>
      <BuyPropertyRequestForm isEdit defaultValues={defaultValues} />
    </Box>
  )
}

export default EditBuyPropertyRequestForm
