'use client'

import React from 'react'
import Image from 'next/image'
import { Project } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Box, Group } from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'

import { formatNumberToShortForm } from '@utils'

export interface MinorDetailsCardProps {
  icon: React.ReactNode
  title: string
  value: string
}

function MinorDetailsCard({ icon, title, value }: MinorDetailsCardProps) {
  return (
    <div className='flex items-center gap-2'>
      {icon}
      <div className='text-sm text-neutral-500'>
        <p>{title}</p>
        <p className='font-bold'>{value}</p>
      </div>
    </div>
  )
}

export interface ProjectDescriptionProps {
  project: Project | undefined
}

function ProjectDescription({ project }: ProjectDescriptionProps) {
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

  function getTotalBeforePercentage() {
    const downPayment = project?.paymentPlan?.downPaymentPercentage || 0
    const preHandOverTotal = calculateTotalPrevHandOverPercentages() || 0
    const onHandOver = project?.paymentPlan?.onHandOverPercentage || 0

    return downPayment + preHandOverTotal + onHandOver
  }

  const fullPriceType =
    project?.paymentPlan?.fullPrice &&
    `${getTotalBeforePercentage()} % ${t('projects.projectView.tabs.description.before')} ${project.paymentPlan?.postHandOverPercentage} % ${t('projects.projectView.tabs.description.after')}`

  const projectCompletionType =
    project &&
    project?.paymentPlan?.projectCompletion.length > 0 &&
    `${getTotalBeforePercentage()} % ${t('projects.projectView.tabs.description.before')} ${project.paymentPlan?.postHandOverPercentage} % ${t('projects.projectView.tabs.description.after')}`

  return (
    <Box>
      <Group className='mb-8 items-center gap-10 border-y border-neutral-200 py-8'>
        <MinorDetailsCard
          title={t('projects.projectView.tabs.description.startFrom')}
          value={`AED ${formatNumberToShortForm(project?.startingPrice || 0)} `}
          icon={
            <Image
              src={navigationLinks.assets.projects.coins}
              width={30}
              height={30}
              alt='coins'
            />
          }
        />
        <MinorDetailsCard
          title={t('projects.projectView.tabs.description.handoverDate')}
          value={`${t(`projects.projectCard.q${Math.ceil((moment(project?.handOverDate).month() + 1) / 3)}`)} ${moment(project?.handOverDate).year()}`}
          icon={
            <Image
              src={navigationLinks.assets.projects.delivery}
              width={30}
              height={30}
              alt='delivery'
            />
          }
        />
        <MinorDetailsCard
          title={t('projects.projectView.tabs.description.paymentPlan')}
          value={
            project?.paymentPlan?.fullPrice
              ? (fullPriceType as string)
              : (projectCompletionType as string)
          }
          icon={
            <Image
              src={navigationLinks.assets.projects.plan}
              width={30}
              height={30}
              alt='plan'
            />
          }
        />
      </Group>
      <Box className='font-bold'>{project?.description}</Box>
    </Box>
  )
}

export default ProjectDescription
