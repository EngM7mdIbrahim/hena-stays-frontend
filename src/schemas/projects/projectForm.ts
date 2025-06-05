import { MEDIA_SCHEMA } from '@schemas/common'
import { LOCATION_SCHEMA } from '@schemas/common/location'
import * as z from 'zod'

import { TranslationFn } from '@interfaces'
import { appNotifications } from '@utils'

/** PROJECT INFORMATION FORM SCHEMA */
export const PROJECT_INFORMATION_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    title: z
      .string()
      .min(3, t('errorMessages.projects.information.titleTooShort')),
    location: LOCATION_SCHEMA,
    description: z
      .string()
      .min(10, t('errorMessages.projects.information.descriptionTooShort')),
    handOverDate: z
      .date({
        invalid_type_error: t('errorMessages.shared.required', {
          field: t(
            'projects.projectForm.projectInformation.fields.handoverDate.label'
          )
        })
      })
      .refine((date) => date >= new Date(), {
        message: t('errorMessages.projects.information.handoverDatePast')
      })
  })

/** PROJECT MEDIA FORM SCHEMA */
export const PROJECT_MEDIA_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    media: MEDIA_SCHEMA(t)
  })

/** BASE PAYMENT PLAN SCHEMA */
const BASE_PAYMENT_PLAN_SCHEMA = (t: TranslationFn) =>
  z.object({
    paymentType: z.enum(['fullPrice', 'projectCompletion'], {
      required_error: t('errorMessages.shared.required', {
        field: t('projects.projectForm.paymentPlan.fields.paymentType.label')
      }),
      invalid_type_error: t(
        'errorMessages.projects.paymentPlan.paymentTypeInvalid'
      )
    }),

    // These fields will be conditionally required based on paymentType
    preHandOverPercentage: z.coerce
      .number({
        invalid_type_error: t(
          'errorMessages.projects.paymentPlan.preHandoverInvalid'
        )
      })
      .min(0, t('errorMessages.projects.paymentPlan.preHandoverMin'))
      .max(100, t('errorMessages.projects.paymentPlan.preHandoverMax'))
      .optional(),

    monthsNumber: z.coerce
      .number({
        invalid_type_error: t(
          'errorMessages.projects.paymentPlan.monthsNumberInvalid'
        )
      })
      .optional(),

    paymentPlan: z.object({
      downPaymentPercentage: z
        .number({
          required_error: t('errorMessages.shared.required', {
            field: t('projects.projectView.tabs.paymentPlan.downPayment')
          })
        })
        .min(0, t('errorMessages.projects.paymentPlan.downPaymentMin'))
        .max(100, t('errorMessages.projects.paymentPlan.downPaymentMax')),

      onHandOverPercentage: z
        .number({
          required_error: t('errorMessages.shared.required', {
            field: t(
              'projects.projectForm.paymentPlan.fields.onHandoverPercentage'
            )
          })
        })
        .min(0, t('errorMessages.projects.paymentPlan.onHandoverMin'))
        .max(100, t('errorMessages.projects.paymentPlan.onHandoverMax')),

      postHandOverPercentage: z
        .number({
          required_error: t('errorMessages.shared.required', {
            field: t(
              'projects.projectForm.paymentPlan.fields.postHandoverPercentage'
            )
          })
        })
        .min(0, t('errorMessages.projects.paymentPlan.postHandoverMin'))
        .max(100, t('errorMessages.projects.paymentPlan.postHandoverMax')),

      projectCompletion: z
        .array(
          z.object({
            order: z.coerce.number(),

            preHandOverPercentage: z.coerce
              .number()
              .min(0, t('errorMessages.projects.paymentPlan.preHandoverMin'))
              .max(100, t('errorMessages.projects.paymentPlan.preHandoverMax')),

            mileStonePercentage: z.coerce
              .number()
              .min(0, t('errorMessages.projects.paymentPlan.milestoneMin'))
              .max(
                100,
                t('errorMessages.projects.paymentPlan.milestonePercentageMax')
              )
          })
        )
        .optional()
    })
  })

