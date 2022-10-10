import { NextApiRequest, NextApiResponse } from 'next'
import { IPosts } from 'ts-types/posts.interface'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL
const WITH_SERVER = process.env.NEXT_PUBLIC_WITH_SERVER === 'true'

const getPostById = async (id: number) => {
	let data
	let json
	let result
	if (WITH_SERVER) {
		data = await fetch(`${API_URL}/posts/${id}`)
		json = (await data.json()) as IPosts
		result = json
	} else {
		data = await fetch(`${CLIENT_URL}/db.json`)
		json = (await data.json()) as { posts: IPosts[] }
		result = json.posts?.filter(i => i.id === id)[0]
	}

	return result
}

interface PostNextApiRequest extends NextApiRequest {
	query: {
		id: string
	}
}

export default async function handler(
	req: PostNextApiRequest,
	res: NextApiResponse<IPosts>
) {
	const post = await getPostById(+req.query.id)
	res.status(200).json(post)
}
