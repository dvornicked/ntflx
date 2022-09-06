import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { API } from '../../../helpers/api.helper'
import { userHelper } from '../../../helpers/user.helper'
import { ILogin } from '../../../shared/types/login.interface'
import { IRegister } from '../../../shared/types/register.interface'
import { IResponseError } from '../../../shared/types/response.interface'
import {
	ITokens,
	IUser,
	IUserTokens,
} from '../../../shared/types/user.interface'
import { UserSlice } from './user.slice'

const login = createAsyncThunk<IUser, ILogin, { rejectValue: IResponseError }>(
	'user/getUser',
	async (credentials, thunkApi) => {
		try {
			const { data } = await axios.post<IUserTokens>(API.login, credentials)
			userHelper.saveUserToLocalStorage(data.user)
			userHelper.saveTokensToCookies(data)
			console.log(data.user)
			return data.user
		} catch (e) {
			const error = e as AxiosError<IResponseError>
			if (!error.response) throw error
			return thunkApi.rejectWithValue(error.response.data)
		}
	},
)

const register = createAsyncThunk<
	IUser,
	IRegister,
	{ rejectValue: IResponseError }
>('user/register', async (credentials, thunkApi) => {
	try {
		const { data } = await axios.post<IUserTokens>(API.register, credentials)
		userHelper.saveUserToLocalStorage(data.user)
		userHelper.saveTokensToCookies(data)
		return data.user
	} catch (e) {
		const error = e as AxiosError<IResponseError>
		if (!error.response) throw error
		return thunkApi.rejectWithValue(error.response.data)
	}
})

const getTokens = createAsyncThunk<
	ITokens,
	void,
	{ rejectValue: IResponseError }
>('user/token', async (_, thunkApi) => {
	try {
		const refreshToken = userHelper.getRefreshTokenFromCookies()
		if (refreshToken) {
			const { data } = await axios.post<ITokens>(API.token, {
				refreshToken,
			})
			userHelper.saveTokensToCookies(data)
			return data
		} else {
			thunkApi.dispatch(UserSlice.actions.logout())
			return thunkApi.rejectWithValue({
				statusCode: 401,
				message: 'No refresh token',
			})
		}
	} catch (e) {
		const error = e as AxiosError<IResponseError>
		if (!error.response) throw error
		return thunkApi.rejectWithValue(error.response.data)
	}
})

export const userActions = {
	login,
	register,
	getTokens,
}
