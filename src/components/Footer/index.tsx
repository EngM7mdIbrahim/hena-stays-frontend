import Image from 'next/image'
import Link from 'next/link'
import { navigationLinks } from '@constants'
import { Box, Flex, Text, TextInput } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { BiPhone } from 'react-icons/bi'
import { CiMail } from 'react-icons/ci'
import {
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Box className='w-full border-t px-6 pb-12'>
      <Flex className='w-full flex-col items-start justify-between gap-4 md:flex-row'>
        {/* Logo and Slogan */}
        <Box>
          <Flex className='mb-4'>
            <Flex className='items-center rounded-b-xl bg-secondary p-6 pt-12'>
              <Image
                src={navigationLinks.assets.logo}
                width={100}
                height={100}
                alt='Logo'
              />
            </Flex>
          </Flex>
          <Text component='p' className='text-neutral-500'>
            {t('footer.drivenByPurpose')} <br />
            {t('footer.shapingFutures')}
          </Text>
          <Flex component='ul' className='mt-4 flex items-center gap-4'>
            <li>
              <Text
                component='a'
                href={navigationLinks.socialMedia.facebook}
                title={t('footer.socialMedia.facebook')}
                variant='link'
                target='_blank'
              >
                <FaFacebook size={26} color='#1877f2' />
              </Text>
            </li>
            <li>
              <Text
                component='a'
                href={navigationLinks.socialMedia.twitter}
                title={t('footer.socialMedia.twitter')}
                variant='link'
                target='_blank'
              >
                <FaSquareXTwitter size={26} />
              </Text>
            </li>
            <li>
              <Text
                component='a'
                href={navigationLinks.socialMedia.instagram}
                title={t('footer.socialMedia.instagram')}
                variant='link'
                target='_blank'
              >
                <FaInstagram size={26} color='#f166b1' />
              </Text>
            </li>
            <li>
              <Text
                component='a'
                href={navigationLinks.socialMedia.linkedin}
                title={t('footer.socialMedia.linkedin')}
                variant='link'
                target='_blank'
              >
                <FaLinkedin size={26} color='#0072b1' />
              </Text>
            </li>
          </Flex>
          <Text component='p' className='mt-4 text-sm text-neutral-500'>
            {t('footer.allCopyrighted')}
          </Text>
        </Box>

        <Flex className='mt-12 flex w-full flex-col justify-between gap-4 md:w-[70%] md:flex-row'>
          {/* Links Section */}
          <Box>
            <Text component='h3' className='text-lg font-semibold'>
              {t('footer.ourCompany')}
            </Text>
            <Box component='ul' className='mt-4 space-y-2'>
              <li>
                <Text
                  component={Link}
                  href={
                    navigationLinks.buyPropertyRequests.allBuyPropertyRequests
                  }
                >
                  {t('navigation.propertyRequests')}
                </Text>
              </li>
              <li>
                <Text component={Link} href={navigationLinks.about}>
                  {t('navigation.about')}
                </Text>
              </li>
              <li>
                <Text
                  component={Link}
                  href={navigationLinks.properties.allProperties}
                >
                  {t('navigation.properties')}
                </Text>
              </li>
              <li>
                <Text
                  component={Link}
                  href={navigationLinks.community.allPosts}
                >
                  {t('navigation.community')}
                </Text>
              </li>
              <li>
                <Text component={Link} href={navigationLinks.privacyPolicy}>
                  {t('navigation.privacyPolicy')}
                </Text>
              </li>
              <li>
                <Text component={Link} href={navigationLinks.termsOfUse}>
                  {t('navigation.termsOfUse')}
                </Text>
              </li>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Text component='h3' className='text-lg font-semibold'>
              {t('footer.contact')}
            </Text>
            <Box className='mt-4 space-y-2'>
              <Flex className='items-center justify-start'>
                <BiPhone size={20} className='mr-2 text-neutral-500' />
                <Text component='a' href='tel:+971 52 693 1043'>
                  +971 52 693 1043
                </Text>
              </Flex>
              <Flex className='items-center justify-start'>
                <CiMail size={20} className='mr-2 text-neutral-500' />
                <Text component='a' href='mailto:info@truedar.ae'>
                  info@truedar.ae
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* Subscribe Section */}
          <Box className='md:w-[40%]'>
            <Text component='h3' className='text-lg font-semibold'>
              {t('footer.subscribe.title')}
            </Text>
            <Text component='p' className='mt-2 text-neutral-500'>
              {t('footer.subscribe.description')}
            </Text>
            <Flex component='form' className='mt-4'>
              <TextInput
                placeholder={t('shared.placeholders.email')}
                className='flex-1 overflow-hidden'
                size='md'
                radius={10}
                rightSection={
                  <Flex className='h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[6px] bg-primary-gradient text-white'>
                    {locale === 'en' ? (
                      <FaArrowRight size={16} />
                    ) : (
                      <FaArrowLeft size={16} />
                    )}
                  </Flex>
                }
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
