import Head from 'next/head'
import React, { FC } from 'react'

interface IMeta {
  title: string
  description?: string
  keywords?: string
  favicon?: string
}

const Meta: FC<IMeta> = ({
  title,
  keywords,
  description,
  favicon = '/favicon.ico'
}) => {
  return (
    <Head>
      <title>{title}</title>
      {description &&
        <meta name="description" content={description}/>}
      {keywords &&
        <meta name="keywords" content={keywords}/>}
      <link rel="icon" href={favicon} />
    </Head>
  )
}

export default Meta
