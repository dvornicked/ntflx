export interface IActor {
	id: number
	name: string
	image: string
}

export interface IActors {
	actors: IActor[]
	count: number
}
