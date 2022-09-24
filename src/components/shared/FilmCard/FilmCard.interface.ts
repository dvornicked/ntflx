import { HTMLAttributes } from 'react'
import { IFilm } from '../../../shared/types/films.interface'

export interface IFilmCardProps
	extends Pick<
			IFilm,
			| 'id'
			| 'title'
			| 'image'
			| 'rating'
			| 'ratingCount'
			| 'releaseDate'
			| 'duration'
			| 'views'
		>,
		Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'title'> {}
