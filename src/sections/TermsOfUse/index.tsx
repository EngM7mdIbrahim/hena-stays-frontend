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

function TermsOfUse() {
  const t = useTranslations()
  const list = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.termsOfUse'),
      link: navigationLinks.termsOfUse
    }
  ]
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={list} />
      <Text component='h1' className='text-[32px] font-bold'>
        {t('terms_of_use.title')}
      </Text>

      <Box>
        <Text className='mb-2 text-neutral-600'>
          {t('terms_of_use.effective_date_text')}:{' '}
          {t('terms_of_use.effective_date')}
        </Text>
        <Text className='mb-4'>
          {t.rich('terms_of_use.introduction.description', {
            link: (chunks) => (
              <LinkRenderer href='https://www.truedar.ae' chunks={chunks} />
            )
          })}
        </Text>
        <Text className='mb-4'>
          {t('terms_of_use.introduction.company_description')}
        </Text>

        <Text component='h2' className='mb-4 text-2xl font-semibold'>
          {t('terms_of_use.definitions.title')}
        </Text>
        <ul className='list-inside list-disc space-y-2'>
          <li>
            <Text component='strong'>
              1.1. {t('terms_of_use.definitions.terms.0.term')}
            </Text>{' '}
            {t.rich('terms_of_use.definitions.terms.0.definition', {
              link: (chunks) => (
                <LinkRenderer href='https://www.truedar.ae' chunks={chunks} />
              )
            })}
          </li>
          <li>
            <Text component='strong'>
              1.2. {t('terms_of_use.definitions.terms.1.term')}
            </Text>
            : {t('terms_of_use.definitions.terms.1.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.3. {t('terms_of_use.definitions.terms.2.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.2.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.4. {t('terms_of_use.definitions.terms.3.term')}
            </Text>
            : {t('terms_of_use.definitions.terms.3.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.5. {t('terms_of_use.definitions.terms.4.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.4.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.6. {t('terms_of_use.definitions.terms.5.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.5.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.7. {t('terms_of_use.definitions.terms.6.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.6.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.8. {t('terms_of_use.definitions.terms.7.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.7.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.9. {t('terms_of_use.definitions.terms.8.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.8.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.10. {t('terms_of_use.definitions.terms.9.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.9.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.11. {t('terms_of_use.definitions.terms.10.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.10.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.12. {t('terms_of_use.definitions.terms.11.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.11.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.13. {t('terms_of_use.definitions.terms.12.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.12.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.14. {t('terms_of_use.definitions.terms.13.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.13.definition')}
          </li>
          <li>
            <Text component='strong'>
              1.15. {t('terms_of_use.definitions.terms.14.term')}
            </Text>{' '}
            {t('terms_of_use.definitions.terms.14.definition')}
            <ul className='ml-4 list-inside list-disc space-y-2'>
              <li>{t('terms_of_use.definitions.terms.14.subcategories.0')}</li>
              <li>{t('terms_of_use.definitions.terms.14.subcategories.1')}</li>
              <li>{t('terms_of_use.definitions.terms.14.subcategories.2')}</li>
              <li>{t('terms_of_use.definitions.terms.14.subcategories.3')}</li>
            </ul>
          </li>
          <li>
            <Text component='strong'>
              1.16. "{t('terms_of_use.definitions.terms.15.term')}"
            </Text>{' '}
            {t('terms_of_use.definitions.terms.15.definition')}
          </li>
        </ul>

        <Text component='h2' className='mb-4 text-2xl font-bold'>
          {t('terms_of_use.general_terms.title')}
        </Text>

        {Array.from({ length: 15 }, (_, index) => (
          <Box key={`${index.toString()}general_terms`} className='mb-8'>
            <Text component='h3' className='mb-2 text-lg font-semibold'>
              {t(`terms_of_use.general_terms.sections.${index}.id`)}.{' '}
              {t(`terms_of_use.general_terms.sections.${index}.title`)}
            </Text>
            <Text className='mb-4'>
              {t.rich(`terms_of_use.general_terms.sections.${index}.content`, {
                link: (chunks) => (
                  <LinkRenderer href='https://www.truedar.ae' chunks={chunks} />
                )
              })}
            </Text>
          </Box>
        ))}

        <Text component='h2' className='mb-4 text-2xl font-bold'>
          {t('terms_of_use.restrictions.title')}
        </Text>

        {Array.from({ length: 18 }, (_, index) => (
          <Box key={`${index.toString()}restrictions`} className='mb-8'>
            <Text component='h3' className='mb-2 text-lg font-semibold'>
              {t(`terms_of_use.restrictions.sections.${index}.id`)}.{' '}
              {t(`terms_of_use.restrictions.sections.${index}.title`)}
            </Text>
            <Text className='mb-4'>
              {t(`terms_of_use.restrictions.sections.${index}.content`)}
            </Text>
          </Box>
        ))}

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.paid_listing_slots.id')}.{' '}
            {t('terms_of_use.paid_listing_slots.title')}
          </Text>
          <Text className='mb-4'>
            {t('terms_of_use.paid_listing_slots.content')}
          </Text>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.publishing_agents.id')}.{' '}
            {t('terms_of_use.publishing_agents.title')}
          </Text>
          <Text className='mb-4'>
            {t('terms_of_use.publishing_agents.content')}
          </Text>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.anti_spam_policy.id')}.{' '}
            {t('terms_of_use.anti_spam_policy.title')}
          </Text>
          <Text className='mb-4'>
            {t('terms_of_use.anti_spam_policy.content')}
          </Text>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.limitation_of_liability.id')}.{' '}
            {t('terms_of_use.limitation_of_liability.title')}
          </Text>
          <Box className='mb-4'>
            {t('terms_of_use.limitation_of_liability.content')}
            <ol className='list-disc pl-6'>
              {Array.from({ length: 11 }, (_, index) => (
                <li key={`${index.toString()}limitation_of_liability`}>
                  {t(`terms_of_use.limitation_of_liability.items.${index}`)}
                </li>
              ))}
            </ol>
          </Box>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.remedies.id')}. {t('terms_of_use.remedies.title')}
          </Text>
          <Text className='mb-4'>{t('terms_of_use.remedies.content')}</Text>
          <ol className='mb-4 list-decimal pl-6'>
            {Array.from({ length: 3 }, (_, index) => (
              <li key={`${index.toString()}remedies`}>
                {t(`terms_of_use.remedies.items.${index}`)}
              </li>
            ))}
          </ol>
          <Text className='mb-4'>
            {t('terms_of_use.remedies.additional_content')}
          </Text>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.real_estate_categories.id')}.{' '}
            {t('terms_of_use.real_estate_categories.title')}
          </Text>

          {Array.from({ length: 5 }, (_, categoryIndex) => (
            <Box
              key={`${categoryIndex.toString()}real_estate_categories`}
              className='mb-4'
            >
              <Text component='h4' className='mb-2 text-base font-semibold'>
                {t(
                  `terms_of_use.real_estate_categories.categories.${categoryIndex}.id`
                )}
                .{' '}
                {t(
                  `terms_of_use.real_estate_categories.categories.${categoryIndex}.title`
                )}
              </Text>
              <ol className='mb-4 list-decimal pl-6'>
                {t
                  .raw(
                    `terms_of_use.real_estate_categories.categories.${categoryIndex}.requirements`
                  )
                  .map((requirement: string, reqIndex: number) => (
                    <li key={reqIndex}>{requirement}</li>
                  ))}
              </ol>
              {categoryIndex === 4 &&
                t.raw(
                  'terms_of_use.real_estate_categories.categories.4.additional_obligations'
                ) && (
                  <ul className='list-disc pl-6'>
                    {t
                      .raw(
                        'terms_of_use.real_estate_categories.categories.4.additional_obligations'
                      )
                      .map((obligation: string, obsIndex: number) => (
                        <li key={obsIndex}>{obligation}</li>
                      ))}
                  </ul>
                )}
            </Box>
          ))}
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.call_recording.id')}.{' '}
            {t('terms_of_use.call_recording.title')}
          </Text>
          <Text className='mb-4'>
            {t('terms_of_use.call_recording.content')}
          </Text>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.memberships.id')}.{' '}
            {t('terms_of_use.memberships.title')}
          </Text>
          <Text className='mb-4'>{t('terms_of_use.memberships.content')}</Text>
          <ul className='list-disc pl-6'>
            {t
              .raw('terms_of_use.memberships.terms')
              .map((term: string, termIndex: number) => (
                <li key={termIndex}>{term}</li>
              ))}
          </ul>
        </Box>

        <Box className='mb-8'>
          <Text component='h3' className='mb-2 text-lg font-semibold'>
            {t('terms_of_use.general_provisions.id')}.{' '}
            {t('terms_of_use.general_provisions.title')}
          </Text>
          <ol className='mb-4 list-decimal pl-6'>
            {Array.from({ length: 2 }, (_, index) => (
              <li
                key={`${index.toString()}general_provisions`}
                className='mb-4'
              >
                <Text component='h4' className='mb-2 text-base font-semibold'>
                  {t(`terms_of_use.general_provisions.sections.${index}.id`)}.
                </Text>
                <Text className='font-semibold'>
                  {t(
                    `terms_of_use.general_provisions.sections.${index}.content`
                  )}
                </Text>
              </li>
            ))}
          </ol>
        </Box>
      </Box>
    </Stack>
  )
}

export default TermsOfUse
