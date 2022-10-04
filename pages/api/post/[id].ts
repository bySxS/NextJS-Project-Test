import { NextApiRequest, NextApiResponse } from 'next'

type IPost = {
  id: number
  title: string
  body: string
}

const getPostById = async (id: number) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/db.json`)
  const json: { posts: IPost[] } = await data.json()
  return json.posts.filter((p) => p.id === id)[0]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPost>
) {
  const post = await getPostById(+(req.query.id ?? 0))
  res.status(200).json(post)
}