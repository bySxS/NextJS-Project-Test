import Head from 'next/head'
import React, { FC } from 'react'

interface IMeta {
  title?: string
  description?: string
  keywords?: string
  favicon?: string
}

const Meta: FC<IMeta> = ({
  title = 'Home page',
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
      <meta charSet="utf-8" />
      <link rel="icon" href={favicon} />
    </Head>
  )
}

export default Meta
