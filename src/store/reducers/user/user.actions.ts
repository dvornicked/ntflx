import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { API } from '../../../helpers/api.helper'
import { userHelper } from '../../../helpers/user.helper'
import { ILogin } from '../../../shared/types/login.interface'
import { IResponseError } from '../../../shared/types/response.interface'
import { IUser, IUserTokens } from '../../../shared/types/user.interface'

const login = createAsyncThunk<IUser, ILogin, { rejectValue: IResponseError }>(
	'user/getUser',
	async (credentials, thunkApi) => {
		try {
			const { data } = await axios.post<IUserTokens>(API.login, credentials)
			userHelper.saveUserToLocalStorage(data.user)
			userHelper.saveTokensToCookies(data)
			return data.user
		} catch (e) {
			const error = e as AxiosError<IResponseError>
			if (!error.response) throw error
			return thunkApi.rejectWithValue(error.response.data)
		}
	},
)

export const userActions = {
	login,
}
