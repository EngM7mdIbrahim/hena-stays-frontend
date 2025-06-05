import React from 'react'
import EditPropertyForm from '@sections/Properties/EditPropertyForm'

export interface EditPropertyPageProps {
  params: {
    propertyId: string
  }
}

function EditPropertyPage({ params: { propertyId } }: EditPropertyPageProps) {
  return <EditPropertyForm propertyId={propertyId} />
}

export default EditPropertyPage
