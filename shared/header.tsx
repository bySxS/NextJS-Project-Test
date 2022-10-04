import { useRouter } from 'next/router'
import React from 'react'
import { en } from '../locales/en'
import { ru } from '../locales/ru'
import styles from './layout.module.scss'
import MyLink from './ui/my-link'

const Header = () => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru
  return (
      <header>
        <nav className={styles.description}>
          <MyLink href={'/'} passHref className={'text-white'}>{t.homePage}</MyLink>
          <MyLink href={'/post'} passHref className={'text-white'}>{t.postPage}</MyLink>
          <div className={'items-center'}>
            <MyLink href={router.asPath} locale="en" passHref
               className={'text-blue-700 hover:text-white'}
            >
              English
            </MyLink>
            <MyLink href={router.asPath} locale="ru" passHref
              className={'text-red-600 hover:text-white'}
            >
              Russian
            </MyLink>
          </div>
        </nav>
        {/* <style jsx global> */}
        <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          right: 0;
          z-index: 999;
          top: 0;
          background: darkblue;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
      </header>
  )
}

export default Header