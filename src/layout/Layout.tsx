import Header from './Header/Header'
import { ILayoutProps } from './Layout.interface'

const Layout = (props: ILayoutProps) => {
	const { children } = props
	return (
		<div
			sx={{
				display: 'grid',
				gridTemplateRows: '60px 1fr',
				minHeight: '100vh',
				maxWidth: '1200px',
				mx: 'auto',
				'& *': {
					outline: '0px solid',
				},
			}}
		>
			<Header />
			{children}
		</div>
	)
}
export default Layout
