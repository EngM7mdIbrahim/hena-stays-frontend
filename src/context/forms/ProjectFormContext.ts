import { createFormContext } from '@mantine/form'

const [ProjectFormProvider, useProjectFormContext, useProjectForm] =
  createFormContext()

export const ProjectFormContext = {
  ProjectFormProvider,
  useProjectFormContext,
  useProjectForm
}
