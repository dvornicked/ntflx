import { ThemeProvider, useThemeUI } from 'theme-ui'
import type { AppProps } from 'next/app'
import { theme } from '../src/config/theme.config'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