/** REFINED PAYMENT PLAN SCHEMA */
export const PROJECT_PAYMENT_PLAN_FORM_SCHEMA = (t: TranslationFn) =>
  BASE_PAYMENT_PLAN_SCHEMA(t).superRefine((data, ctx) => {
    // Validation for projectCompletion type
    const projectCompletion = data.paymentPlan.projectCompletion || []

    // Validate project completion entries
    if (
      projectCompletion.length > 0 &&
      data.paymentType === 'projectCompletion'
    ) {
      // Validate required fields for projectCompletion
      data.paymentPlan.projectCompletion?.forEach((item, index) => {
        if (
          !item.preHandOverPercentage ||
          item.preHandOverPercentage.toString() === ''
        ) {
          ctx.addIssue({
            code: 'custom',
            path: [
              'paymentPlan',
              'projectCompletion',
              index,
              'preHandOverPercentage'
            ],
            message: t(
              'errorMessages.projects.paymentPlan.preHandoverRequiredCompletion'
            )
          })
        }
        if (
          !item.mileStonePercentage ||
          item.mileStonePercentage.toString() === ''
        ) {
          ctx.addIssue({
            code: 'custom',
            path: [
              'paymentPlan',
              'projectCompletion',
              index,
              'mileStonePercentage'
            ],
            message: t(
              'errorMessages.projects.paymentPlan.milestoneRequiredCompletion'
            )
          })
        }
      })

      // Check for unique milestone percentages
      const percentages = projectCompletion.map(
        (item) => item.mileStonePercentage
      )

      if (new Set(percentages).size !== percentages.length) {
        ctx.addIssue({
          code: 'custom',
          path: ['paymentPlan', 'projectCompletionUnique'],
          message: t('errorMessages.projects.paymentPlan.milestoneUnique')
        })
      }

      const calculateTotalPercentage = () => {
        const basePercentage =
          data.paymentPlan.downPaymentPercentage +
          data.paymentPlan.onHandOverPercentage +
          data.paymentPlan.postHandOverPercentage

        const completionPercentage = projectCompletion.reduce(
          (acc, item) => acc + item.preHandOverPercentage,
          0
        )

        return basePercentage + completionPercentage
      }

      const total = calculateTotalPercentage()

      if (Math.ceil(total) !== 100) {
        ctx.addIssue({
          code: 'custom',
          path: ['total'],
          message: t('errorMessages.projects.paymentPlan.totalPercentage')
        })
        appNotifications.error(
          t('errorMessages.projects.paymentPlan.totalPercentage')
        )
      }
    }
    if (data.paymentType === 'fullPrice') {
      // Validate required fields for fullPrice
      if (!data.monthsNumber || data.monthsNumber.toString() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['monthsNumber'],
          message: t('errorMessages.projects.paymentPlan.monthsNumberRequired')
        })
      }
      if (
        !data.preHandOverPercentage ||
        data.preHandOverPercentage.toString() === ''
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['preHandOverPercentage'],
          message: t('errorMessages.projects.paymentPlan.preHandoverRequired')
        })
      }
      const calculateTotalPercentage = () => {
        const basePercentage =
          data.paymentPlan.downPaymentPercentage +
          (data.preHandOverPercentage ?? 0) +
          data.paymentPlan.onHandOverPercentage +
          data.paymentPlan.postHandOverPercentage

        return basePercentage
      }
      const total = calculateTotalPercentage()

      if (Math.ceil(total) !== 100) {
        ctx.addIssue({
          code: 'custom',
          path: ['total'],
          message: t('errorMessages.projects.paymentPlan.totalPercentage')
        })
        appNotifications.error(
          t('errorMessages.projects.paymentPlan.totalPercentage')
        )
      }
    }
  })

export const PROJECT_FORM_TRANSFORM_SCHEMA = (t: TranslationFn) =>
  PROJECT_INFORMATION_FORM_SCHEMA(t)
    .merge(PROJECT_MEDIA_FORM_SCHEMA(t))
    .merge(BASE_PAYMENT_PLAN_SCHEMA(t))
    .transform((data) => {
      const {
        paymentType,
        preHandOverPercentage,
        monthsNumber,
        paymentPlan,
        handOverDate,
        ...rest
      } = data

      const cleanedData = {
        ...rest,

        handOverDate,
        paymentPlan: {
          ...paymentPlan,
          ...(paymentType === 'fullPrice'
            ? {
                fullPrice: {
                  monthsNumber: Number(monthsNumber),
                  preHandOverPercentage: Number(preHandOverPercentage)
                },
                projectCompletion: [] // Ensure empty array if fullPrice is selected
              }
            : {
                projectCompletion:
                  paymentPlan.projectCompletion?.map((item) => ({
                    order: item.order,
                    preHandOverPercentage: item.preHandOverPercentage,
                    mileStonePercentage: item.mileStonePercentage.toString()
                  })) || [],
                fullPrice: null
              })
        }
      }

      return cleanedData
    })
