'use client'

import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { Box, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'

function LinkRenderer({
  href,
  chunks
}: {
  href: string
  chunks: React.ReactNode
}) {
  return (
    <a href={href} className='text-blue-500 underline'>
      {chunks}
    </a>
  )
}

function PrivacyPolicyPage() {
  const t = useTranslations()
  const list = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.privacyPolicy'),
      link: navigationLinks.privacyPolicy
    }
  ]
  return (
    <Stack className='gap-6 px-4 py-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={list} />

      <Text component='h1' className='mt-2 text-[32px] font-bold'>
        {t('privacy_policy.title')}
      </Text>

      <Box>
        <Text className='mb-2 text-xl font-semibold'>
          {t('terms_of_use.effective_date_text')}:{' '}
          {t('privacy_policy.effective_date')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.introduction.title')}
        </Text>
        <Box className='mb-4'>
          {t('privacy_policy.introduction.description')}
          <Image
            className='absolute end-0 top-[700px] hidden lg:block'
            src={navigationLinks.assets.privacyPolicy}
            width={400}
            height={400}
            alt='Privacy Policy'
          />
        </Box>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.definitions.title')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t
            .raw('privacy_policy.definitions.terms')
            .map(
              (term: { term: string; definition: string }, index: number) => (
                <li key={`${index.toString()}definitions`}>
                  <Text component='strong'>"{term.term}":</Text>{' '}
                  {term.definition}
                </li>
              )
            )}
        </ul>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.contact_information.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.contact_information.content')}{' '}
          <a
            className='text-blue-500 underline'
            href='mailto:privacy@truedar.ae'
          >
            privacy@truedar.ae
          </a>
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.data_collection.title')}
        </Text>
        <Text className='mb-2'>
          {t('privacy_policy.data_collection.description')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t
            .raw('privacy_policy.data_collection.data_types')
            .map((dataType: { type: string; details: string }) => (
              <li key={dataType.type}>
                <Text component='strong'>{dataType.type}:</Text>{' '}
                {dataType.details}
              </li>
            ))}
        </ul>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.third_party_data_sources.title')}
        </Text>
        <Text className='mb-2'>
          {t('privacy_policy.third_party_data_sources.description')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t
            .raw('privacy_policy.third_party_data_sources.sources')
            .map((source: { source: string; details: string }) => (
              <li key={source.source}>
                <Text component='strong'>{source.source}:</Text>{' '}
                {source.details}
              </li>
            ))}
        </ul>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.usage_of_personal_data.title')}
        </Text>
        <Text className='mb-2'>
          {t('privacy_policy.usage_of_personal_data.description')}
        </Text>
        <ol className='mb-4 list-decimal pl-6'>
          {t
            .raw('privacy_policy.usage_of_personal_data.purposes')
            .map((purpose: string) => (
              <li key={purpose}>{purpose}</li>
            ))}
        </ol>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.sharing_personal_data.title')}
        </Text>
        <Text className='mb-2'>
          {t('privacy_policy.sharing_personal_data.description')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t
            .raw('privacy_policy.sharing_personal_data.recipients')
            .map((recipient: string) => (
              <li key={recipient}>{recipient}</li>
            ))}
        </ul>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.international_data_transfers.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.international_data_transfers.content')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.data_security.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.data_security.content')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.data_retention.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.data_retention.content')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.your_rights.title')}
        </Text>
        <Text className='mb-2'>
          {t('privacy_policy.your_rights.description')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t.raw('privacy_policy.your_rights.rights').map((right: string) => (
            <li key={right}>{right}</li>
          ))}
        </ul>
        <Text className='mb-4'>
          {t.rich('privacy_policy.your_rights.contact', {
            link: (chunks) => (
              <LinkRenderer href='mailto:privacy@truedar.ae' chunks={chunks} />
            )
          })}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.marketing_preferences.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.marketing_preferences.content')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.minors.title')}
        </Text>
        <Text className='mb-4'>{t('privacy_policy.minors.content')}</Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.third_party_links.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.third_party_links.content')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.policy_updates.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.policy_updates.content')}
        </Text>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.legal_basis_for_processing.title')}
        </Text>
        <Text className='mb-2'>
          {t('privacy_policy.legal_basis_for_processing.description')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t
            .raw('privacy_policy.legal_basis_for_processing.bases')
            .map((basis: string) => (
              <li key={basis}>{basis}</li>
            ))}
        </ul>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.user_responsibilities.title')}
        </Text>
        <ul className='mb-4 list-disc pl-6'>
          {t
            .raw('privacy_policy.user_responsibilities.responsibilities')
            .map((responsibility: string) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
        </ul>

        <Text component='h2' className='mb-2 mt-6 text-2xl font-bold'>
          {t('privacy_policy.contact_us.title')}
        </Text>
        <Text className='mb-4'>
          {t('privacy_policy.contact_us.content')}{' '}
          <a
            className='text-blue-500 underline'
            href='mailto:privacy@truedar.ae'
          >
            privacy@truedar.ae
          </a>
        </Text>
      </Box>
    </Stack>
  )
}

export default PrivacyPolicyPage
