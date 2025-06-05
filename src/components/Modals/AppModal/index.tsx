'use client'

import React from 'react'
import { Modal, ModalBaseProps, Text } from '@mantine/core'

export interface AppModalProps {
  title: string
  children: React.ReactNode
  trigger?: React.ReactElement
  size?: ModalBaseProps['size']
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AppModal({
  title,
  children,
  trigger,
  size,
  open,
  setOpen
}: AppModalProps) {
  const buttonTrigger =
    trigger &&
    React.cloneElement(trigger, {
      onClick: () => setOpen(true)
    })

  return (
    <>
      <Modal
        opened={open}
        size={size}
        onClose={() => setOpen(false)}
        title={<Text className='text-lg font-semibold'>{title}</Text>}
        classNames={{
          overlay: 'backdrop-blur-sm'
        }}
        centered
      >
        {children}
      </Modal>
      {buttonTrigger}
    </>
  )
}

export default AppModal
