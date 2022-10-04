import React, { useEffect, useState } from 'react'
// GetStaticProps, GetStaticPaths,
import { NextPage, GetServerSideProps } from 'next'
import MainLayout from '../../shared/main-layout'
import MyLink from '../../shared/ui/my-link'
import { IPosts } from '../../ts-types/posts.interface'

interface IPostsProps {
  posts: IPosts[]
}

const Posts: NextPage<IPostsProps> = ({ posts: serverPosts }) => {
  const [posts, setPosts] = useState(serverPosts)
  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/post`)
      const data = await response.json()
      setPosts(data)
    }
    
    if (!serverPosts) {
      load()
    }
    
  }, [])
  
  if (!posts) {
    return (<MainLayout
      title={'Posts page'}
      description={'This is Posts Page'}
      keywords={'Posts, Page'}
    >
      <p>Loading ...</p>
    </MainLayout>)
  }
  
  return (
      <MainLayout
        title={'Posts page'}
        description={'This is Posts Page'}
        keywords={'Posts, Page'}
      >
        <h1>
          Posts
        </h1>
        <ul>
        {posts && posts.map((post) =>
        <li key={post.id}>
          <MyLink
            href={'/post/[id]'}
            as={`/post/${post.id}`}
            passHref
          >
            {post.title}
          </MyLink>
        </li>
        )}
        </ul>
      </MainLayout>
  )
}

Posts.getInitialProps = async ({ req }) => {
  if (!req) {
    return {
      posts: null
    }
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/post`)
  const posts = await response.json()
  
  return {
    posts
  }
}

export default Posts