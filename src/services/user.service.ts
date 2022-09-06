import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import { IFilms } from '../shared/types/films.interface'
import { IGenres } from '../shared/types/genres.interface'

const getFavFilms = async () => {
	return AxiosAuth.get<IFilms>(`${API.favorite}/films`)
}

const getFavGenres = async () => {
	return AxiosAuth.get<IGenres>(`${API.favorite}/genres`)
}

export const userService = {
	getFavFilms,
	getFavGenres,
}
