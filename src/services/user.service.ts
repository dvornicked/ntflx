import axios from 'axios'
import { EditProfileType } from '../../pages/profile/edit'
import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import { useAppSelector } from '../hooks/useAppSelector'
import { IFilms } from '../shared/types/films.interface'
import { IGenres } from '../shared/types/genres.interface'
import { IUser, IUserTokens } from '../shared/types/user.interface'

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

export const userService = {
	getFavFilms,
	getFavGenres,
	updateProfile,
}
