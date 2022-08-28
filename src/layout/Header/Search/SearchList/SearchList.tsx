import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getFilms } from '../../../../services/films.service'
import {
	ISearchListProps,
	ISearchListWrapperProps,
} from './SearchList.interface'
import SearchListItem from './SearchListItem/SearchListItem'

const SearchListWrapper = (props: ISearchListWrapperProps) => {
	const { children } = props
	return (
		<div
			sx={{
				width: '100%',
				backgroundColor: '#242424',
				position: 'absolute',
				top: '58px',
				left: '0',
				borderRadius: '0 0 0.5rem 0.5rem',
				lineHeight: 'normal',
			}}
		>
			{children}
		</div>
	)
}

const SearchList = (props: ISearchListProps) => {
	const { value, setIsLoading } = props
	const { isLoading, isSuccess, isError, error, data } = useQuery(
		['SEARCH_FILMS', value],
		() => getFilms(value),
	)

	useEffect(() => {
		setIsLoading(isLoading)
	}, [isLoading, setIsLoading])

	const films = isLoading ? [] : isSuccess ? data.data.films : []
	if (isError)
		return (
			<SearchListWrapper>
				<div sx={{ fontSize: 2 }}>{`${
					error instanceof Error ? error.message : 'Error'
				} 🤔`}</div>
			</SearchListWrapper>
		)
	if (isSuccess)
		return (
			<SearchListWrapper>
				{films.length > 0 ? (
					films.map(film => <SearchListItem key={film.id} film={film} />)
				) : (
					<div
						sx={{
							fontSize: 3,
							p: 3,
						}}
					>
						Films not found 😭
					</div>
				)}
			</SearchListWrapper>
		)
	return <></>
}
export default SearchList
