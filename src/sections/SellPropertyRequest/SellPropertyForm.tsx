'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Media,
  MediaTypes,
  UpdateRequestSellPropertyRequestBody
} from '@commonTypes'
import { DEFAULT_SEll_PROPERTY_FORM_DATA, navigationLinks } from '@constants'
import { SellPropertyRequestFormContext } from '@context'
import {
  useCreateSellPropertyRequest,
  useUpdateSellPropertyRequest,
  useUploadImages
} from '@hooks'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import {
  SELL_PROPERTY_FEATURES_FORM_SCHEMA,
  SELL_PROPERTY_FORM_TRANSFORM_SCHEMA,
  SELL_PROPERTY_INFORMATION_FORM_SCHEMA,
  SELL_PROPERTY_MEDIA_FORM_SCHEMA,
  SELL_PROPERTY_VALIDATED_INFORMATION_FORM_SCHEMA
} from '@schemas'
import { useTranslations } from 'next-intl'
import { GoDotFill } from 'react-icons/go'

import MultiSteps from '@components/MultiSteps'
import { FileItem } from '@components/UploadMultipleFiles'
import { appNotifications, cn, transformData, uploadImage } from '@utils'

import PropertyFeaturesForm from './Steps/PropertyFeaturesForm'
import PropertyInformation from './Steps/PropertyInformation'
import PropertyMedia from './Steps/PropertyMedia'
import ValidatedInformation from './Steps/ValidatedInformation'

const { useSellPropertyRequestForm, SellPropertyRequestFormProvider } =
  SellPropertyRequestFormContext

export interface SellPropertyFormProps {
  defaultValues?: Omit<
    UpdateRequestSellPropertyRequestBody,
    'media' | 'amenities' | 'subCategory'
  > & {
    amenities: {
      basic: string[] | undefined
      other?: string[] | undefined
    }
    subCategory: string | undefined
  }
  isEdit?: boolean
}

function SellPropertyForm({ defaultValues, isEdit }: SellPropertyFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const validations = [
    SELL_PROPERTY_INFORMATION_FORM_SCHEMA(t),
    SELL_PROPERTY_MEDIA_FORM_SCHEMA(t),
    SELL_PROPERTY_FEATURES_FORM_SCHEMA,
    SELL_PROPERTY_VALIDATED_INFORMATION_FORM_SCHEMA
  ]

  const currentValidation = validations[currentStep]

  const form = useSellPropertyRequestForm({
    initialValues: DEFAULT_SEll_PROPERTY_FORM_DATA,
    validate: zodResolver(currentValidation),
    mode: 'controlled'
  })

  useEffect(() => {
    if (defaultValues && isEdit) {
      form.setValues(defaultValues)
    }
  }, [defaultValues, isEdit])

  const createSellPropertyRequest = useCreateSellPropertyRequest({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.addedSuccessfully', {
          item: t('sellPropertyRequests.sellPropertyRequest')
        })
      )
      router.push(navigationLinks.sellPropertyRequests.allSellPropertyRequests)
    }
  })

  const updateSellPropertyRequest = useUpdateSellPropertyRequest({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('sellPropertyRequests.sellPropertyRequest')
        })
      )
      router.push(navigationLinks.sellPropertyRequests.allSellPropertyRequests)
    }
  })

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

  const uploadImages = useUploadImages()

  const handleSubmit = async (
    data: Omit<typeof DEFAULT_SEll_PROPERTY_FORM_DATA, 'media'> & {
      media: FileItem[]
    }
  ) => {
    const transformedData = transformData(
      SELL_PROPERTY_FORM_TRANSFORM_SCHEMA(t),
      data
    )
    if (transformedData) {
      const media: Media[] = await Promise.all(
        data.media.map(async (image) => {
          let url = ''
          if (image.file.name.includes('storage.googleapis.com')) {
            return {
              url: image.file.name,
              type: image?.file?.type.includes(MediaTypes.Image)
                ? MediaTypes.Image
                : MediaTypes.Video
            }
          }

          url = await uploadImage(image?.file, uploadImages.mutateAsync)

          return {
            url,
            type: image?.file?.type.includes(MediaTypes.Image)
              ? MediaTypes.Image
              : MediaTypes.Video
          }
        })
      )

      if (media.some((item) => !item.url)) {
        appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
        return
      }

      const dataToSend = {
        ...transformedData,
        media
      }

      if (isEdit && defaultValues?._id) {
        updateSellPropertyRequest.mutate({
          id: defaultValues._id,
          ...dataToSend
        })
      } else {
        createSellPropertyRequest.mutate(dataToSend)
      }
    }
  }

  return (
    <SellPropertyRequestFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as typeof DEFAULT_SEll_PROPERTY_FORM_DATA)
        )}
      >
        <MultiSteps active={currentStep} onStepClick={setCurrentStep}>
          <Stepper.Step
            icon={handleIconAppear(0)}
            label={
              <Text className={cn(handleTextStyle(0))}>
                {t('properties.propertyForm.steps.propertyInformation')}
              </Text>
            }
          >
            <PropertyInformation onNext={onNext} />
          </Stepper.Step>
          <Stepper.Step
            icon={handleIconAppear(1)}
            label={
              <Text className={cn(handleTextStyle(1))}>
                {t('properties.propertyForm.steps.propertyMedia')}
              </Text>
            }
          >
            <PropertyMedia onBack={onBack} onNext={onNext} />
          </Stepper.Step>
          <Stepper.Step
            icon={handleIconAppear(2)}
            label={
              <Text className={cn(handleTextStyle(2))}>
                {t('properties.propertyForm.steps.propertyFeatures')}
              </Text>
            }
          >
            <PropertyFeaturesForm onBack={onBack} onNext={onNext} />
          </Stepper.Step>
          <Stepper.Step
            icon={handleIconAppear(3)}
            label={
              <Text className={cn(handleTextStyle(3))}>
                {t(
                  'properties.propertyForm.steps.propertyValidatedInformation'
                )}
              </Text>
            }
          >
            <ValidatedInformation
              onBack={onBack}
              loading={
                uploadImages.isPending ||
                createSellPropertyRequest.isPending ||
                updateSellPropertyRequest.isPending
              }
            />
          </Stepper.Step>
        </MultiSteps>
      </form>
    </SellPropertyRequestFormProvider>
  )
}

export default SellPropertyForm
