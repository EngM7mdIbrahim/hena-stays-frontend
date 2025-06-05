import {
  AgeTypeEnum,
  CompletionEnum,
  CreatePropertyRequestBody,
  CurrencyCode,
  FurnishedEnum,
  OwnerShipEnum,
  SaleTypeEnum
} from '@commonTypes'
import { MEDIA_SCHEMA } from '@schemas/common'
import { LOCATION_SCHEMA } from '@schemas/common/location'
import { TranslationFn } from 'src/interfaces/i18.interface'
import * as z from 'zod'

export const PROPERTY_INFORMATION_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    title: z
      .string()
      .min(
        1,
        t('errorMessages.shared.required', { field: t('shared.fields.title') })
      ),
    description: z.string().min(
      1,
      t('errorMessages.shared.required', {
        field: t('shared.fields.description')
      })
    ),

    location: LOCATION_SCHEMA,
    subCategory: z.string().min(
      1,
      t('errorMessages.shared.required', {
        field: t('shared.fields.subCategory')
      })
    ),
    category: z
      .string({
        required_error: t('errorMessages.shared.required', {
          field: t('shared.fields.propertyCategory.label')
        })
      })
      .min(
        1,
        t('errorMessages.shared.required', {
          field: t('shared.fields.propertyCategory.label')
        })
      ),
    type: z.nativeEnum(SaleTypeEnum, {
      message: t('errorMessages.shared.required', {
        field: t('shared.fields.propertyType.label')
      })
    }),

    completion: z.nativeEnum(CompletionEnum, {
      message: t('errorMessages.shared.required', {
        field: t('shared.fields.completion.label')
      })
    }),
    furnished: z.union([z.nativeEnum(FurnishedEnum), z.literal('')]).optional(),
    toilets: z.union([z.number(), z.literal('')]).optional(),
    living: z.union([z.number(), z.literal('')]).optional(),
    bedroom: z.union([z.number(), z.literal('')]).optional(),
    floors: z.union([z.number(), z.literal('')]).optional(),
    age: z.union([z.number(), z.literal('')]).optional(),
    ageType: z.union([z.nativeEnum(AgeTypeEnum), z.literal('')]).optional(),
    price: z.object({
      value: z
        .number({
          invalid_type_error: t('errorMessages.shared.required', {
            field: t('shared.fields.price')
          })
        })
        .min(
          1,
          t('errorMessages.shared.required', {
            field: t('shared.fields.price')
          })
        ),
      currency: z.nativeEnum(CurrencyCode, {
        message: t('errorMessages.shared.required', {
          field: t('shared.fields.price')
        })
      }),
      duration: z.string().optional()
    })
  })

export const PROPERTY_MEDIA_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    media: MEDIA_SCHEMA(t)
  })

export const PROPERTY_FEATURES_FORM_SCHEMA = z.object({
  amenities: z
    .object({
      basic: z.array(z.string()).optional(),
      other: z.array(z.string()).optional()
    })
    .optional()
})

export const PROPERTY_VALIDATED_INFORMATION_FORM_SCHEMA = z.object({
  area: z
    .object({
      plot: z
        .number({
          invalid_type_error: 'Plot is required'
        })
        .optional(),
      builtIn: z
        .number({
          invalid_type_error: 'Built in is required'
        })
        .optional()
    })
    .optional(),
  developer: z.string().optional(),
  ownership: z
    .union([
      z.nativeEnum(OwnerShipEnum, {
        invalid_type_error: 'Ownership is required'
      }),
      z.literal('')
    ])
    .optional()
})

