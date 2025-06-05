import * as z from 'zod'

export const LOCATION_SCHEMA = z.object({
  address: z.string().min(1, 'Address is required'),
  name: z.string().min(1, 'Location name is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().default(''),
  street: z.string().default(''),
  neighborhoods: z.string().default(''),
  city: z.string().min(1, 'City is required'),
  coordinates: z.array(z.number()).min(2, 'Coordinates are required')
})
