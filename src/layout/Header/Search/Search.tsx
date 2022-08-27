import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { ISearchProps } from './Search.interface'

const Search = (props: ISearchProps) => {
	const [searchValue, setSearchValue] = useState('Search')
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
			}}
			{...props}
		>
			<IoSearch />
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
		</div>
	)
}
export default Search
