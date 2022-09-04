import { ThemeProvider, useThemeUI } from 'theme-ui'
import type { AppProps } from 'next/app'
import { theme } from '../src/config/theme.config'
import Layout from '../src/layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '../src/store/store'
import AuthProvider from '../src/providers/AuthProvider/AuthProvider'
import { TypeComponentAuth } from '../src/providers/AuthProvider/AuthProvider.interface'

const queryClient = new QueryClient()
type AppAuthProps = AppProps & TypeComponentAuth

function MyApp({ Component, pageProps }: AppAuthProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Layout>
						<AuthProvider Component={Component}>
							<Component {...pageProps} />
						</AuthProvider>
					</Layout>
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	)
}

export default MyApp
