import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  AddPropertyXMLResponse,
  GetXmlPropertyResponse,
  Property,
  XMLAgent
} from '@commonTypes'
import { navigationLinks } from '@constants'
import { usePublishXml } from '@hooks'
import { Badge, Box, Button, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import EmptyWrapper from '@components/EmptyWrapper'
import ItemsWrapper from '@components/ItemWrapper'
import LottieArrowBottom from '@components/Lotties/LottieArrowBottom'
import LottieSuccess from '@components/Lotties/LottieSuccess'
import AppModal from '@components/Modals/AppModal'
import PropertyCard from '@components/PropertyCard'
import PropertyIssuesModal from '@components/Xml/PropertyIssuesModal'
import PropertyViewModal from '@components/Xml/PropertyViewModal'
import XmlAgent from '@components/Xml/XmlAgent'
import { cn } from '@utils'

function Arrow({
  finishButtonRef
}: {
  finishButtonRef: React.RefObject<HTMLDivElement>
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (finishButtonRef.current) {
        const rect = finishButtonRef.current.getBoundingClientRect()
        // Check if the button is in viewport (specifically in the bottom portion)
        const isButtonVisible = rect.bottom <= window.innerHeight
        setIsVisible(!isButtonVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [finishButtonRef])

  const scrollToElement = () => {
    window.scrollBy({
      top: 500,
      behavior: 'smooth'
    })
  }

  return isVisible ? (
    <Box
      onClick={scrollToElement}
      className='fixed bottom-[10px] start-[calc(50%-30px)] z-[999] flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#fff9] shadow-2xl hover:bg-white'
    >
      <LottieArrowBottom />
    </Box>
  ) : null
}

export interface AgentsXmlProps {
  data: AddPropertyXMLResponse | GetXmlPropertyResponse
  setData?: React.Dispatch<React.SetStateAction<AddPropertyXMLResponse>>
}

function AgentsXml({ data, setData = () => {} }: AgentsXmlProps) {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const finishButtonRef = useRef(null)
  const [property, setProperty] = useState<Property | null>(null)
  const [issues, setIssues] = useState<string[]>([])
  const [openConfirmation, setOpenConfirmation] = useState<{
    content: React.ReactNode | string
  } | null>(null)
  const [successBody, setIsSuccess] = useState<{ body: ReactNode } | null>(null)

  const totalApprovalIssues = useMemo(() => {
    return (
      data?.agents?.reduce((sum: number, agent: XMLAgent) => {
        return sum + (agent?.approvalIssues?.length || 0)
      }, 0) || 0
    )
  }, [data])

  const publishXml = usePublishXml({
    onSuccess: ({ message }) => {
      if (totalApprovalIssues > 0) {
        setIsSuccess({
          body: (
            <div className='flex flex-col gap-2 text-left text-base'>
              {t('xml.agents.publishSuccess.withIssues')}
              <br />
              <ul className='list-disc pl-6 text-secondary'>
                <li>{t('xml.agents.publishSuccess.publishedWithoutIssues')}</li>
                <li>{t('xml.agents.publishSuccess.submittedForReview')}</li>
              </ul>
            </div>
          )
        })
      } else {
        setIsSuccess({ body: message })
      }
    }
  })

  const handlePublish = () => {
    publishXml.mutate({
      id: (data as AddPropertyXMLResponse)?.id
    })
  }

  const onPublish = () => {
    if (totalApprovalIssues > 0) {
      setOpenConfirmation({
        content: t('xml.agents.publishConfirmation', {
          count: totalApprovalIssues
        })
      })
    } else handlePublish()
  }

  return (
    <Stack className='items-center justify-center gap-8'>
      <AppModal
        open={!!openConfirmation}
        setOpen={() => setOpenConfirmation(null)}
        title={t('shared.deleteModal.title')}
      >
        <Stack>
          {openConfirmation?.content}
          <Group>
            <Button
              onClick={() => setOpenConfirmation(null)}
              type='button'
              variant='light'
              color='gray'
              className='w-full rounded-lg font-semibold text-primary md:flex-1'
              size='lg'
            >
              {t('xml.buttons.reset')}
            </Button>
            <PrimaryButton
              onClick={handlePublish}
              type='button'
              size='lg'
              className='w-full rounded-lg font-semibold text-secondary md:flex-1'
            >
              {t('xml.buttons.accept')}
            </PrimaryButton>
          </Group>
        </Stack>
      </AppModal>
      <AppModal
        open={!!successBody}
        setOpen={() => setIsSuccess(null)}
        title={t('xml.agents.publishSuccess.title')}
      >
        <Stack className='items-center justify-center gap-4'>
          <LottieSuccess />
          <Box>{successBody?.body}</Box>
          <PrimaryButton
            onClick={() => {
              setIsSuccess(null)
              router.push(navigationLinks.properties.myListings)
            }}
            type='button'
            size='lg'
            className='w-full rounded-lg font-semibold text-secondary md:flex-1'
          >
            {t('xml.buttons.close')}
          </PrimaryButton>
        </Stack>
      </AppModal>
      <PropertyViewModal property={property} setProperty={setProperty} />
      <PropertyIssuesModal issues={issues} setIssues={setIssues} />

      {data?.agents?.length > 0 &&
        data?.agents?.map((agent, index: number) => (
          <Stack className='gap-5' key={`${agent?.name}-${agent?.email}`}>
            <Group className='items-center justify-between'>
              <XmlAgent
                agent={agent}
                dataId={(data as AddPropertyXMLResponse)?.id}
                setData={setData}
              />
              {agent?.approvalIssues && agent?.approvalIssues?.length > 0 && (
                <button
                  type='button'
                  onClick={() => setIssues(agent?.approvalIssues || [])}
                  className='w-fit'
                >
                  {t('xml.agents.needsAdminApproval')}:{' '}
                  <Text
                    component='span'
                    className='font-bold text-error-500 underline hover:no-underline'
                  >
                    {t('xml.agents.viewAll')}
                  </Text>
                </button>
              )}
            </Group>
            <ItemsWrapper
              loading={false}
              className='my-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'
              LoadingComponent={null}
              EmptyComponent={
                <EmptyWrapper
                  description={t('shared.emptyDescription', {
                    itemName: t('properties.title')
                  })}
                />
              }
            >
              {data?.agents[index]?.properties?.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box key={`${item?.title}-${i}`}>
                  <PropertyCard
                    showAdditionalFeatures={false}
                    showAgent={false}
                    onClick={() => setProperty(item as Property)}
                    className={cn(
                      !item?.isEligible
                        ? 'border-error-500'
                        : 'border-success-500'
                    )}
                    topLeftComponent={
                      <Box>
                        {!item?.isEligible ? (
                          <Badge
                            pos='absolute'
                            className='absolute end-1 top-1 bg-orange-400/70 text-secondary'
                          >
                            {t('xml.agents.warning')}
                          </Badge>
                        ) : null}
                      </Box>
                    }
                    property={item as Property}
                  />
                </Box>
              ))}
            </ItemsWrapper>
          </Stack>
        ))}

      {!property &&
        !pathname.includes(navigationLinks.admin.properties.xmlRequests) && (
          <Arrow finishButtonRef={finishButtonRef} />
        )}
      {pathname.includes(navigationLinks.properties.addXml) && (
        <Button
          loading={publishXml.isPending}
          onClick={onPublish}
          type='button'
          size='lg'
          ref={finishButtonRef}
          className='mx-auto w-full max-w-[280px] cursor-pointer rounded-lg bg-secondary text-center text-lg font-extrabold text-white shadow-md'
        >
          {t('xml.agents.finish')}
        </Button>
      )}
    </Stack>
  )
}

export default AgentsXml
