import { useEffect } from 'react'
import { userHelper } from '../../../helpers/user.helper'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { UserSlice } from '../../../store/reducers/user/user.slice'
import Login from './Login/Login'
import ProfileMenu from './ProfileMenu/ProfileMenu'

const User = () => {
	const dispatch = useAppDispatch()
	const { setUser } = UserSlice.actions
	useEffect(() => {
		const user = userHelper.getUserFromLocalStorage()
		if (user) dispatch(setUser(user))
	}, [dispatch, setUser])
	const user = useAppSelector(state => state.user.user)
	return <div>{user ? <ProfileMenu user={user} /> : <Login />}</div>
}
export default User
