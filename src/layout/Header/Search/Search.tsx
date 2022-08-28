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
				transition: 'width 0.3s ease-in-out',
				width: searchValue === 'Search' ? 'auto' : '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				lineHeight: 0,
				cursor: 'pointer',
				px: 2,
				border: '2px solid',
				borderImage:
					'linear-gradient(to bottom, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
				position: 'relative',
			}}
			{...props}
		>
			<IoSearch
				sx={{
					height: '100%',
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
					height: '100%',
					fontSize: 2,
					bg: 'transparent',
					border: 'none',
					color: 'text',
					px: 2,
				}}
				onFocus={() => setSearchValue('')}
				onBlur={() => setSearchValue('Search')}
				onChange={e => setSearchValue(e.target.value)}
			/>
			{searchValue !== 'Search' &&
				(isLoading ? (
					<Spinner size={24} color="white" />
				) : (
					<IoClose
						sx={{
							height: '100%',
							justifySelf: 'end',
							position: 'relative',
						}}
						onClick={() => setSearchValue('Search')}
					/>
				))}
			{searchValue !== ('Search' || '') && searchValue.length > 3 && (
				<SearchList value={debouncedSearchValue} setIsLoading={setIsLoading} />
			)}
		</div>
	)
}
export default Search
