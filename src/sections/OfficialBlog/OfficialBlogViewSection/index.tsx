'use client'

import React, { useMemo, useRef } from 'react'
import Image from 'next/image'
import { OfficialBlog } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useGetOfficialBlogBySlug } from '@hooks'
import { Badge, Box, Flex, Group, Stack, Text } from '@mantine/core'
import { LoadingBlogView } from '@sections/Community/BlogViewSection'
import DOMPurify from 'dompurify'
import { useTranslations } from 'next-intl'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

import TableOfContent from '@components/AppEditor/TableOfContent'
import Breadcrumb from '@components/Breadcrumb'
import Faq from '@components/Faq'
import FullScreenError from '@components/FullScreenError'
import { cn } from '@utils'

import MoreBlogsSection from '../MoreBlogsSection'

interface BlogSocialMediaProps {
  className?: string
}

function BlogSocialMedia({ className }: BlogSocialMediaProps) {
  return (
    <Group
      className={cn(
        'items-center justify-between gap-2 border-t py-4 text-neutral-500',
        className
      )}
    >
      <Flex className='items-center gap-4'>
        <a
          href={navigationLinks.socialMedia.facebook}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaFacebook size={20} className='text-default-text' />
        </a>

        <a
          href={navigationLinks.socialMedia.instagram}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInstagram size={20} className='text-default-text' />
        </a>
      </Flex>
    </Group>
  )
}

export interface OfficialBlogViewSectionProps {
  slug: string
  className?: string
}

function OfficialBlogViewSection({
  slug,
  className
}: OfficialBlogViewSectionProps) {
  const t = useTranslations()
  const { data, isLoading, isError, error } = useGetOfficialBlogBySlug({
    slug,
    showFields: {
      relatedBlogs: true
    }
  })
  const { officialBlog } = data || {}
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.officialBlogs'),
      link: navigationLinks.officialBlogs.allOfficialBlogs
    },
    {
      label: officialBlog?.title || t('shared.breadcrumb.blog'),
      link: navigationLinks.officialBlogs.viewOfficialBlog(slug)
    }
  ]
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const toc = useMemo(() => {
    try {
      return JSON.parse(officialBlog?.tableOfContents || '[]')
    } catch (tocError) {
      return []
    }
  }, [officialBlog?.tableOfContents])

  const sanitizedContent = DOMPurify.sanitize(officialBlog?.content || '')

  if (isLoading) {
    return <LoadingBlogView />
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <>
      <Breadcrumb list={breadCrumbList} />
      <Box className={className}>
        <Box className='relative mx-auto flex max-w-7xl gap-6 p-6'>
          <Flex className='flex-[4] flex-col gap-6'>
            {/* Header */}

            <Text
              component='h1'
              className='mb-4 text-3xl font-bold text-neutral-800'
            >
              {officialBlog?.title}
            </Text>

            {/* Image */}
            <Box className='relative self-center'>
              <Image
                width={400}
                height={400}
                src={officialBlog?.media?.url || ''}
                alt={officialBlog?.media?.alt || ''}
                className='h-auto max-h-[400px] min-h-52 rounded-md object-cover brightness-75'
              />
            </Box>
            <BlogSocialMedia />
            {/* Table of contents for mobile */}
            <TableOfContent
              className='block w-full md:hidden'
              scrollContainerRef={scrollContainerRef}
              items={toc}
            />
            {/* Content */}
            <div
              ref={scrollContainerRef}
              className='prose mt-8 max-w-full dark:prose-invert'
            >
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </div>
            {officialBlog?.faq && officialBlog?.faq?.length > 0 && (
              <Box className='mt-8 w-full px-6 pb-8 pt-10 ring-1 ring-neutral-900/5'>
                <Stack className='mx-auto mb-6 max-w-3xl gap-6 text-center'>
                  <Badge
                    color='yellow'
                    variant='light'
                    size='lg'
                    radius='xl'
                    className='self-center'
                  >
                    {t('sharedBlogView.faq')}
                  </Badge>
                  <Text
                    component='h2'
                    className='text-3xl font-bold md:text-4xl'
                  >
                    {t('sharedBlogView.faqTitle')}
                  </Text>
                </Stack>
                <Faq isOfficialBlog items={officialBlog?.faq} />
              </Box>
            )}
          </Flex>
          {/* Table of contents for desktop */}
          <TableOfContent
            className='bottom-10 hidden h-96 md:block'
            scrollContainerRef={scrollContainerRef}
            items={toc}
            style={{
              position: 'sticky'
            }}
          />
        </Box>
        <MoreBlogsSection
          className='mx-auto w-full max-w-7xl p-6'
          blogs={officialBlog?.relatedBlogs as OfficialBlog[]}
        />
        <BlogSocialMedia className='mx-auto w-full max-w-7xl px-6' />
      </Box>
    </>
  )
}

export default OfficialBlogViewSection
