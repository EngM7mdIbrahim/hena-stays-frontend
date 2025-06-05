import { notFound } from 'next/navigation'
import { getUserCommunityProfile } from '@apis'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import ProfileSection from '@sections/Community/Profile'
import { Person } from 'schema-dts'

import HeadScript from '@components/HeadScript'
import { safeFetch } from '@utils'

export interface ProfilePageProps {
  params: { profileId: string }
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const id = params.profileId
  const { success, data } = await safeFetch(getUserCommunityProfile, [{ id }])
  if (!success) {
    return {
      title: 'User not found'
    }
  }
  const { user } = data
  return {
    title: `${user?.name} | TrueDar`
  }
}

async function ProfilePage({ params }: ProfilePageProps) {
  const { success, data } = await safeFetch(getUserCommunityProfile, [
    { id: params.profileId }
  ])
  if (!success) {
    return notFound()
  }
  const { user } = data
  const jsonLd: Person & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': user?.name,
    'url': navigationLinks.community.profile(params.profileId),
    'image': user?.image || '',
    'jobTitle': user?.role,
    'telephone': user?.phone,
    'email': `mailto:${user?.email}`
  }

  return (
    <Stack className='px-8'>
      <HeadScript id='json-ld' content={jsonLd} />

      <ProfileSection params={params} />
    </Stack>
  )
}

export default ProfilePage
