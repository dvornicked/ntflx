export interface IBaseQuery {
	limit?: number
	offset?: number
	order?: 'ASC' | 'DESC'
}

export interface IFilmQuery extends IBaseQuery {
	title?: string
}
