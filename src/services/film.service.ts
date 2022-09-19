import axios from 'axios'
import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import {
	IFilm,
	IFilmCreate,
	IFilms,
	IFilmUpdate,
} from '../shared/types/films.interface'
import { IFilmQuery } from '../shared/types/query.interface'

const getAll = async ({
	limit = 4,
	offset = 0,
	order = 'ASC',
	title = '',
}: IFilmQuery) => {
	return await axios.get<IFilms>(API.films, {
		params: {
			limit,
			offset,
			order,
			title,
		},
	})
}

const getOne = async (id: number) => {
	return await axios.get<IFilm>(`${API.films}/${id}`)
}

const create = async (film: IFilmCreate) => {
	const { data } = await AxiosAuth.post<IFilm>(`${API.films}/create`, film)
	return data
}

const update = async (id: number, film: IFilmUpdate) => {
	const { data } = await AxiosAuth.put<IFilm>(`${API.films}/update/${id}`, film)
	return data
}

const remove = async (id: number) => {
	const { data } = await AxiosAuth.delete(`${API.films}/delete/${id}`)
	return data
}

const rate = async (id: number, rating: number) => {
	const { data } = await AxiosAuth.post(`${API.films}/rating/${id}`, { rating })
	return data
}

export const filmService = {
	getAll,
	getOne,
	create,
	update,
	remove,
	rate,
}
