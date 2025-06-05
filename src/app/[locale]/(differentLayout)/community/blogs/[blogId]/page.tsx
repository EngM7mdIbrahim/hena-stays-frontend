import React from 'react'
import EditBlogPost from '@sections/Blog/EditBlogPost'

export interface EditBlogPostPageProps {
  params: {
    blogId: string
  }
}

function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  return <EditBlogPost blogId={params.blogId} />
}

export default EditBlogPostPage
