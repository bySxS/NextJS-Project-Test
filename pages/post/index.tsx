import React, { useEffect } from 'react'
// GetStaticProps, GetStaticPaths,
import { NextPage } from 'next'
import { useFetchData } from 'hooks/useFetchData'
import MainLayout from 'shared/main-layout'
import MyLink from 'shared/ui/my-link'
import { IPosts } from 'ts-types/posts.interface'

interface IPostsProps {
	posts: IPosts[]
}

const API_URL = process.env.NEXT_PUBLIC_CLIENT_URL

const Posts: NextPage<IPostsProps> = ({ posts: serverPosts }) => {
	const {
		request,
		error,
		isLoading,
		data: posts
	} = useFetchData<IPosts[]>(serverPosts)
	useEffect(() => {
		async function load() {
			await request(`${API_URL}/api/post`)
		}

		if (!serverPosts && !posts) {
			load()
		}
	}, [])

	if (error) {
		return (
			<MainLayout
				title={'Posts page'}
				description={'This is Posts Page'}
				keywords={'Posts, Page'}
			>
				<p className={'text-red-600 text-2xl'}>{error}</p>
			</MainLayout>
		)
	}

	if (isLoading) {
		return (
			<MainLayout
				title={'Posts page'}
				description={'This is Posts Page'}
				keywords={'Posts, Page'}
			>
				<p>Loading ...</p>
			</MainLayout>
		)
	}

	return (
		<MainLayout
			title={'Posts page'}
			description={'This is Posts Page'}
			keywords={'Posts, Page'}
		>
			<h1>Posts</h1>
			<ul>
				{posts &&
					posts.map(post => (
						<li key={post.id}>
							<MyLink href={'/post/[id]'} as={`/post/${post.id}`} passHref>
								{post.title}
							</MyLink>
						</li>
					))}
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
	const response = await fetch(`${API_URL}/api/post`)
	let posts = null
	try {
		posts = await response.json()
	} catch (e) {
		console.log('error JSON parse post id')
	}

	return {
		posts
	}
}

export default Posts
