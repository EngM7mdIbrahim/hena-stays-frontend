import { deleteProject } from '@apis'
import { DeleteProjectRequestParams, DeleteProjectResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type DeleteProjectMutationOptions = UseMutationOptions<
  DeleteProjectResponse,
  ShowError,
  DeleteProjectRequestParams,
  unknown
>

export const useDeleteProject = (options?: DeleteProjectMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteProjectRequestParams) => deleteProject(params),
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
