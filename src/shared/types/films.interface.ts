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
