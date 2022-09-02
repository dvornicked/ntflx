import { ThemeProvider, useThemeUI } from 'theme-ui'
import type { AppProps } from 'next/app'
import { theme } from '../src/config/theme.config'
import Layout from '../src/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '../src/store/store'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	)
}

export default MyApp
