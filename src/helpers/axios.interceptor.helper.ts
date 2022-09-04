import axios from 'axios'
import { IUserTokens } from '../shared/types/user.interface'
import { API } from './api.helper'
import { userHelper } from './user.helper'

export const AxiosAuth = axios.create()
AxiosAuth.interceptors.request.use(config => {
	const accessToken = userHelper.getAccessTokenFromCookies()
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})
AxiosAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const refreshToken = userHelper.getRefreshTokenFromCookies()
			if (refreshToken) {
				try {
					const { data } = await axios.post<IUserTokens>(API.token, {
						refreshToken,
					})
					userHelper.saveTokensToCookies(data)
					return AxiosAuth.request(originalRequest)
				} catch (e) {
					userHelper.removeTokensFromCookies()
				}
			}
		}
		throw error
	},
)
