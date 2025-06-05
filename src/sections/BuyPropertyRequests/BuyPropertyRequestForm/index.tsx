'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { UpdateRequestBuyPropertyRequestBody, UserRole } from '@commonTypes'
import {
  DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { BuyPropertyRequestFormContext } from '@context'
import {
  useCreateBuyPropertyRequest,
  useGetUserPermissions,
  useUpdateBuyPropertyRequest,
  useUser
} from '@hooks'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import { PERSONAL_DETAILS_FORM_SCHEMA } from '@schemas/buy-property-requests/personalDetailsForm'
import { BUY_PROPERTY_INFORMATION_FORM_SCHEMA } from '@schemas/buy-property-requests/propertyInformationForm'
import PersonalDetails from '@sections/BuyPropertyRequests/BuyPropertyRequestForm/Steps/PersonalDetails'
import { useTranslations } from 'next-intl'
import { GoDotFill } from 'react-icons/go'
import { z } from 'zod'

import { useQuickRegister } from '@hooks/query/auth/useQuickRegister'
import { RangeFieldValue } from '@components/CustomFields/RangeFields'
import MultiSteps from '@components/MultiSteps'
import { appNotifications, cn, transformData } from '@utils'

import PropertyInformation from './Steps/PropertyInformation'

const { useBuyPropertyRequestForm, BuyPropertyRequestFormProvider } =
  BuyPropertyRequestFormContext
export interface BuyPropertyRequestFormProps {
  defaultValues?: Omit<
    UpdateRequestBuyPropertyRequestBody,
    | 'age'
    | 'area'
    | 'bedroom'
    | 'living'
    | 'toilets'
    | 'price'
    | 'amenities'
    | 'subCategory'
  > & {
    age: RangeFieldValue
    area: RangeFieldValue
    bedroom: RangeFieldValue
    living: RangeFieldValue
    toilets: RangeFieldValue
    price: Omit<UpdateRequestBuyPropertyRequestBody['price'], 'value'> & {
      value: RangeFieldValue
    }
    amenities: string[]
    subCategory: string
  }
  isEdit?: boolean
}

function BuyPropertyRequestForm({
  isEdit,
  defaultValues
}: BuyPropertyRequestFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useGetUserPermissions()
  const { login } = useUser()

  const transformedDataRef = React.useRef<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const validations = [
    BUY_PROPERTY_INFORMATION_FORM_SCHEMA(t),
    PERSONAL_DETAILS_FORM_SCHEMA(t)
  ]

  const currentValidation = validations[currentStep]

  const form = useBuyPropertyRequestForm({
    initialValues: DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA,
    validate: zodResolver(currentValidation),
    mode: 'controlled'
  })

  useEffect(() => {
    if (defaultValues && isEdit) {
      form.setValues(defaultValues)
    }
  }, [defaultValues, isEdit])

  // if user is logged in or there is user params in the url, prefill the form

  const userParams = searchParams?.get(SEARCH_PARAM_KEYS.USER_KEY)

  useEffect(() => {
    if (!isEdit) {
      const userData = userParams ? JSON.parse(userParams) : user

      if (userData) {
        const { name, email, phone, whatsapp } = userData
        const sameAsWhatsapp = phone === whatsapp

        form.setFieldValue('contactInfo.name', name)
        form.setFieldValue('contactInfo.email', email)
        form.setFieldValue('sameAsWhatsapp', sameAsWhatsapp)
        form.setFieldValue('contactInfo.phone', phone)
        form.setFieldValue(
          'contactInfo.whatsapp',
          sameAsWhatsapp ? user?.phone : user?.whatsapp
        )
      }
    }
  }, [user])

  const handleIconAppear = (step: number) => {
    if (currentStep === step) {
      return <GoDotFill className='h-5 w-5 text-neutral-700' />
    }
    return <div>&nbsp;</div>
  }

  const handleTextStyle = (step: number) => {
    if (currentStep === step) {
      return 'text-sm font-bold md:text-md text-neutral-700'
    }
    return 'text-default-text/75 text-sm md:text-md'
  }

  const onNext = () => {
    form.validate()
    if (form.isValid()) {
      setCurrentStep((cur) => cur + 1)
    }
  }

  const onBack = () => {
    setCurrentStep((cur) => cur - 1)
  }

  const mergedSchemas = z.intersection(
    BUY_PROPERTY_INFORMATION_FORM_SCHEMA(t),
    PERSONAL_DETAILS_FORM_SCHEMA(t)
  )

  const createBuyPropertyRequest = useCreateBuyPropertyRequest({
    onSuccess: () => {
      router.push(navigationLinks.buyPropertyRequests.successRequest)
    }
  })

  const updateBuyPropertyRequest = useUpdateBuyPropertyRequest({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('buyPropertyRequests.buyPropertyRequestsForm.request')
        })
      )
      router.push(navigationLinks.buyPropertyRequests.allBuyPropertyRequests)
    }
  })

  const createGuestUser = useQuickRegister({
    onSuccess: ({ token, user: newUser }) => {
      appNotifications.success(
        t('successMessages.createdSuccessfully', {
          item: t('buyPropertyRequests.buyPropertyRequestsForm.user')
        })
      )

      login(token, newUser)
      if (transformedDataRef.current) {
        createBuyPropertyRequest.mutate({
          ...transformedDataRef.current
        })
      }
    }
  })

  const handleSubmit = (
    data: typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
  ) => {
    form.validate()
    if (!form.isValid()) return

    const transformedData = transformData(mergedSchemas, data)
    transformedDataRef.current = transformedData // Store transformed data in ref

    if (transformedData) {
      if (isEdit && defaultValues?._id) {
        updateBuyPropertyRequest.mutate({
          id: defaultValues?._id,
          ...transformedData
        })
      } else if (!user?._id) {
        // Create guest user and use ref to persist transformed data
        createGuestUser.mutate({
          name: transformedData.contactInfo.name,
          email: transformedData.contactInfo.email,
          phone: transformedData.contactInfo.phone,
          whatsapp: transformedData.contactInfo.whatsapp as string
        })
      } else if (user?.role === UserRole.User) {
        createBuyPropertyRequest.mutate(transformedData)
      }
    }
  }

  return (
    <BuyPropertyRequestFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
        )}
        className='flex flex-col gap-4'
      >
        <Text className='max-w-2xl text-sm text-neutral-500'>
          {t('buyPropertyRequests.buyPropertyRequestsForm.description')}
        </Text>
        <MultiSteps active={currentStep} onStepClick={setCurrentStep}>
          <Stepper.Step
            icon={handleIconAppear(0)}
            label={
              <Text className={cn(handleTextStyle(0))}>
                {t(
                  'buyPropertyRequests.buyPropertyRequestsForm.steps.propertyInformation'
                )}
              </Text>
            }
          >
            <PropertyInformation onNext={onNext} />
          </Stepper.Step>

          <Stepper.Step
            icon={handleIconAppear(1)}
            label={
              <Text className={cn(handleTextStyle(1))}>
                {t(
                  'buyPropertyRequests.buyPropertyRequestsForm.steps.personalDetails'
                )}
              </Text>
            }
          >
            <PersonalDetails
              loading={
                createBuyPropertyRequest.isPending ||
                createGuestUser.isPending ||
                updateBuyPropertyRequest.isPending
              }
              onBack={onBack}
            />
          </Stepper.Step>
        </MultiSteps>
      </form>
    </BuyPropertyRequestFormProvider>
  )
}

export default BuyPropertyRequestForm
