import axios from 'axios'
import { EditProfileType } from '../../pages/profile/edit'
import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import { IFilms } from '../shared/types/films.interface'
import { IGenres } from '../shared/types/genres.interface'
import { IUserQuery } from '../shared/types/query.interface'
import { IRegister } from '../shared/types/register.interface'
import { IUser, IUsers, IUserTokens } from '../shared/types/user.interface'

const getOne = async (id: number) => {
	const { data } = await axios.get<IUser>(`${API.profile}/${id}`)
	return data
}

const register = async (credentials: IRegister) => {
	const { data } = await axios.post<IUserTokens>(API.register, credentials)
	return data
}

const getFavFilms = async () => {
	return AxiosAuth.get<IFilms>(`${API.favorite}/films`)
}

const getFavFilmsById = async (id: number) => {
	return AxiosAuth.get<IFilms>(`${API.favorite}/films/${id}`)
}

const getFavGenres = async () => {
	return AxiosAuth.get<IGenres>(`${API.favorite}/genres`)
}

const updateProfile = async (data: EditProfileType) => {
	return AxiosAuth.put<IUser>(`${API.profile}`, data)
}

const updateProfileById = async (id: number, data: EditProfileType) => {
	return AxiosAuth.put<IUser>(`${API.profile}/${id}`, data)
}

const updateAvatar = async (image: string) => {
	return AxiosAuth.put<IUser>(`${API.profile}`, { image })
}

const updateAvatarById = async (id: number, image: string) => {
	return AxiosAuth.put<IUser>(`${API.profile}/${id}`, { image })
}

const updateEmail = async (email: string) => {
	return AxiosAuth.put<IUser>(`${API.profile}`, { email })
}

const updateEmailById = async (id: number, email: string) => {
	return AxiosAuth.put<IUser>(`${API.profile}/${id}`, { email })
}

const updatePassword = async (password: string) => {
	return AxiosAuth.put<IUser>(`${API.password}`, { password })
}

const updatePasswordById = async (id: number, password: string) => {
	return AxiosAuth.put<IUser>(`${API.password}/${id}`, { password })
}

const getAll = async (query: IUserQuery) => {
	const { data } = await axios.get<IUsers>(`${API.users}`, { params: query })
	return data
}

const remove = async (id: number) => {
	return await AxiosAuth.delete(`${API.profile}/${id}`)
}

const updateRole = async (id: number, role: string) => {
	return await AxiosAuth.put<IUser>(`${API.role}/${id}`, { role })
}

export const userService = {
	getOne,
	getFavFilms,
	getFavFilmsById,
	getFavGenres,
	updateProfile,
	updateAvatar,
	updateEmail,
	updatePassword,
	getAll,
	remove,
	register,
	updateRole,
	updateAvatarById,
	updateProfileById,
	updatePasswordById,
	updateEmailById,
}
