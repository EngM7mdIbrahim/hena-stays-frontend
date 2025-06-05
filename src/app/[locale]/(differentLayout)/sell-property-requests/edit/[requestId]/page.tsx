import React from 'react'
import EditSellPropertyForm from '@sections/SellPropertyRequest/EditSellPropertyForm'

export interface EditPropertyPageProps {
  params: {
    requestId: string
  }
}

function EditPropertyPage({ params: { requestId } }: EditPropertyPageProps) {
  return <EditSellPropertyForm requestId={requestId} />
}

export default EditPropertyPage
