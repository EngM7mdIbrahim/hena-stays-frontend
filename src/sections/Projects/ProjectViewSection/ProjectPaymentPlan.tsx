import React from 'react'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import { ProjectDescriptionProps } from './ProjectDescription'

function ProjectPaymentPlan({ project }: ProjectDescriptionProps) {
  const t = useTranslations()
  function calculateTotalPrevHandOverPercentages() {
    if (!project) return 0
    if (project?.paymentPlan?.projectCompletion.length > 0) {
      return project?.paymentPlan?.projectCompletion.reduce(
        (total, current) => total + current.preHandOverPercentage,
        0
      )
    }
    return project?.paymentPlan?.fullPrice?.preHandOverPercentage
  }

  const milestones = [
    {
      id: 1,
      title: t('projects.projectView.tabs.paymentPlan.downPayment'),
      percentage: `${project?.paymentPlan?.downPaymentPercentage}%`
    },
    {
      id: 2,
      title: t('projects.projectView.tabs.paymentPlan.preHandover'),
      percentage: `${calculateTotalPrevHandOverPercentages()}%`
    },
    {
      id: 3,
      title: t('projects.projectView.tabs.paymentPlan.onHandover'),
      percentage: `${project?.paymentPlan?.onHandOverPercentage}%`
    }
  ]

  return (
    <Box className='p-5 font-lexend'>
      {/* Header Section */}
      <Stack className='my-4 flex items-center justify-between text-sm font-bold uppercase text-neutral-500 md:flex-row md:text-base'>
        <Text className='font-semibold'>
          {t('projects.projectView.tabs.paymentPlan.milestone')}
        </Text>
        <Text className='font-semibold'>
          {t('projects.projectView.tabs.paymentPlan.percentage')}
        </Text>
      </Stack>

      {/* Scrollable Timeline Container */}
      <Box className='relative border-0 border-neutral-400 md:border-l-2'>
        <Box className='w-full min-w-[600px] space-y-8'>
          {milestones.map((milestone) => (
            <Flex key={milestone.id} className='relative ml-6 items-center'>
              {/* Circle and Connector Line */}
              <Box className='absolute -left-[37px] hidden h-6 w-6 items-center justify-center rounded-full bg-gray-100 font-bold text-primary md:flex'>
                {milestone.id}
              </Box>
              <Box className='w-full rounded-lg border border-neutral-400 bg-default-background p-4 text-neutral-700'>
                {/* Content Section */}
                <Flex className='flex items-center justify-between'>
                  <Flex className='flex items-center gap-2 text-base font-medium text-neutral-500 md:w-[60%]'>
                    <Text component='span'>{milestone.title}</Text>
                    {milestone.title ===
                      t(
                        'projects.projectView.tabs.paymentPlan.preHandover'
                      ) && (
                      <AiOutlineExclamationCircle
                        className='text-primary'
                        size={20}
                      />
                    )}
                  </Flex>
                  <Text
                    component='span'
                    className='text-base font-semibold text-neutral-500'
                  >
                    {milestone.percentage}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectPaymentPlan
