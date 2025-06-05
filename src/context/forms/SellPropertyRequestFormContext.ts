import { createFormContext } from '@mantine/form'

const [
  SellPropertyRequestFormProvider,
  useSellPropertyRequestFormContext,
  useSellPropertyRequestForm
] = createFormContext()

export const SellPropertyRequestFormContext = {
  SellPropertyRequestFormProvider,
  useSellPropertyRequestFormContext,
  useSellPropertyRequestForm
}
