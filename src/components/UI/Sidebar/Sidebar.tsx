import Link from 'next/link'
import { useRouter } from 'next/router'
import { ISidebarProps } from './Sidebar.interface'

const Sidebar = (props: ISidebarProps) => {
	const { children, sidebar, ...rest } = props
	const { asPath } = useRouter()
	return (
		<div
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 4fr',
			}}
			{...rest}
		>
			<aside
				sx={{
					borderRight: '2px solid',
					borderImage:
						'linear-gradient(to bottom, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
				}}
			>
				{sidebar.map(item => (
					<Link href={item.link} key={item.label}>
						<a>
							<div
								sx={{
									fontWeight: asPath === item.link ? 'bold' : 'normal',
									backgroundColor:
										asPath === item.link ? '#202020' : 'transparent',
									textAlign: 'center',
									cursor: 'pointer',
									fontSize: 2,
									border: '1px solid',
									borderImage:
										'linear-gradient(to right, transparent 5%, rgba(80,80,80,.2) 50%, transparent 95%) 1',
									p: 2,
									'&:hover': {
										backgroundColor: '#282828',
									},
								}}
							>
								{item.label}
							</div>
						</a>
					</Link>
				))}
			</aside>
			<main>{children}</main>
		</div>
	)
}
export default Sidebar
