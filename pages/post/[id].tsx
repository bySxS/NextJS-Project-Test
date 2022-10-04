import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import MainLayout from '../../shared/main-layout'
import { IPosts } from '../../ts-types/posts.interface'

interface IPostByIdProps {
  post: IPosts
}

const PostById: NextPage<IPostByIdProps> = ({ post: serverPosts }) => {
  // const router = useRouter()
  const [post] = useState(serverPosts)
  // useEffect(() => {
  //   async function load() {
  //     const response = await fetch(`http://localhost:4200/posts/${router.query.id}`)
  //     const json = await response.json()
  //     setPost(json)
  //   }
  //
  //   if (!serverPosts) {
  //     load()
  //   }
  // }, [])
  
  // if (!post) {
  //   return (<MainLayout>
  //     <p>Loading ...</p>
  //   </MainLayout>)
  // }
  
  return (
    <MainLayout
      title={post.title}
      description={`You can on this page read ${post.title}`}
    >
    <h1>
      {post.title} (id {post.id})
    </h1>
      <hr />
      <div>{post.body}</div>
  </MainLayout>
  )
}

// PostById.getInitialProps = async ({ query, req, res }) => {
//   if (!req) {
//     return {
//       post: null
//     }
//   }
//   const response = await fetch(`http://localhost:4200/posts/${query.id}`)
//   const post = await response.json()
//
//   if (!post.title && res) {
//     res.statusCode = 404
//     return {
//       post: null
//     }
//   }
//
//   return {
//     post
//   }
// }

export const getServerSideProps: GetServerSideProps =
  async ({ query, req }) => {
  if (!req) {
    return { props: { post: null } }
  }
  const response = await fetch(`http://localhost:4200/posts/${query.id}`)
  const post = await response.json()

  if (!post.title) {
    return {
      notFound: true,
    }
  }

  return { props: { post } }
}

export default PostById