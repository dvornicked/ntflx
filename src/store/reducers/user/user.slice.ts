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
		updateAvatar: (state, action: PayloadAction<string>) => {
			if (state.user) {
				state.user.image = action.payload
				userHelper.saveUserToLocalStorage(state.user)
			}
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
				state.error = ''
			})
			.addCase(userActions.login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.error = ''
			})
			.addCase(userActions.login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload?.message || 'Something went wrong'
			})
			.addCase(userActions.register.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(userActions.register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.error = ''
			})
			.addCase(userActions.register.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload?.message || 'Something went wrong'
			})
			.addCase(userActions.update.pending, state => {
				state.isLoading = true
				state.error = ''
			})
			.addCase(userActions.update.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.error = ''
			})
			.addCase(userActions.update.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload?.message || 'Something went wrong'
			})
	},
})

export default UserSlice.reducer
