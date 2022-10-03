import { useRouter } from 'next/router'
import React from 'react'

const PostById = () => {
  const router = useRouter()
  return (
    <h1>Post {router.query.id}</h1>
  )
}

export default PostById