export interface IActor {
	id: number
	name: string
	image: string
}

export interface IActors {
	actors: IActor[]
	count: number
}

export interface IActorCreate extends Omit<IActor, 'id'> {}
export interface IActorUpdate extends Partial<IActorCreate> {}
