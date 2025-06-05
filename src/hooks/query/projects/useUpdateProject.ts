import { updateProject } from '@apis'
import {
  UpdateProjectRequestBody,
  UpdateProjectRequestParams,
  UpdateProjectResponse
} from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type UpdateProjectMutationOptions = UseMutationOptions<
  UpdateProjectResponse,
  ShowError,
  UpdateProjectRequestBody & UpdateProjectRequestParams,
  unknown
>
export const useUpdateProject = (options?: UpdateProjectMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateProjectResponse,
    ShowError,
    UpdateProjectRequestBody & UpdateProjectRequestParams
  >({
    ...options,
    mutationFn: (
      data: UpdateProjectRequestBody & UpdateProjectRequestParams
    ) => {
      return updateProject(data)
    },
    onSuccess(data, _variables, _context) {
      options?.onSuccess?.(data, _variables, _context)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROJECTS.PROJECTS]
      })
    },
    onError(err, _variables, _context) {
      getError(err)
      options?.onError?.(err, _variables, _context)
    }
  })
}
