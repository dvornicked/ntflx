import { IUser } from '../../../shared/types/user.interface'

export interface IUserInitialState {
	user: IUser | null
	isLoading: boolean
	error: string
}
