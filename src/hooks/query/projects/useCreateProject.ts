import { createProject } from '@apis'
import { CreateProjectRequestBody, CreateProjectResponse } from '@commonTypes'
import { QUERY_KEYS } from '@constants'
import {
  useMutation,
  UseMutationOptions,
  useQueryClient
} from '@tanstack/react-query'

import { ShowError } from '@interfaces'
import { getError } from '@utils'

type CreateProjectMutationOptions = UseMutationOptions<
  CreateProjectResponse,
  ShowError,
  CreateProjectRequestBody,
  unknown
>

export const useCreateProject = (options?: CreateProjectMutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProjectRequestBody) => createProject(data),
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
