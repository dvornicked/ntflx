export interface IGenre {
	id: number
	name: string
	desc: string
}

export interface IGenres {
	genres: IGenre[]
	count: number
}
