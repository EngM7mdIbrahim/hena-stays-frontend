import React from 'react'
import { navigationLinks } from '@constants'
import { ActionIcon, Flex, Stack, Text } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { IoCopyOutline, IoShareOutline } from 'react-icons/io5'

import TextField from '@components/CustomFields/TextField'
import AppModal from '@components/Modals/AppModal'
import { appNotifications } from '@utils'

export interface ShareProps {
  linkToCopy: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ShareModal({ linkToCopy, open, setOpen }: ShareProps) {
  const locale = useLocale()
  const t = useTranslations()
  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy)
    appNotifications.info(t('shared.shareModal.notifications.copied'))
  }
  return (
    <AppModal
      size='lg'
      open={open}
      setOpen={setOpen}
      title={t('shared.shareModal.title')}
      trigger={
        <ActionIcon
          variant='default'
          className='rounded-full bg-default-background text-neutral-700'
          size='lg'
          aria-label={t('shared.shareModal.aria.shareButton')}
        >
          <IoShareOutline />
        </ActionIcon>
      }
    >
      <Stack>
        <TextField
          showOptional={false}
          readOnly
          value={linkToCopy}
          label={t('shared.shareModal.fields.copyLink')}
        
          rightSection={
            <IoCopyOutline
              className='cursor-pointer'
              onClick={handleCopyLink}
            />
          }
          
        />
        <Flex
          component='ul'
          className='mt-4 flex items-center justify-center gap-4'
        >
          <li>
            <Text
              component='a'
              href={navigationLinks.socialMediaShare.facebook(linkToCopy)}
              title={t('shared.shareModal.socialMedia.facebook')}
              variant='link'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebook size={35} color='#1877f2' />
            </Text>
          </li>
          <li>
            <Text
              component='a'
              href={navigationLinks.socialMediaShare.twitter(linkToCopy)}
              title={t('shared.shareModal.socialMedia.twitter')}
              variant='link'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaSquareXTwitter size={35} />
            </Text>
          </li>
          <li>
            <Text
              component='a'
              href={navigationLinks.socialMediaShare.instagram(linkToCopy)}
              title={t('shared.shareModal.socialMedia.instagram')}
              variant='link'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram size={35} color='#f166b1' />
            </Text>
          </li>
          <li>
            <Text
              component='a'
              href={navigationLinks.socialMediaShare.linkedin(linkToCopy)}
              title={t('shared.shareModal.socialMedia.linkedin')}
              variant='link'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin size={35} color='#0072b1' />
            </Text>
          </li>
        </Flex>
      </Stack>
    </AppModal>
  )
}

export default ShareModal
