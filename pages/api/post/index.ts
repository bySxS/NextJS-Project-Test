import type { NextApiRequest, NextApiResponse } from 'next'

type IPost = {
  id: number
  title: string
  body: string
}

const getPosts = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/db.json`)
  const json: { posts: IPost[] } = await data.json()
  return json.posts
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPost[]>
) {
  const posts = await getPosts()
  res.status(200).json(posts)
}