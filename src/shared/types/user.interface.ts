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
	createdAt: Date
	updatedAt: Date
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserTokens extends ITokens {
	user: IUser
}
