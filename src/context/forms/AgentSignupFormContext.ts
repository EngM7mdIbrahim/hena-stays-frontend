import { createFormContext } from '@mantine/form'

const [AgentSignupFormProvider, useAgentSignupFormContext, useAgentSignupForm] =
  createFormContext()

export const AgentSignupFormContext = {
  AgentSignupFormProvider,
  useAgentSignupFormContext,
  useAgentSignupForm
}
