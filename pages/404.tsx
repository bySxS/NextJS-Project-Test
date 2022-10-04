import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { en } from '../locales/en'
import { ru } from '../locales/ru'
import MainLayout from '../shared/main-layout'
import MyLink from '../shared/ui/my-link'

const ErrorPage404 = () => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru
  return (
    <MainLayout>
      <h1 className={'text-red-600'}>{t.error404Page}</h1>
      <p><MyLink href={'/'} onClick={() => router.back()}>
        {t.error404Message}
      </MyLink></p>
    </MainLayout>
  )
}

export default ErrorPage404