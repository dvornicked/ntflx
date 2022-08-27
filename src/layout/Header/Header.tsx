import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'

const Header = () => {
	return (
		<div
			sx={{
				display: 'grid',
				gridTemplateColumns: 'auto 1fr 1fr 1fr',
				alignItems: 'center',

				borderBottom: '2px solid',
				borderImage:
					'linear-gradient(to right, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
			}}
		>
			<Logo />
			<Navigation />
		</div>
	)
}
export default Header
