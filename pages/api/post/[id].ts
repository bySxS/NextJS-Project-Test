import { NextApiRequest, NextApiResponse } from 'next'
import { IPosts } from '../../../ts-types/posts.interface'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getPostById = async (id: number) => {
  const data = await fetch(`${API_URL}/posts/${id}`)
  const json: { post: IPosts } = await data.json()
  return json
}

interface PostNextApiRequest extends NextApiRequest {
  query: {
    id: string
  }
}

export default async function handler(
  req: PostNextApiRequest,
  res: NextApiResponse<{ post: IPosts }>
) {
  const post = await getPostById(+req.query.id)
  res.status(200).json(post)
}