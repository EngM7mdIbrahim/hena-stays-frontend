import { Authority, Jurisdiction } from '@commonTypes'
import { z } from 'zod'

import { TranslationFn } from '@interfaces'

import { AGENT_SIGN_UP_FORM_SCHEMA } from './signupAgent'
import { USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS } from './signupUser'

export const COMPANY_SIGN_UP_FORM_DATA_BASIC_INFORMATION_SCHEMA = (
  t: TranslationFn
) =>
  z.object({
    address: z.string().min(1, {
      message: t('errorMessages.shared.required', {
        field: t('auth.signup.signupCompany.fields.companyAddress')
      })
    }),
    companyName: z.string().min(3, {
      message: t('errorMessages.shared.required', {
        field: t('auth.signup.signupCompany.fields.companyName')
      })
    })
  })

export const COMPANY_SIGN_UP_FORM_SCHEMA_LEGAL_INFORMATION_SCHEMA = (
  t: TranslationFn
) =>
  z.object({
    authority: z.nativeEnum(Authority, {
      required_error: t('errorMessages.shared.required', {
        field: t('auth.signup.signupCompany.fields.licenseAuthority')
      })
    }),
    jurisdiction: z.nativeEnum(Jurisdiction, {
      required_error: t('errorMessages.shared.required', {
        field: t('auth.signup.signupCompany.fields.businessJurisdictionType')
      })
    })
  })

export const COMPANY_SIGN_UP_FORM_SCHEMA = (t: TranslationFn) =>
  z.intersection(
    USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS(t),
    COMPANY_SIGN_UP_FORM_DATA_BASIC_INFORMATION_SCHEMA(t)
      .merge(COMPANY_SIGN_UP_FORM_SCHEMA_LEGAL_INFORMATION_SCHEMA(t))
      .merge(AGENT_SIGN_UP_FORM_SCHEMA(t))
  )
