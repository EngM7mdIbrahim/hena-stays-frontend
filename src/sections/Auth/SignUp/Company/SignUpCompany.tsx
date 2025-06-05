'use client'

import React, { useEffect, useState } from 'react'
import { DEFAULT_COMPANY_SIGNUP_FORM_DATA } from '@constants'
import { CompanySignupFormContext } from '@context'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import {
  AGENT_SIGN_UP_FORM_SCHEMA,
  COMPANY_SIGN_UP_FORM_DATA_BASIC_INFORMATION_SCHEMA,
  COMPANY_SIGN_UP_FORM_SCHEMA,
  COMPANY_SIGN_UP_FORM_SCHEMA_LEGAL_INFORMATION_SCHEMA,
  USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS
} from '@schemas'
import { useTranslations } from 'next-intl'
import { GoDotFill } from 'react-icons/go'
import { z } from 'zod'

import MultiSteps from '@components/MultiSteps'
import { cn, transformData } from '@utils'

import BasicInformation from './Steps/BasicInformation'
import LegalInformation from './Steps/LegalInformation'

const { useCompanySignupForm, CompanySignupFormProvider } =
  CompanySignupFormContext

export interface SignUpCompanyProps {
  defaultValues?: typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA
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
        typeof transformData<ReturnType<typeof COMPANY_SIGN_UP_FORM_SCHEMA>>
      >
    >
  ) => Promise<void>
}

function SignUpCompany({
  onImageUpload,
  onSubmit,
  defaultValues
}: SignUpCompanyProps) {
  const t = useTranslations()
  const [currentStep, setCurrentStep] = useState(0)

  const [loading, setLoading] = useState(false)

  const mergedValidations = [
    z.intersection(
      USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS(t),
      COMPANY_SIGN_UP_FORM_DATA_BASIC_INFORMATION_SCHEMA(t)
    ),
    COMPANY_SIGN_UP_FORM_SCHEMA_LEGAL_INFORMATION_SCHEMA(t).merge(
      AGENT_SIGN_UP_FORM_SCHEMA(t)
    )
  ]

  const currentValidation = mergedValidations[currentStep]

  const form = useCompanySignupForm({
    initialValues: DEFAULT_COMPANY_SIGNUP_FORM_DATA,
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

  const handleSubmit = async (
    data: typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA
  ) => {
    setLoading(true)
    const transformedData = transformData(COMPANY_SIGN_UP_FORM_SCHEMA(t), data)
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
    <CompanySignupFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA)
        )}
      >
        <MultiSteps active={currentStep} onStepClick={setCurrentStep}>
          <Stepper.Step
            icon={<GoDotFill className='h-5 w-5 text-neutral-700' />}
            label={
              <Text
                className={cn(
                  currentStep === 0 && 'font-bold text-neutral-700'
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
                  currentStep === 1 && 'font-bold text-neutral-700'
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
    </CompanySignupFormProvider>
  )
}

export default SignUpCompany
