import React from 'react'
import EditProjectForm from '@sections/Projects/EditProjectForm'

export interface EditProjectPageProps {
  params: {
    projectId: string
  }
}

function EditProjectPage({ params: { projectId } }: EditProjectPageProps) {
  return <EditProjectForm projectId={projectId} />
}

export default EditProjectPage
