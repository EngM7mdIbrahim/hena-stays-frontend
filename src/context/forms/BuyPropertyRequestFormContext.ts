import { createFormContext } from '@mantine/form'

const [
  BuyPropertyRequestFormProvider,
  useBuyPropertyRequestFormContext,
  useBuyPropertyRequestForm
] = createFormContext()

export const BuyPropertyRequestFormContext = {
  BuyPropertyRequestFormProvider,
  useBuyPropertyRequestFormContext,
  useBuyPropertyRequestForm
}
