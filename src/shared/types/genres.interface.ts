export interface IGenre {
	id: number
	name: string
	desc: string
}

export interface IGenres {
	actors: IGenre[]
	count: number
}
