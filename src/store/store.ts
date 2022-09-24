import { configureStore } from '@reduxjs/toolkit'
import user from './reducers/user/user.slice'

export const store = configureStore({
	reducer: {
		user,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
