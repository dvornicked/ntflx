import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { userActions } from '../../store/reducers/user/user.actions'
import { UserSlice } from '../../store/reducers/user/user.slice'
import { TypeComponentAuth } from './AuthProvider.interface'

const AuthProvider = (props: TypeComponentAuth) => {
	const {
		children,
		Component: { access },
	} = props
	const DynamicRoleProvider = dynamic(
		() => import('./RoleProvider/RoleProvider'),
		{ ssr: false },
	)
	const { user } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const logout = UserSlice.actions.logout
	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) dispatch(userActions.getTokens())
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (user && !refreshToken) dispatch(logout())
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
	return !access ? (
		<>{children}</>
	) : (
		<DynamicRoleProvider Component={{ access }}>{children}</DynamicRoleProvider>
	)
}
export default AuthProvider
