import axios from 'axios'
import { API } from '../helpers/api.helper'
import { IFilms } from '../shared/types/films.interface'

export const getFilms = async (title: string) => {
	return axios.get<IFilms>(API.films, {
		params: {
			title,
			limit: 4,
		},
	})
}
