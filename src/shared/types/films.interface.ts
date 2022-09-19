import { selectOption } from '../../types/reactSelect.interface'
import { IActor } from './actors.interface'
import { IGenre } from './genres.interface'

export interface IFilm {
	id: number
	title: string
	desc: string
	image: string
	wideImage: string
	video: string
	views: number
	releaseDate: string
	rating: number
	ratingCount: number
	duration: number
	actors: IActor[]
	genres: IGenre[]
}

export interface IFilms {
	films: IFilm[]
	count: number
}
export interface IFilmCreate
	extends Pick<
		IFilm,
		'title' | 'desc' | 'image' | 'video' | 'duration' | 'releaseDate'
	> {
	actors: number[]
	genres: number[]
}

export interface IFilmForm extends Omit<IFilmCreate, 'actors' | 'genres'> {
	actors: selectOption<number>[]
	genres: selectOption<number>[]
}

export interface IFilmUpdate extends Partial<IFilmCreate> {}
