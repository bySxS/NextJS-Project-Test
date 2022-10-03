import React, { FC } from 'react'
import styles from './layout.module.scss'

interface ILayout {
  children: React.ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default Layout