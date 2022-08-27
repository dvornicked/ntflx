import Link from 'next/link'
import { useRouter } from 'next/router'
import { INavigationData } from './Navigation.interface'

const items: INavigationData[] = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Films',
		to: '/films',
	},
	{
		label: 'About',
		to: '/about',
	},
	{
		label: 'Contact',
		to: '/contact',
	},
]

const Navigation = () => {
	const { asPath } = useRouter()
	return (
		<nav>
			<ul
				sx={{
					display: 'flex',
					mx: 4,
				}}
			>
				{items.map(item => (
					<li key={item.label}>
						<Link href={item.to}>
							<a
								sx={{
									fontSize: 2,
									fontWeight: 'bold',
									mx: 2,
									color: asPath === item.to ? 'inherit' : 'muted',
								}}
							>
								{item.label}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
export default Navigation
