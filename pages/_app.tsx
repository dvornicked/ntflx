import { ThemeProvider, useThemeUI } from 'theme-ui'
import type { AppProps } from 'next/app'
import { theme } from '../src/config/theme.config'
import Layout from '../src/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default MyApp
