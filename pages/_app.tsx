import { ThemeProvider, useThemeUI } from 'theme-ui'
import type { AppProps } from 'next/app'
import { theme } from '../src/config/theme.config'
import Layout from '../src/layout/Layout'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	)
}

export default MyApp
