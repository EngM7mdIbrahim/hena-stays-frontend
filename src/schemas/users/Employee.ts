import { matchIsValidTel } from 'mui-tel-input'
import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const EMPLOYEE_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    isEdit: z.boolean().optional().default(false),

    name: z
      .string()
      .min(3, { message: t('errorMessages.shared.nameTooShort') })
      .max(50, { message: t('errorMessages.shared.nameTooLong') }),

    username: z
      .string()
      .min(3, { message: t('errorMessages.shared.usernameTooShort') })
      .max(50, { message: t('errorMessages.shared.usernameTooLong') }),

    phone: z.string().refine((value) => matchIsValidTel(value), {
      message: t('errorMessages.shared.invalidPhone')
    }),

    whatsapp: z.string().refine((value) => !value || matchIsValidTel(value), {
      message: t('errorMessages.shared.invalidWhatsapp')
    }),

    sameAsWhatsapp: z.boolean().optional().default(false),

    email: z
      .string()
      .email({ message: t('errorMessages.shared.invalidEmailFormat') }),

    password: z.string().optional(),

    image: z
      .union([
        z.instanceof(File, {
          message: t('errorMessages.users.employee.imageInvalid')
        }),
        z.null()
      ])
      .optional()
  })

export const EMPLOYEE_FORM_SCHEMA_WITH_REFINE = (t: TranslationFn) =>
  EMPLOYEE_FORM_SCHEMA(t)
    .superRefine((data, ctx) => {
      const { isEdit, password } = data

      // Password validation only if not editing or password is entered
      if (!isEdit && !password) {
        ctx.addIssue({
          path: ['password'],
          message: t('errorMessages.shared.required', {
            field: t('shared.fields.password')
          }),
          code: z.ZodIssueCode.custom
        })
      }

      if (password) {
        if (password.length < 8) {
          ctx.addIssue({
            path: ['password'],
            message: t('errorMessages.shared.passwordTooShort'),
            code: z.ZodIssueCode.custom
          })
        }
        if (!/[a-zA-Z]/.test(password)) {
          ctx.addIssue({
            path: ['password'],
            message: t('errorMessages.shared.passwordNoLetter'),
            code: z.ZodIssueCode.custom
          })
        }
        if (!/\d/.test(password)) {
          ctx.addIssue({
            path: ['password'],
            message: t('errorMessages.shared.passwordNoNumber'),
            code: z.ZodIssueCode.custom
          })
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          ctx.addIssue({
            path: ['password'],
            message: t('errorMessages.shared.passwordNoSymbol'),
            code: z.ZodIssueCode.custom
          })
        }
      }

      if (!data.sameAsWhatsapp && !data.whatsapp) {
        ctx.addIssue({
          path: ['whatsapp'],
          message: t('errorMessages.shared.whatsappRequired'),
          code: z.ZodIssueCode.custom
        })
      }
    })
    .transform((data) => {
      const { sameAsWhatsapp, isEdit, password, ...rest } = data

      const cleanedData = {
        ...rest,
        phone: rest.phone.replaceAll(' ', ''),
        whatsapp: sameAsWhatsapp
          ? rest.phone.replaceAll(' ', '')
          : rest.whatsapp?.replaceAll(' ', '')
      }

      return isEdit
        ? cleanedData
        : {
            ...cleanedData,
            password
          }
    })
