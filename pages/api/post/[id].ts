import { NextApiRequest, NextApiResponse } from 'next'
import { IPosts } from '../../../ts-types/posts.interface'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getPostById = async (id: number) => {
  const data = await fetch(`${API_URL}/db.json`)
  const json: { posts: IPosts[] } = await data.json()
  return json.posts.filter((p) => p.id === id)[0]
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