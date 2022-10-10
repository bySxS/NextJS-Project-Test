import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Header from '../shared/header'
import MainLayout from '../shared/main-layout'
import styles from '../styles/Home.module.css'
import Router, { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home: NextPage = () => {
	const router = useRouter()
	const t = router.locale === 'en' ? en : ru
	return (
		<div className={styles.container}>
			<Header />
			<MainLayout>
				<h1>{t.title}</h1>
				<Button variant={'outlined'} onClick={() => Router.push('/post/1')}>
					1 post
				</Button>
			</MainLayout>
		</div>
	)
}

export default Home
