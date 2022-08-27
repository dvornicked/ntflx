import Link from 'next/link'

const Logo = () => {
	return (
		<Link href="/">
			<a
				sx={{
					fontSize: 3,
					fontWeight: 'bold',
					px: 3,
				}}
			>
				NTFLX
			</a>
		</Link>
	)
}
export default Logo
