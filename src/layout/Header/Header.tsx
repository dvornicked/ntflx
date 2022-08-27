import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import Search from './Search/Search'

const Header = () => {
	return (
		<div
			sx={{
				display: 'grid',
				gridTemplateColumns: 'auto auto 1fr',
				alignItems: 'center',

				borderBottom: '2px solid',
				borderImage:
					'linear-gradient(to right, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
			}}
		>
			<Logo />
			<Navigation />
			<Search
				sx={{
					justifySelf: 'end',
				}}
			/>
		</div>
	)
}
export default Header
