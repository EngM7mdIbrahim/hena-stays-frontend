import { useUploadImages } from '@hooks/query'
import { appNotifications, uploadImage } from '@utils'

export function useUploadImageAuth() {
  const uploadImages = useUploadImages()

  const onImageUpload = async (
    licenseCopies: File[],
    watermark?: File | null
  ): Promise<{ licenseCopies?: string[]; watermark?: string }> => {
    if (
      // in case of edit and not edited images
      licenseCopies.every((image) =>
        image.name.includes('storage.googleapis.com')
      ) &&
      (!watermark || watermark.name.includes('storage.googleapis.com'))
    ) {
      return {
        licenseCopies: licenseCopies.map((image) => image.name),
        watermark: watermark?.name
      }
    }
    const licenseCopiesUrls = await Promise.all(
      licenseCopies.map((image) => uploadImage(image, uploadImages.mutateAsync))
    )

    if (licenseCopiesUrls.some((item) => !item)) {
      appNotifications.error('Failed to upload license copies')
      return {}
    }

    let watermarkUrl: string | null = null

    if (watermark) {
      watermarkUrl = await uploadImage(watermark, uploadImages.mutateAsync)
      if (!watermarkUrl) {
        appNotifications.error('Failed to upload watermark')
        return {}
      }
    }

    return {
      licenseCopies: licenseCopiesUrls,
      ...(watermarkUrl && { watermark: watermarkUrl })
    }
  }

  return { onImageUpload }
}
