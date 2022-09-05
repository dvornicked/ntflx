import axios from 'axios'
import { API } from '../helpers/api.helper'
import { IGenres } from '../shared/types/genres.interface'
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

export const genreService = {
	getAll,
}
