import axios from 'axios'
import { API } from '../helpers/api.helper'
import { IFilm, IFilms } from '../shared/types/films.interface'
import { IFilmQuery } from '../shared/types/query.interface'

const getAll = async ({
	limit = 4,
	offset = 0,
	order = 'ASC',
	title = '',
}: IFilmQuery) => {
	return axios.get<IFilms>(API.films, {
		params: {
			limit,
			offset,
			order,
			title,
		},
	})
}

const getOne = async (id: number) => {
	return axios.get<IFilm>(`${API.films}/${id}`)
}

export const filmService = {
	getAll,
	getOne,
}
