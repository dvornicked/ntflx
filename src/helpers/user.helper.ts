import Cookies from 'js-cookie'
import { ITokens, IUser, IUserTokens } from '../shared/types/user.interface'

const saveUserToLocalStorage = (user: IUser) => {
	localStorage.setItem('user', JSON.stringify(user))
}

const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user')
}
const saveTokensToCookies = (tokens: ITokens) => {
	Cookies.set('accessToken', tokens.accessToken)
	Cookies.set('refreshToken', tokens.refreshToken)
}

const removeTokensFromCookies = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

const getUserFromLocalStorage = () => {
	const user = localStorage.getItem('user')
	if (user) return JSON.parse(user) as IUser
}

const getAccessTokenFromCookies = () => {
	return Cookies.get('accessToken')
}

const getRefreshTokenFromCookies = () => {
	return Cookies.get('refreshToken')
}

export const userHelper = {
	saveUserToLocalStorage,
	removeUserFromLocalStorage,
	saveTokensToCookies,
	removeTokensFromCookies,
	getUserFromLocalStorage,
	getAccessTokenFromCookies,
	getRefreshTokenFromCookies,
}
