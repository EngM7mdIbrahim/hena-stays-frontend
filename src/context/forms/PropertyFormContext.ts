import { createFormContext } from '@mantine/form'

const [PropertyFormProvider, usePropertyFormContext, usePropertyForm] =
  createFormContext()

export const PropertyFormContext = {
  PropertyFormProvider,
  usePropertyFormContext,
  usePropertyForm
}
