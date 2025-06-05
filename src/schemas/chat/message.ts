import { z } from 'zod'

export const MESSAGE_SCHEMA = z
  .object({
    text: z.string().trim().default(''),
    media: z.array(z.instanceof(File)).default([])
  })
  .refine(
    (data) => (data.text?.length ?? 0) > 0 || data.media.length > 0,
    'Either message text or media is required'
  )
