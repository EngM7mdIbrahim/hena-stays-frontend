import { bulkUpdateRecommendations } from '@apis'
import {
  BulkUpdateRecommendationsRequestBody,
  BulkUpdateRecommendationsResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type BulkUpdateRecommendationsMutationOptions = UseMutationOptions<
  BulkUpdateRecommendationsResponse,
  ShowError,
  BulkUpdateRecommendationsRequestBody,
  unknown
>
export const useBulkUpdateRecommendations = (
  options?: BulkUpdateRecommendationsMutationOptions
) => {
  const queryClient = useQueryClient()

  return useMutation<
    BulkUpdateRecommendationsResponse,
    ShowError,
    BulkUpdateRecommendationsRequestBody
  >({
    ...options,
    mutationFn: (data: BulkUpdateRecommendationsRequestBody) => {
      return bulkUpdateRecommendations(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROPERTIES.PROPERTIES]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SUBSCRIPTIONS.MY_SUBSCRIPTION]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
