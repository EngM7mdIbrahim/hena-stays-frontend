'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Media,
  MediaTypes,
  ProjectStatusEnum,
  UpdateProjectRequestBody
} from '@commonTypes'
import { DEFAULT_PROJECT_FORM_DATA, navigationLinks } from '@constants'
import { ProjectFormContext } from '@context'
import { useCreateProject, useUpdateProject, useUploadImages } from '@hooks'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import {
  PROJECT_FORM_TRANSFORM_SCHEMA,
  PROJECT_INFORMATION_FORM_SCHEMA,
  PROJECT_MEDIA_FORM_SCHEMA,
  PROJECT_PAYMENT_PLAN_FORM_SCHEMA
} from '@schemas/projects'
import { useTranslations } from 'next-intl'
import { GoDotFill } from 'react-icons/go'

import MultiSteps from '@components/MultiSteps'
import { FileItem } from '@components/UploadMultipleFiles'
import { appNotifications, cn, transformData, uploadImage } from '@utils'

import PaymentPlan from './Steps/PaymentPlan/PaymentPlan'
import ProjectInformation from './Steps/ProjectInformation'
import ProjectMedia from './Steps/ProjectMedia'

const { useProjectForm, ProjectFormProvider } = ProjectFormContext

interface ProjectFormProps {
  defaultValues?: Omit<UpdateProjectRequestBody, 'media' | 'paymentPlan'>
  isEdit?: boolean
}

function ProjectForm({ defaultValues, isEdit }: ProjectFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const validations = [
    PROJECT_INFORMATION_FORM_SCHEMA(t),
    PROJECT_MEDIA_FORM_SCHEMA(t),
    PROJECT_PAYMENT_PLAN_FORM_SCHEMA(t)
  ]

  const form = useProjectForm({
    initialValues: DEFAULT_PROJECT_FORM_DATA,
    validate: zodResolver(validations[currentStep]),
    mode: 'controlled'
  })

  useEffect(() => {
    if (defaultValues && isEdit) {
      form.setValues(defaultValues)
    }
  }, [defaultValues, isEdit])

  const createProject = useCreateProject({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.addedSuccessfully', {
          item: t('projects.newProject')
        })
      )
      router.push(navigationLinks.projects.myProjects)
    }
  })

  const updateProject = useUpdateProject({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('projects.project')
        })
      )
      router.push(navigationLinks.projects.myProjects)
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
    data: Omit<typeof DEFAULT_PROJECT_FORM_DATA, 'media'> & {
      media: FileItem[]
    }
  ) => {
    const transformedData = transformData(
      PROJECT_FORM_TRANSFORM_SCHEMA(t),
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
        updateProject.mutate({
          id: defaultValues._id,
          ...dataToSend
        })
      } else {
        createProject.mutate({ ...dataToSend, status: ProjectStatusEnum.Hold })
      }
    }
  }

  return (
    <ProjectFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as typeof DEFAULT_PROJECT_FORM_DATA)
        )}
      >
        <MultiSteps active={currentStep} onStepClick={setCurrentStep}>
          <Stepper.Step
            icon={handleIconAppear(0)}
            label={
              <Text className={cn(handleTextStyle(0))}>
                {t('projects.projectForm.steps.projectInformation')}
              </Text>
            }
          >
            <ProjectInformation onNext={onNext} />
          </Stepper.Step>
          <Stepper.Step
            icon={handleIconAppear(1)}
            label={
              <Text className={cn(handleTextStyle(1))}>
                {t('projects.projectForm.steps.projectMedia')}
              </Text>
            }
          >
            <ProjectMedia onBack={onBack} onNext={onNext} />
          </Stepper.Step>

          <Stepper.Step
            icon={handleIconAppear(3)}
            label={
              <Text className={cn(handleTextStyle(3))}>
                {t('projects.projectForm.steps.paymentPlan')}
              </Text>
            }
          >
            <PaymentPlan
              onBack={onBack}
              loading={
                uploadImages.isPending ||
                createProject.isPending ||
                updateProject.isPending
              }
            />
          </Stepper.Step>
        </MultiSteps>
      </form>
    </ProjectFormProvider>
  )
}

export default ProjectForm
