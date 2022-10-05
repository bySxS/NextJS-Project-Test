import type { NextApiRequest, NextApiResponse } from 'next'
import { IPosts } from '../../../ts-types/posts.interface'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getPosts = async () => {
  const data = await fetch(`${API_URL}/posts`)
  const json: { posts: IPosts[] } = await data.json()
  return json
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ posts: IPosts[] }>
) {
  const posts = await getPosts()
  res.status(200).json(posts)
}