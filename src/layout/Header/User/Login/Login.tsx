import Link from 'next/link'
import { IoLogIn } from 'react-icons/io5'

const Login = () => {
	return (
		<Link href="/login">
			<a sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
				<IoLogIn />
				<span
					sx={{
						fontSize: 2,
						ml: 2,
					}}
				>
					Login
				</span>
			</a>
		</Link>
	)
}
export default Login
