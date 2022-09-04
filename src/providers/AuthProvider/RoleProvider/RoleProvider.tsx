import { useAppSelector } from '../../../hooks/useAppSelector'
import { UserRole } from '../../../shared/types/user.interface'
import { TypeComponentAuth } from '../AuthProvider.interface'

const RoleProvider = (props: TypeComponentAuth) => {
	const {
		children,
		Component: { access },
	} = props
	const { user } = useAppSelector(state => state.user)
	console.log('user', user)
	console.log(access)

	if (!access) return <>{children}</>
	if (user?.role === access || user?.role === UserRole.ADMIN)
		return <>{children}</>
	else
		return (
			<h1
				sx={{
					textAlign: 'center',
				}}
			>
				Access Denied
			</h1>
		)
}

export default RoleProvider
