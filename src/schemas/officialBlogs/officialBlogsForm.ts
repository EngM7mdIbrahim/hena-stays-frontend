import * as z from 'zod'

import { TranslationFn } from '@interfaces'

export const OFFICIAL_BLOGS_FORM_SCHEMA = (t: TranslationFn) =>
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
    media: z.any().refine((val) => val !== null && val !== undefined, {
      message: t('errorMessages.shared.required', {
        field: t('properties.propertyForm.steps.propertyMedia')
      })
    }),
    altText: z.string().min(
      1,
      t('errorMessages.shared.required', {
        field: t('shared.editor.altText.altText')
      })
    ),
    content: z.string().min(
      20,
      t('errorMessages.shared.required', {
        field: t('community.blogPostForm.fields.content')
      })
    ),
    seo: z.object({
      title: z.string().min(
        1,
        t('errorMessages.shared.required', {
          field: `${t('officialBlogs.officialBlogForm.fields.seo.label')} ${t('officialBlogs.officialBlogForm.fields.seo.fields.title')}`
        })
      ),
      description: z.string().min(
        1,
        t('errorMessages.shared.required', {
          field: `${t('officialBlogs.officialBlogForm.fields.seo.label')} ${t('officialBlogs.officialBlogForm.fields.seo.fields.description')}`
        })
      ),
      keywords: z.array(z.string()).min(
        1,
        t('errorMessages.shared.required', {
          field: `${t('officialBlogs.officialBlogForm.fields.seo.label')} ${t('officialBlogs.officialBlogForm.fields.seo.fields.keywords')}`
        })
      )
    }),

    faq: z.array(
      z.object({
        question: z.string().optional(),
        answer: z.string().optional()
      })
    ),
    relatedBlogs: z.array(
      z.string().min(
        1,
        t('errorMessages.shared.required', {
          field: t('officialBlogs.officialBlogForm.fields.relatedBlogs')
        })
      )
    ),
    slug: z.string().min(
      1,
      t('errorMessages.shared.required', {
        field: t('officialBlogs.officialBlogForm.fields.permalink')
      })
    ),
    tableOfContents: z.string().default('[]'),
    scheduledAt: z
      .date()
      .nullable()
      .optional()
      .refine((val) => !val || val > new Date(), {
        message: t('errorMessages.officialBlogs.scheduledDateFuture')
      }),
    published: z.boolean().default(false)
  })
