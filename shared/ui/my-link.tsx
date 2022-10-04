import Link from 'next/link'
import React, { FC } from 'react'
import style from './my-link.module.scss'

interface IMyLink {
  children: React.ReactNode
  href: string
  as?: string
  passHref?: boolean
  className?: string
  locale?: 'ru' | 'en'
  onClick?: () => void
}

const MyLink: FC<IMyLink> = ({
  children,
  href,
  passHref,
  as,
  className,
  locale,
  onClick
}) => {
  return (
    onClick ? <a
        className={`${className || 'text-blue-700'} hover:text-white hover:underline mx-2`}
        onClick={onClick}
      >
        {children}
      </a>
      : <Link
      href={href}
      as={as}
      passHref={passHref}
      locale={locale}
    >
      <a
        className={`${className || 'text-blue-700'} hover:text-white hover:underline mx-2`}
      >
        {children}
      </a>
    </Link>
  )
}

export default MyLink