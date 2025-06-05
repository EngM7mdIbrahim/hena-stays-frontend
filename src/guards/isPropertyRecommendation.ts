import {
  RecommendationTypeEnum,
  RecommendationTypeEnumType
} from '@commonTypes'

export function isPropertyRecommendation(
  recommendedId: string | undefined
): recommendedId is RecommendationTypeEnumType {
  return Object.values(RecommendationTypeEnum).includes(
    recommendedId as RecommendationTypeEnumType
  )
}
