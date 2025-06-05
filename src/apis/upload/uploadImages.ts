import {
  FILES_ENDPOINTS,
  GENERAL_ENDPOINTS,
  UploadImageResponse
} from '@commonTypes'
import { axiosApi } from '@config'

export const uploadImages = async (data: FormData) => {
  const response = await axiosApi.post<UploadImageResponse>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.IMAGES}${FILES_ENDPOINTS.UPLOAD}`,
    data
  )
  return response.data
}
