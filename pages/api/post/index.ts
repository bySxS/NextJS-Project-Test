import type { NextApiRequest, NextApiResponse } from 'next'
import { IPosts } from 'ts-types/posts.interface'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL
const WITH_SERVER = process.env.NEXT_PUBLIC_WITH_SERVER === 'true'

const getPosts = async () => {
	let data
	let json
	let result
	if (WITH_SERVER) {
		data = await fetch(`${API_URL}/posts`)
		json = (await data.json()) as IPosts[]
		result = json
	} else {
		data = await fetch(`${CLIENT_URL}/db.json`)
		json = (await data.json()) as { posts: IPosts[] }
		result = json.posts
	}
	return result
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IPosts[]>
) {
	const posts = await getPosts()
	res.status(200).json(posts)
}
