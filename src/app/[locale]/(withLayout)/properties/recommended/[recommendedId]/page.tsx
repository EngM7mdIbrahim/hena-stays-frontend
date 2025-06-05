import React from 'react'
import { Stack } from '@mantine/core'
import RecommendedPropertiesSection from '@sections/Properties/RecommendedPropertiesSection'

interface RecommendedPropertiesPageProps {
  params: { recommendedId: string }
}

function RecommendedPropertiesPage({ params }: RecommendedPropertiesPageProps) {
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <RecommendedPropertiesSection recommendationType={params.recommendedId} />
    </Stack>
  )
}

export default RecommendedPropertiesPage
