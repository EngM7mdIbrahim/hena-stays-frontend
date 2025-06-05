import { createFormContext } from '@mantine/form'

const [
  CompanySignupFormProvider,
  useCompanySignupFormContext,
  useCompanySignupForm
] = createFormContext()

export const CompanySignupFormContext = {
  CompanySignupFormProvider,
  useCompanySignupFormContext,
  useCompanySignupForm
}
