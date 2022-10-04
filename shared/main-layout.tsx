import React, { FC } from 'react'
import Footer from './footer'
import Header from './header'
import styles from './layout.module.scss'
import Meta from './meta'

interface ILayout {
  children: React.ReactNode
  title?: string
  description?: string
  keywords?: string
  favicon?: string
}

const MainLayout: FC<ILayout> = ({
  children,
  title,
  description,
  keywords,
  favicon
}) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Meta
          title={title}
          description={description}
          keywords={keywords}
          favicon={favicon}
        />
        {children}
      </main>
      <Footer />
      <style jsx>{`
        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  )
}

export default MainLayout