import axios from 'axios'
import { EditProfileType } from '../../pages/profile/edit'
import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import { IFilms } from '../shared/types/films.interface'
import { IGenres } from '../shared/types/genres.interface'
import { IUser } from '../shared/types/user.interface'

const getOne = async (id: string) => {
	const { data } = await axios.get(`${API.profile}/${id}`)
	return data
}

const getFavFilms = async () => {
	return AxiosAuth.get<IFilms>(`${API.favorite}/films`)
}

const getFavGenres = async () => {
	return AxiosAuth.get<IGenres>(`${API.favorite}/genres`)
}

const updateProfile = async (data: EditProfileType) => {
	return AxiosAuth.put<IUser>(`${API.profile}`, data)
}

const updateAvatar = async (image: string) => {
	return AxiosAuth.put<IUser>(`${API.profile}`, { image })
}

export const userService = {
	getOne,
	getFavFilms,
	getFavGenres,
	updateProfile,
	updateAvatar,
}
