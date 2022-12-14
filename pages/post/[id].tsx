import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import MainLayout from '../../shared/main-layout'
import { IPosts } from '../../ts-types/posts.interface'

interface IPostByIdProps {
	post: IPosts
}

const API_URL = process.env.NEXT_PUBLIC_CLIENT_URL

const PostById: NextPage<IPostByIdProps> = ({ post }) => {
	// const router = useRouter()
	// const [post] = useState(serverPosts)
	// useEffect(() => {
	//   async function load() {
	//     const response = await fetch(`${API_URL}/posts/${router.query.id}`)
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
//   const response = await fetch(`${API_URL}/posts/${query.id}`)
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

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query
}: GetServerSidePropsContext) => {
	if (!req) {
		return { props: { post: null } }
	}
	const response = await fetch(`${API_URL}/api/post/${query.id}`)
	let post = null
	try {
		post = await response.json()
	} catch (e) {
		console.log('error JSON parse post id')
	}

	if (!post || !post.title) {
		return {
			notFound: true
		}
	}

	return { props: { post } }
}

export default PostById
