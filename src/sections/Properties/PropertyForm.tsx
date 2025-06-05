'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Company,
  CompletionEnum,
  Media,
  MediaTypes,
  Property,
  PropertyStatusEnum,
  SaleTypeEnum
} from '@commonTypes'
import {
  DEFAULT_PROPERTY_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { PropertyFormContext } from '@context'
import { isPopulated } from '@guards'
import {
  useCreateProperty,
  useLinkConstructor,
  useUpdateProperty,
  useUploadImages,
  useUser
} from '@hooks'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import {
  PROPERTY_FEATURES_FORM_SCHEMA,
  PROPERTY_FORM_TRANSFORM_SCHEMA,
  PROPERTY_INFORMATION_FORM_SCHEMA_WITH_REFINE,
  PROPERTY_MEDIA_FORM_SCHEMA,
  PROPERTY_REGULATORY_INFORMATION_FORM_SCHEMA,
  PROPERTY_VALIDATED_INFORMATION_FORM_SCHEMA
} from '@schemas'
import PropertyInformation from '@sections/Properties/Steps/PropertyInformation'
import PropertyMedia from '@sections/Properties/Steps/PropertyMedia'
import RegulatoryInformationForm from '@sections/Properties/Steps/RegulatoryInformationForm'
import ValidatedInformation from '@sections/Properties/Steps/ValidatedInformation'
import { useTranslations } from 'next-intl'
import { GoDotFill } from 'react-icons/go'

import MultiSteps from '@components/MultiSteps'
import { FileItem } from '@components/UploadMultipleFiles'
import { appNotifications, cn, transformData, uploadImage } from '@utils'

import PropertyFeaturesForm from './Steps/PropertyFeaturesForm'

const { usePropertyForm, PropertyFormProvider } = PropertyFormContext

export interface PropertyFormProps {
  defaultValues?: Property | null
  isEdit?: boolean
}

function PropertyForm({ defaultValues, isEdit }: PropertyFormProps) {
  const t = useTranslations()
  const { user } = useUser()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const searchParams = useSearchParams()
  const { constructLink } = useLinkConstructor()

  const validations = [
    PROPERTY_INFORMATION_FORM_SCHEMA_WITH_REFINE(t),
    PROPERTY_MEDIA_FORM_SCHEMA(t),
    PROPERTY_FEATURES_FORM_SCHEMA,
    PROPERTY_VALIDATED_INFORMATION_FORM_SCHEMA,
    PROPERTY_REGULATORY_INFORMATION_FORM_SCHEMA(t)
  ]

  const currentValidation = validations[currentStep]

  const form = usePropertyForm({
    initialValues: DEFAULT_PROPERTY_FORM_DATA,
    validate: zodResolver(currentValidation),
    mode: 'controlled'
  })

  useEffect(() => {
    if (defaultValues && isEdit) {
      form.setValues(defaultValues)
    }
  }, [defaultValues, isEdit])

  // related to projects

  useEffect(() => {
    if (searchParams.get(SEARCH_PARAM_KEYS.PROJECT_KEY)) {
      form.setFieldValue(
        'project',
        searchParams.get(SEARCH_PARAM_KEYS.PROJECT_KEY)
      )
      form.setFieldValue('type', SaleTypeEnum.Sale)
      form.setFieldValue('completion', CompletionEnum.Ready)
    }
  }, [searchParams])

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

  const createProperty = useCreateProperty({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.addedSuccessfully', {
          item: t('properties.property')
        })
      )
      if (
        searchParams.get(SEARCH_PARAM_KEYS.PROJECT_KEY) &&
        searchParams.get(SEARCH_PARAM_KEYS.STATUS_KEY)
      ) {
        router.push(
          constructLink(
            navigationLinks.projects.viewProject(
              searchParams.get(SEARCH_PARAM_KEYS.PROJECT_KEY) || ''
            ),
            {
              [SEARCH_PARAM_KEYS.OWNER_KEY]: user?._id,
              [SEARCH_PARAM_KEYS.STATUS_KEY]:
                searchParams.get(SEARCH_PARAM_KEYS.STATUS_KEY) || '',
              [SEARCH_PARAM_KEYS.COMPANY_KEY]: isPopulated<Company>(
                user?.company
              )
                ? user?.company?._id
                : user?.company || ''
            }
          )
        )
      } else {
        router.push(navigationLinks.properties.myListings)
      }
    }
  })

  const updateProperty = useUpdateProperty({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('properties.property')
        })
      )
      router.push(navigationLinks.properties.myListings)
    }
  })

  const uploadImages = useUploadImages()

  const handleSubmit = async (
    data: Omit<typeof DEFAULT_PROPERTY_FORM_DATA, 'media'> & {
      media: FileItem[]
      project: string
    }
  ) => {
    if (
      !data?.permit?.tarkheesi &&
      data?.location.city.toLowerCase().includes('dubai')
    ) {
      appNotifications.error(
        t('properties.propertyForm.regulatoryInformation.trakRequiredForDubai')
      )
      return
    }
    const transformedData = transformData(
      PROPERTY_FORM_TRANSFORM_SCHEMA(t),
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

      let tarkheesiUrl = ''
      if (data.permit.tarkheesi) {
        if (
          (data.permit.tarkheesi as File).name.includes(
            'storage.googleapis.com'
          )
        ) {
          tarkheesiUrl = (data.permit.tarkheesi as File).name
        } else {
          tarkheesiUrl = await uploadImage(
            data.permit.tarkheesi,
            uploadImages.mutateAsync
          )
        }
        if (!tarkheesiUrl) {
          appNotifications.error(
            t(
              'properties.propertyForm.regulatoryInformation.tarkheesiUploadFailed'
            )
          )
          return
        }
      }

      if (media.some((item) => !item.url)) {
        appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
        return
      }

      const dataToSend = {
        ...transformedData,
        media,

        permit: {
          ...data.permit,
          tarkheesi: tarkheesiUrl
        }
      }
      if (isEdit && defaultValues?._id) {
        updateProperty.mutate({ id: defaultValues?._id, ...dataToSend })
      } else {
        createProperty.mutate({
          ...dataToSend,
          status: PropertyStatusEnum.Inactive,
          project: data.project
        })
      }
    }
  }

  return (
    <PropertyFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) => {
          const { project, ...rest } =
            values as typeof DEFAULT_PROPERTY_FORM_DATA & {
              project: string
            }
          handleSubmit({ ...rest, project })
        })}
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
            <ValidatedInformation onBack={onBack} onNext={onNext} />
          </Stepper.Step>
          <Stepper.Step
            icon={handleIconAppear(4)}
            label={
              <Text className={cn(handleTextStyle(4))}>
                {t(
                  'properties.propertyForm.steps.propertyRegulatoryInformation'
                )}
              </Text>
            }
          >
            <RegulatoryInformationForm
              loading={
                uploadImages.isPending ||
                createProperty.isPending ||
                updateProperty.isPending
              }
              onBack={onBack}
            />
          </Stepper.Step>
        </MultiSteps>
      </form>
    </PropertyFormProvider>
  )
}

export default PropertyForm
