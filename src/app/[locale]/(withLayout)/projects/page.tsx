import React from 'react'
import { Stack } from '@mantine/core'
import ProjectsSection from '@sections/Projects/ProjectsSection'

export const metadata = {
  title: 'All Projects | TrueDar Real Estate Projects in UAE',
  description:
    'Explore a comprehensive list of real estate projects in UAE on TrueDar. Discover residential, commercial, and investment projects with reliable information and easy navigation.',
  robots: {
    index: true,
    follow: true
  }
}

function ProjectsPage() {
  return (
    <Stack className='gap-6 px-4 md:px-12'>
      <ProjectsSection />
    </Stack>
  )
}

export default ProjectsPage
