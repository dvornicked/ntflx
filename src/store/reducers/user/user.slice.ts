import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userHelper } from '../../../helpers/user.helper'
import { IUser } from '../../../shared/types/user.interface'
import { userActions } from './user.actions'
import { IUserInitialState } from './user.slice.interface'

const initialState: IUserInitialState = {
	user: null,
	isLoading: false,
	error: '',
}

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
		},
		resetError: state => {
			state.error = ''
		},
		logout: state => {
			userHelper.removeUserFromLocalStorage()
			userHelper.removeTokensFromCookies()
			state.user = null
		},
	},
	extraReducers(builder) {
		builder
			.addCase(userActions.login.pending, state => {
				state.isLoading = true
			})
			.addCase(userActions.login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
			})
			.addCase(userActions.login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload?.message || 'Something went wrong'
			})
			.addCase(userActions.register.pending, state => {
				state.isLoading = true
			})
			.addCase(userActions.register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
			})
			.addCase(userActions.register.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload?.message || 'Something went wrong'
			})
	},
})

export default UserSlice.reducer
