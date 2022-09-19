import axios from 'axios'
import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import { IGenre, IGenres } from '../shared/types/genres.interface'
import { IGenreQuery } from '../shared/types/query.interface'

const getAll = async ({
	limit = 4,
	offset = 0,
	order = 'ASC',
	name = '',
}: IGenreQuery) => {
	const { data } = await axios.get<IGenres>(API.genres, {
		params: {
			limit,
			offset,
			order,
			name,
		},
	})
	return data
}

const getGenre = async (id: number) => {
	const { data } = await axios.get<IGenre>(`${API.genres}/${id}`)
	return data
}

const createGenre = async (genre: Omit<IGenre, 'id'>) => {
	const { data } = await AxiosAuth.post<IGenre>(`${API.genres}/create`, genre)
	return data
}

const updateGenre = async (id: number, genre: Omit<IGenre, 'id'>) => {
	const { data } = await AxiosAuth.put<IGenre>(
		`${API.genres}/update/${id}`,
		genre,
	)
	return data
}

const removeGenre = async (id: number) => {
	const { data } = await AxiosAuth.delete(`${API.genres}/delete/${id}`)
	return data
}

export const genreService = {
	getAll,
	getGenre,
	createGenre,
	updateGenre,
	removeGenre,
}
