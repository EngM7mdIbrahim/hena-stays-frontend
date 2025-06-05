import { ShowError } from '@interfaces'

import { getError } from './getError'

export async function uploadImage(
  file: File,
  uploadFunction: (formData: FormData) => Promise<any>
) {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await uploadFunction(formData)
    return response.url
  } catch (error) {
    getError(error as ShowError)
  }
  return null
}
