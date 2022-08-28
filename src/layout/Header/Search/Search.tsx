import { useRouter } from 'next/router'
import { useState } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { Spinner } from 'theme-ui'
import { useDebounce } from '../../../hooks/useDebounce'
import { ISearchProps } from './Search.interface'
import SearchList from './SearchList/SearchList'

const Search = (props: ISearchProps) => {
	const [searchValue, setSearchValue] = useState('Search')
	const [isLoading, setIsLoading] = useState(false)
	const debouncedSearchValue = useDebounce(searchValue, 500)
	const { push, asPath } = useRouter()
	return (
		<div
			sx={{
				width: '100%',
				transition: 'width .3s ease-in-out',
				height: '100%',
				display: 'flex',
				justifyContent: 'end',
				alignItems: 'center',
				lineHeight: 0,
				pr: 2,
				borderRight: '2px solid',
				borderImage:
					'linear-gradient(to bottom, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
				position: 'relative',
			}}
			{...props}
		>
			<IoSearch
				sx={{
					width: 34,
					height: '100%',
					borderLeft: '2px solid',
					borderImage:
						'linear-gradient(to bottom, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
					pl: 2,
					cursor: 'pointer',
				}}
				onClick={() =>
					searchValue
						? setSearchValue('')
						: asPath !== '/search' && push('/search')
				}
			/>
			<input
				value={searchValue}
				sx={{
					width: searchValue === 'Search' ? '70px' : '100%',
					transition: 'width .3s ease-in-out',
					height: '100%',
					fontSize: 2,
					bg: 'transparent',
					border: 'none',
					color: 'text',
					px: 2,
					position: 'relative',
				}}
				onFocus={() => setSearchValue('')}
				onBlur={e => {
					if (e.target.value === '') setSearchValue('Search')
				}}
				onChange={e => setSearchValue(e.target.value)}
			/>
			{searchValue !== 'Search' &&
				(isLoading ? (
					<Spinner size={24} color="white" />
				) : (
					<div onClick={() => setSearchValue('Search')}>
						<IoClose
							sx={{
								height: '100%',
								justifySelf: 'end',
								position: 'relative',
							}}
						/>
					</div>
				))}
			{searchValue !== ('Search' || '') &&
				searchValue.length > 3 &&
				searchValue === debouncedSearchValue && (
					<SearchList
						value={debouncedSearchValue}
						setIsLoading={setIsLoading}
					/>
				)}
		</div>
	)
}
export default Search
