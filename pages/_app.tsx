import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextNProgress
				nonce={'load'}
				options={{ isRequired: false }}
				color="#00b8ff"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
