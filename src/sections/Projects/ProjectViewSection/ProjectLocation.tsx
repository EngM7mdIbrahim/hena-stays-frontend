'use client'

import React from 'react'
import { Box } from '@mantine/core'

import Map from '@components/Map'

import { ProjectDescriptionProps } from './ProjectDescription'

function ProjectLocation({ project }: ProjectDescriptionProps) {
  return (
    <Box className='z-10'>
      <Map
        className='h-[500px] w-full'
        initialPosition={project?.location}
        draggable={false}
      />
    </Box>
  )
}

export default ProjectLocation
