'use client'

import React, { useEffect, useState } from 'react'
import { DEFAULT_AGENT_SIGNUP_FORM_DATA } from '@constants'
import { AgentSignupFormContext } from '@context'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import {
  AGENT_SIGN_UP_FORM_SCHEMA,
  AGENT_SIGN_UP_FORM_SCHEMA_MERGED,
  USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS
} from '@schemas'
import { useTranslations } from 'next-intl'
import { GoDotFill } from 'react-icons/go'

import MultiSteps from '@components/MultiSteps'
import { cn, transformData } from '@utils'

import BasicInformation from './Steps/BasicInformation'
import LegalInformation from './Steps/LegalInformation'

const { useAgentSignupForm, AgentSignupFormProvider } = AgentSignupFormContext

export interface SignUpAgentProps {
  defaultValues?: typeof DEFAULT_AGENT_SIGNUP_FORM_DATA
  onImageUpload: (
    licenseCopies: File[],
    watermark?: File | null
  ) => Promise<{
    licenseCopies?: string[]
    watermark?: string
  }>
  onSubmit: (
    data: NonNullable<
      ReturnType<
        typeof transformData<
          ReturnType<typeof AGENT_SIGN_UP_FORM_SCHEMA_MERGED>
        >
      >
    >
  ) => Promise<void>
}

function SignUpAgent({
  onImageUpload,
  onSubmit,
  defaultValues
}: SignUpAgentProps) {
  const t = useTranslations()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const validations = [
    USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS(t),
    AGENT_SIGN_UP_FORM_SCHEMA(t)
  ]

  const currentValidation = validations[currentStep]

  const form = useAgentSignupForm({
    initialValues: DEFAULT_AGENT_SIGNUP_FORM_DATA,
    validate: zodResolver(currentValidation),
    mode: 'controlled'
  })

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      form.setValues({
        ...defaultValues,
        isEdit: true
      })
    }
  }, [defaultValues, form?.setValues])

  const handleNext = () => {
    form.validate()
    if (form.isValid()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = async (data: typeof DEFAULT_AGENT_SIGNUP_FORM_DATA) => {
    setLoading(true)
    const transformedData = transformData(
      AGENT_SIGN_UP_FORM_SCHEMA_MERGED(t),
      data
    )

    const { licenseCopies, watermark } = await onImageUpload(
      data.licenseCopies,
      data.watermark
    )
    if (!licenseCopies || (!watermark && data?.watermark)) {
      setLoading(false)
      return
    }

    if (licenseCopies.length > 0 && transformedData) {
      await onSubmit({
        ...transformedData,
        licenseCopies,
        ...(watermark && { watermark })
      })
    }
    setLoading(false)
  }

  return (
    <AgentSignupFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as typeof DEFAULT_AGENT_SIGNUP_FORM_DATA)
        )}
      >
        <MultiSteps active={currentStep} onStepClick={setCurrentStep}>
          <Stepper.Step
            icon={<GoDotFill className='h-5 w-5 text-neutral-700' />}
            label={
              <Text
                className={cn(
                  currentStep === 0 &&
                    'text-sm font-bold text-neutral-700 md:text-md'
                )}
              >
                {t('auth.signup.steps.basicInformation')}
              </Text>
            }
          >
            <BasicInformation onNext={handleNext} />
          </Stepper.Step>
          <Stepper.Step
            icon={
              currentStep === 1 ? (
                <GoDotFill className='h-5 w-5 text-neutral-700' />
              ) : (
                <div>&nbsp;</div>
              )
            }
            label={
              <Text
                className={cn(
                  currentStep === 1 &&
                    'text-sm font-bold text-neutral-700 md:text-md'
                )}
              >
                {t('auth.signup.steps.legalInformation')}
              </Text>
            }
          >
            <LegalInformation
              buttonText={
                defaultValues
                  ? t('shared.buttons.update')
                  : t('shared.buttons.register')
              }
              loading={loading}
            />
          </Stepper.Step>
        </MultiSteps>
      </form>
    </AgentSignupFormProvider>
  )
}

export default SignUpAgent
