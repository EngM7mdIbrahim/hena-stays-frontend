import { PostTypes } from '@enums'

export function isPostType(type: unknown): type is PostTypes {
  return Object.values(PostTypes).includes(type as PostTypes)
}
