'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreateCreditResponse, CurrencyCode, MediaTypeEnum } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { useLinkConstructor } from '@hooks'
import { Box, Stack, Text } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { CiBank, CiCreditCard1 } from 'react-icons/ci'

import {
  useCreateCreditsRequest,
  useCreateCreditsWithCard,
  useUploadImages
} from '@hooks/query'
import AppModal from '@components/Modals/AppModal'
import {
  appNotifications,
  cn,
  formatNumberToShortForm,
  uploadImage
} from '@utils'

import BankTransfer from './BankTransfer'
import PaymentOptionsSelection from './PaymentOptionsSelection'

export interface SubscriptionSectionProps {
  className?: string
}

function SubscriptionSection({ className }: SubscriptionSectionProps) {
  const t = useTranslations()
  const locale = useLocale()
  const paymentOptions = [
    {
      label: t('checkout.paymentMethod.card'),
      value: 'card',
      icon: CiCreditCard1
    },
    {
      label: t('checkout.paymentMethod.bankTransfer'),
      value: 'bank',
      icon: CiBank
    }
  ]
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null)

  const [showBankTransfer, setShowBankTransfer] = useState(false)

  const [openSuccessModal, setOpenSuccessModal] = useState<
    CreateCreditResponse['creditsRequest'] | null
  >(null)

  const searchParams = useSearchParams()

  const returnUrl =
    searchParams.get(SEARCH_PARAM_KEYS.RETURN_URL_KEY) ||
    `${window.location.origin}${navigationLinks.subscription.checkoutCallback}`

  const credits = searchParams.get(SEARCH_PARAM_KEYS.CREDITS_KEY)

  const toggleSelection = (method: string) => {
    if (selectedPaymentMethod === method) {
      setSelectedPaymentMethod(null)
    } else {
      setSelectedPaymentMethod(method)
    }
  }

  const { mutate: createCreditsWithCard, isPending: isCreatingCredits } =
    useCreateCreditsWithCard({
      onSuccess: ({ url }) => {
        appNotifications.success(t('checkout.success.title'))
        router.push(url)
      }
    })

  const {
    mutate: createCreditsWithBank,
    isPending: isCreatingCreditsWithBank
  } = useCreateCreditsRequest({
    onSuccess: ({ creditsRequest }) => {
      appNotifications.success(t('checkout.success.title'))
      setOpenSuccessModal(creditsRequest)
    }
  })

  const handlePaymentWithCard = () => {
    if (!credits) {
      appNotifications.error(t('checkout.error.goToPremium'))
      return
    }
    createCreditsWithCard({
      credits: +credits,
      returnUrl: decodeURIComponent(returnUrl)
    })
  }

  const handleNext = () => {
    if (selectedPaymentMethod === 'card') {
      handlePaymentWithCard()
    } else if (selectedPaymentMethod === 'bank') {
      setShowBankTransfer(true)
    } else {
      appNotifications.error(t('checkout.error.selectPaymentMethod'))
    }
  }

  const { mutateAsync: uploadImages, isPending: isUploadingImages } =
    useUploadImages()

  const handlePaymentWithBank = async () => {
    if (!credits) {
      appNotifications.error(t('checkout.error.goToPremium'))
      return
    }
    if (!selectedFile) {
      appNotifications.error(t('checkout.error.selectImageOrPdf'))
      return
    }
    let fileUrl = ''
    if (selectedFile) {
      fileUrl = await uploadImage(selectedFile, uploadImages)
      if (!fileUrl) {
        appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
        return
      }
    }
    if (fileUrl) {
      createCreditsWithBank({
        media: {
          url: fileUrl,
          type: selectedFile.type.startsWith(MediaTypeEnum.Image)
            ? MediaTypeEnum.Image
            : 'pdf'
        },
        credits: +credits
      })
    }
  }

  let content = null

  if (showBankTransfer) {
    content = (
      <BankTransfer
        file={selectedFile}
        onFileChange={setSelectedFile}
        onSubmit={handlePaymentWithBank}
        credits={credits ? +credits : 0}
        onPaymentVisa={handlePaymentWithCard}
        isBankCreating={isCreatingCreditsWithBank || isUploadingImages}
      />
    )
  } else {
    content = (
      <PaymentOptionsSelection
        options={paymentOptions}
        selectedValue={selectedPaymentMethod}
        onSelectedValueChange={toggleSelection}
        handleNext={handleNext}
        isBuying={isCreatingCredits}
      />
    )
  }

  return (
    <Box className={cn('font-lexend', className)}>
      {openSuccessModal && (
        <AppModal
          open={!!openSuccessModal}
          setOpen={() => {
            setOpenSuccessModal(null)
            router.push(
              constructLink(navigationLinks.subscription.checkoutCallback, {
                [SEARCH_PARAM_KEYS.SUCCESS_KEY]: 'true',
                [SEARCH_PARAM_KEYS.PAYMENT_METHOD_KEY]: 'bank'
              })
            )
          }}
          title={t('checkout.success.title')}
        >
          <Stack className='gap-2 text-center'>
            <Stack className='gap-1 text-sm'>
              <Text>
                <strong>{t('checkout.success.credits')}:</strong>{' '}
                {openSuccessModal?.credits}
              </Text>
              <Text>
                <strong>{t('checkout.success.fees')}:</strong>{' '}
                {CurrencyCode.Aed}{' '}
                {formatNumberToShortForm(openSuccessModal?.fees ?? 0)}
              </Text>
              <Text>
                <strong>{t('checkout.success.taxes')}:</strong>{' '}
                {CurrencyCode.Aed}{' '}
                {formatNumberToShortForm(openSuccessModal?.taxes ?? 0)}
              </Text>
              <Text>
                <strong>{t('checkout.success.total')}:</strong>{' '}
                {CurrencyCode.Aed}{' '}
                {formatNumberToShortForm(openSuccessModal?.total ?? 0)}
              </Text>
            </Stack>
          </Stack>
        </AppModal>
      )}
      {showBankTransfer && (
        <Box
          className='-ml-2 mb-4 cursor-pointer'
          title='back'
          onClick={() => setShowBankTransfer(false)}
        >
          {locale.startsWith('ar') ? (
            <BsChevronRight className='h-6 w-6 font-semibold text-neutral-500' />
          ) : (
            <BsChevronLeft className='h-6 w-6 font-semibold text-neutral-500' />
          )}
        </Box>
      )}
      {content}

      <Text
        className={cn(
          'text-center text-sm text-neutral-500',
          showBankTransfer ? 'mt-4' : 'mt-10'
        )}
      >
        {t('checkout.terms')}
      </Text>
    </Box>
  )
}

export default SubscriptionSection
