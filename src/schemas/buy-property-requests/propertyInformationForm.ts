import {
  CompletionEnum,
  CurrencyCode,
  FurnishedEnum,
  PropertyStatusEnum,
  RentDurationEnum,
  SaleTypeEnum
} from '@commonTypes'
import { LOCATION_SCHEMA } from '@schemas/common'
import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const BUY_PROPERTY_INFORMATION_FORM_SCHEMA = (t: TranslationFn) =>
  z
    .object({
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
      furnished: z.array(z.nativeEnum(FurnishedEnum)).optional(),
      amenities: z.array(z.string()).optional(),
      price: z.object({
        value: z

          .array(
            z.coerce
              .number()
              .min(
                0,
                t(
                  'errorMessages.buyPropertyRequests.propertyInformation.priceNonNegative'
                )
              )
          )

          .refine((value) => value[0] <= value[1], {
            message: t(
              'errorMessages.buyPropertyRequests.propertyInformation.priceEndGreater'
            )
          }),
        currency: z
          .nativeEnum(CurrencyCode, {
            message: 'Currency is required'
          })
          .default(CurrencyCode.Aed),
        duration: z
          .union([z.nativeEnum(RentDurationEnum), z.literal('')])
          .optional()
          .nullable()
      }),

      area: z
        .array(
          z.coerce
            .number()
            .min(
              0,
              t(
                'errorMessages.buyPropertyRequests.propertyInformation.areaNonNegative'
              )
            )
            .optional()
        )
        .default([0, 0])
        .refine(
          (value) => {
            if (value == null || value[0] == null || value[1] == null) {
              return true
            }
            return value[0] <= value[1]
          },
          {
            message: t(
              'errorMessages.buyPropertyRequests.propertyInformation.endAreaGreater'
            )
          }
        ),
      age: z
        .array(
          z.coerce
            .number()
            .min(
              0,
              t(
                'errorMessages.buyPropertyRequests.propertyInformation.ageNonNegative'
              )
            )
            .optional()
        )
        .default([0, 0])
        .refine(
          (value) => {
            if (value == null || value[0] == null || value[1] == null) {
              return true
            }
            return value[0] <= value[1]
          },
          {
            message: t(
              'errorMessages.buyPropertyRequests.propertyInformation.endAgeGreater'
            )
          }
        ),
      living: z
        .array(
          z.coerce
            .number()
            .min(
              0,
              t(
                'errorMessages.buyPropertyRequests.propertyInformation.livingNonNegative'
              )
            )
            .optional()
        )
        .default([0, 0])
        .refine(
          (value) => {
            if (value == null || value[0] == null || value[1] == null) {
              return true
            }
            return value[0] <= value[1]
          },
          {
            message: t(
              'errorMessages.buyPropertyRequests.propertyInformation.endLivingGreater'
            )
          }
        ),

      toilets: z
        .array(
          z.coerce
            .number()
            .min(
              0,
              t(
                'errorMessages.buyPropertyRequests.propertyInformation.toiletsNonNegative'
              )
            )
            .optional()
        )
        .default([0, 0])
        .refine(
          (value) => {
            if (value == null || value[0] == null || value[1] == null) {
              return true
            }
            return value[0] <= value[1]
          },
          {
            message: t(
              'errorMessages.buyPropertyRequests.propertyInformation.endToiletsGreater'
            )
          }
        ),
      bedroom: z
        .array(
          z.coerce
            .number()
            .min(
              0,
              t(
                'errorMessages.buyPropertyRequests.propertyInformation.bedroomsNonNegative'
              )
            )
            .optional()
        )
        .default([0, 0])
        .refine(
          (value) => {
            if (value == null || value[0] == null || value[1] == null) {
              return true
            }
            return value[0] <= value[1]
          },
          {
            message: t(
              'errorMessages.buyPropertyRequests.propertyInformation.endBedroomsGreater'
            )
          }
        )
    })
    .superRefine((data, ctx) => {
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
    .transform((data) => {
      const {
        furnished,
        price,
        area,
        age,
        living,
        toilets,
        bedroom,
        amenities,
        ...rest
      } = data

      // Clean up the data by only including non-empty values
      const cleanedData = {
        ...rest,
        status: PropertyStatusEnum.Active, // Required from BaseProperty
        ...(furnished && furnished.length > 0 && { furnished }),

        price: {
          ...(price.duration && { duration: price.duration }),
          from: price.value[0],
          to: price.value[1],
          currency: price.currency
        },
        ...(area &&
          area[0] &&
          area[1] && { area: { from: area[0], to: area[1] } }),
        ...(age && age[0] && age[1] && { age: { from: age[0], to: age[1] } }),
        ...(living &&
          living[0] &&
          living[1] && { living: { from: living[0], to: living[1] } }),
        ...(toilets &&
          toilets[0] &&
          toilets[1] && { toilets: { from: toilets[0], to: toilets[1] } }),
        ...(bedroom &&
          bedroom[0] &&
          bedroom[1] && { bedroom: { from: bedroom[0], to: bedroom[1] } }),
        ...(amenities &&
          amenities.length > 0 && {
            amenities: {
              basic: amenities,
              other: []
            }
          })
      }

      return cleanedData
    })
