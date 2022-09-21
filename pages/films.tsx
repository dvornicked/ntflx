import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Spinner } from 'theme-ui'
import ErrorMessage from '../src/components/shared/ErrorMessage/ErrorMessage'
import { useDebounce } from '../src/hooks/useDebounce'
import { filmService } from '../src/services/film.service'

const Films = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchValue = useDebounce(searchTerm, 500)
	const { data, isLoading, error, isError } = useQuery(
		['GET_FILMS', debouncedSearchValue],
		async () => {
			const { data } = await filmService.getAll({ title: debouncedSearchValue })
			return data
		},
	)

	return (
		<div
			sx={{
				m: 3,
			}}
		>
			<div
				sx={{
					borderRadius: '5px',
					borderLeft: '2px solid #323232',
					borderRight: '2px solid #323232',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<input
					value={searchTerm}
					placeholder="Search films..."
					sx={{
						display: 'block',
						width: '100%',
						fontSize: 3,
						color: 'text',
						bg: 'transparent',
						border: '1px solid',
						borderTop: 'none',
						borderBottom: '1px solid',
						borderColor: '#383232',
						borderImage:
							'linear-gradient(to right, transparent 1%, rgba(80,80,80,.7) 50%, transparent 99%) 1',
						p: 2,
					}}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				{searchTerm !== '' &&
					(isLoading ? (
						<Spinner size={24} color="white" />
					) : (
						<IoClose
							sx={{
								mx: 2,
								minWidth: 34,
								height: '100%',
								justifySelf: 'end',
								position: 'relative',
								cursor: 'pointer',
								color: 'gray',
								transition: 'color .2s ease-in-out',
								':hover': {
									color: 'white',
								},
							}}
							onClick={() => setSearchTerm('')}
						/>
					))}
			</div>
			{isLoading && (
				<Spinner
					color="white"
					sx={{
						display: 'block',
						m: 'auto',
					}}
				/>
			)}
			{data && (
				<ul>
					{data?.films.map(film => (
						<li key={film.id}>{film.title}</li>
					))}
				</ul>
			)}
			{data?.count === 0 && (
				<p
					sx={{
						textAlign: 'center',
						fontSize: 3,
						color: 'text',
						mt: 3,
					}}
				>
					No films found
				</p>
			)}
			{isError && (
				<div>
					<ErrorMessage
						error={
							error instanceof Error ? error.message : 'Something went wrong'
						}
					/>
				</div>
			)}
		</div>
	)
}
export default Films