// Define the validation schema for the `permit` object
export const PROPERTY_REGULATORY_INFORMATION_FORM_SCHEMA = (t: TranslationFn) =>
  z.object({
    permit: z.object({
      number: z
        .string({
          invalid_type_error: t('errorMessages.shared.required', {
            field: t(
              'properties.propertyForm.regulatoryInformation.fields.dldPermitNumber'
            )
          })
        })
        .min(
          1,
          t('errorMessages.shared.required', {
            field: t(
              'properties.propertyForm.regulatoryInformation.fields.dldPermitNumber'
            )
          })
        ),
      DED: z.string().optional(),
      RERA: z.string().optional(),
      BRN: z
        .string({
          invalid_type_error: t('errorMessages.shared.required', {
            field: t('properties.propertyForm.regulatoryInformation.fields.brn')
          })
        })
        .min(
          1,
          t('errorMessages.shared.required', {
            field: t('properties.propertyForm.regulatoryInformation.fields.brn')
          })
        ),
      tarkheesi: z
        .instanceof(File, {
          message: 'Tarkheesi must be a valid file'
        })
        .nullable()
    }),
    isRegulated: z
      .boolean({
        required_error: t('errorMessages.shared.required', {
          field: t('properties.propertyForm.regulatoryInformation.agreement')
        })
      })
      .refine((data) => data, {
        message: t('errorMessages.shared.required', {
          field: t('properties.propertyForm.regulatoryInformation.agreement')
        })
      })
  })

export const PROPERTY_INFORMATION_FORM_SCHEMA_WITH_REFINE = (
  t: TranslationFn
) =>
  PROPERTY_INFORMATION_FORM_SCHEMA(t).superRefine((data, ctx) => {
    if (data.type === SaleTypeEnum.Rent && !data.price.duration) {
      ctx.addIssue({
        path: ['price', 'duration'],
        message: t(
          'errorMessages.buyPropertyRequests.propertyInformation.durationRequired'
        ),
        code: 'custom'
      })
    }
    if (data?.location?.country !== 'United Arab Emirates') {
      ctx.addIssue({
        path: ['location'],
        message: t(
          'errorMessages.buyPropertyRequests.propertyInformation.locationUAE'
        ),
        code: 'custom'
      })
    }
  })

export const PROPERTY_FORM_TRANSFORM_SCHEMA = (t: TranslationFn) =>
  PROPERTY_INFORMATION_FORM_SCHEMA(t)
    .merge(PROPERTY_MEDIA_FORM_SCHEMA(t))
    .merge(PROPERTY_FEATURES_FORM_SCHEMA)
    .merge(PROPERTY_VALIDATED_INFORMATION_FORM_SCHEMA)
    .merge(PROPERTY_REGULATORY_INFORMATION_FORM_SCHEMA(t))
    .transform((data) => {
      // Use object destructuring and spreading to clean up invalid fields
      const {
        furnished,
        toilets,
        living,
        bedroom,
        floors,
        age,
        ageType,
        developer,
        ownership,
        area,
        permit,
        isRegulated: _isRegulated,
        price,
        ...rest
      } = data

      // Remove empty string properties
      const cleanedData = {
        ...rest,
        price: {
          value: price.value,
          currency: price.currency,
          ...(price.duration && { duration: price.duration })
        },
        ...(furnished !== '' && { furnished }),
        ...(toilets !== '' &&
          typeof toilets === 'number' &&
          toilets > 0 && { toilets }),
        ...(living !== '' &&
          typeof living === 'number' &&
          living > 0 && { living }),
        ...(bedroom !== '' &&
          typeof bedroom === 'number' &&
          bedroom > 0 && { bedroom }),
        ...(floors !== '' &&
          typeof floors === 'number' &&
          floors > 0 && { floors }),
        ...(age !== '' && typeof age === 'number' && age > 0 && { age }),
        ...(ageType !== '' && { ageType }),
        ...(developer !== '' && { developer }),
        ...(ownership !== '' && { ownership }),
        ...(area && {
          area: {
            ...(area.plot !== undefined && { plot: area.plot }),
            ...(area.builtIn !== undefined && { builtIn: area.builtIn })
          }
        }),
        ...(permit && {
          permit: {
            ...(permit.DED !== '' && { DED: permit.DED }),
            ...(permit.RERA !== '' && { RERA: permit.RERA }),
            number: permit.number,
            BRN: permit.BRN,
            ...(permit.tarkheesi !== null && { tarkheesi: permit.tarkheesi })
          }
        })
      }

      return cleanedData as Omit<
        CreatePropertyRequestBody,
        'status' | 'media' | 'permit'
      >
    })
