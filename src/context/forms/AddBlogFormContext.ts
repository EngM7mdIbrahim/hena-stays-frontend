import { createFormContext } from '@mantine/form'

const [BlogFormProvider, useBlogFormContext, useBlogForm] = createFormContext()

export const BlogFormContext = {
  BlogFormProvider,
  useBlogFormContext,
  useBlogForm
}
