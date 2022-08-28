import { IFilm } from '../../../../../shared/types/films.interface'

export interface ISearchListItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	film: IFilm
}
