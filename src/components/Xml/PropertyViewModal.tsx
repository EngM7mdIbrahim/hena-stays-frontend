import { useState } from 'react'
import { Property } from '@commonTypes'
import { ScrollArea, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import PropertyDescription from '@sections/Properties/PropertyViewSection/PropertyDescription'
import PropertyLocation from '@sections/Properties/PropertyViewSection/PropertyLocation'
import PropertyRegInformation from '@sections/Properties/PropertyViewSection/PropertyRegInformation'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import ImageGalleryDesktop from '@components/ImageGallery/ImagesGalleryDesktop'
import ImageGalleryMobile from '@components/ImageGallery/ImagesGalleryMobile'
import ImageGalleryModal from '@components/ImageGallery/ImagesGalleryModal'
import AppModal from '@components/Modals/AppModal'

export interface PropertyViewModalProps {
  property: Property | null
  setProperty: React.Dispatch<React.SetStateAction<Property | null>>
}

function PropertyViewModal({ property, setProperty }: PropertyViewModalProps) {
  const [currIndex, setCurrIndex] = useState<number | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [currentSelected, setCurrentSelected] = useState<string>('Description')

  const handleMovingBetweenTabs = (tab: string) => {
    setCurrentSelected(tab)
  }
  let content = null

  if (property) {
    if (currentSelected === 'Description') {
      content = <PropertyDescription property={property} />
    } else if (currentSelected === 'Location') {
      content = <PropertyLocation property={property} />
    } else if (currentSelected === 'Regulatory Information') {
      content = <PropertyRegInformation property={property} />
    }
  }

  return (
    <AppModal
      open={!!property}
      setOpen={() => setProperty(null)}
      title='Property view'
      size='100%'
    >
      <>
        <AppModal
          size='xl'
          title='Property Media'
          open={currIndex !== null}
          setOpen={() => setCurrIndex(null)}
        >
          <ImageGalleryModal
            defaultIndex={currIndex || 0}
            images={property?.media || []}
          />
        </AppModal>
        {isMobile ? (
          <ImageGalleryMobile images={property?.media || []} />
        ) : (
          <ImageGalleryDesktop
            handleClick={setCurrIndex}
            images={property?.media || []}
          />
        )}
      </>
      <Stack className='mt-8 md:w-[60%]'>
        <ScrollArea offsetScrollbars>
          <AppFragmentTabsControl
            textColor='text-primary'
            notActiveBg='bg-neutral-50'
            value={currentSelected}
            onChange={handleMovingBetweenTabs}
            data={['Description', 'Location', 'Regulatory Information']}
          />
        </ScrollArea>
        {content}
      </Stack>
    </AppModal>
  )
}

export default PropertyViewModal
