export enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface IUser {
	id: number
	username: string
	email: string
	image: string
	desc: string
	role: UserRole
	createdAt: string
	updatedAt: string
}

export interface IUsers {
	users: IUser[]
	count: number
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserTokens extends ITokens {
	user: IUser
}
