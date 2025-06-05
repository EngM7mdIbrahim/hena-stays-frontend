import { uploadImages } from '@apis'
import { UploadImageBody, UploadImageResponse } from '@commonTypes'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { ShowError } from '@interfaces'

type UseUploadImagesOptions = UseMutationOptions<
  UploadImageResponse,
  ShowError,
  UploadImageBody
>

export const useUploadImages = (options?: UseUploadImagesOptions) => {
  return useMutation<UploadImageResponse, ShowError, FormData>({
    ...options,
    mutationFn: (data: UploadImageBody) => {
      return uploadImages(data)
    }
  })
}
