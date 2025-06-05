import React from 'react'
import { useGetPostById } from '@hooks'
import { Box } from '@mantine/core'
import AddPost from '@sections/Community/AddPost/AddPost'
import { useTranslations } from 'next-intl'

import LoaderScreen from '@components/LoaderScreen'
import AppModal from '@components/Modals/AppModal'

export interface EditPostProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  postId: string
}

function EditPost({ openModal, setOpenModal, postId }: EditPostProps) {
  const { data, isLoading } = useGetPostById({ id: postId })
  const t = useTranslations()
  return (
    <Box>
      <AppModal
        open={openModal}
        setOpen={setOpenModal}
        size='lg'
        title={t('community.postForm.editTitle')}
      >
        {isLoading ? (
          <LoaderScreen />
        ) : (
          <AddPost isEdit post={data?.post} setOpen={setOpenModal} />
        )}
      </AppModal>
    </Box>
  )
}

export default EditPost
