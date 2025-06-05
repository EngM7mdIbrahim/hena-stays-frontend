import Link from 'next/link'
import { navigationLinks } from '@constants'
import { Box, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations()
  return (
    <Stack className='h-screen items-center justify-center'>
      <Box className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <Stack className='mx-auto max-w-screen-sm gap-4 text-center'>
          <Text
            component='h1'
            className='mb-4 text-7xl font-extrabold text-neutral-700 lg:text-9xl'
          >
            404
          </Text>
          <Text className='text-3xl font-bold text-neutral-500 md:text-4xl'>
            {t('notFound.title')}
          </Text>
          <Text className='text-lg text-neutral-500'>
            {t('notFound.description')}
          </Text>

          <ul className='flex w-full flex-col items-center justify-between gap-4 rounded-2xl bg-secondary px-[1.5rem] py-[0.8rem] capitalize text-white md:mx-auto md:w-[75%] md:flex-row'>
            <li>
              <Link
                className='hover:text-primary'
                href={navigationLinks.landingPage}
              >
                {t('navigation.home')}
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-primary'
                href={navigationLinks.news.allNews}
              >
                {t('navigation.news')}
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-primary'
                href={navigationLinks.properties.allProperties}
              >
                {t('navigation.properties')}
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-primary'
                href={navigationLinks.community.allPosts}
              >
                {t('navigation.community')}
              </Link>
            </li>
          </ul>
        </Stack>
      </Box>
    </Stack>
  )
}
