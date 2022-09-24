import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { IoAdd, IoClose, IoCreate } from 'react-icons/io5'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import { genreService } from '../../../src/services/genre.service'
import { UserRole } from '../../../src/shared/types/user.interface'
import { queryClient } from '../../_app'

const Genres = () => {
	const { data, isLoading, isError, error } = useQuery(['GET_GENRES'], () =>
		genreService.getAll({}),
	)
	const [mutationError, setMutationError] = useState('')
	const mutation = useMutation(
		['REMOVE_GENRE'],
		(id: number) => genreService.removeGenre(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['GET_GENRES'])
				setMutationError('')
			},
			onError: error => {
				if (error instanceof Error) setMutationError(error.message)
				else setMutationError('An unknown error occurred')
			},
		},
	)

	return (
		<AdminSidebar>
			<div sx={{ mx: 3 }}>
				<div
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<h1
						sx={{
							textAlign: 'center',
						}}
					>
						Genres
					</h1>
					<Link href="/admin/genres/create">
						<a
							sx={{
								lineHeight: 0,
							}}
						>
							<IoAdd
								sx={{
									'&:hover': {
										fill: 'white',
									},
								}}
							/>
						</a>
					</Link>
				</div>
				{isError && (
					<ErrorMessage
						error={error instanceof Error ? error.message : 'Error'}
					/>
				)}
				{mutationError && <ErrorMessage error={mutationError} />}
				{isLoading ? (
					<div
						sx={{
							display: 'flex',
						}}
					>
						<Spinner
							sx={{
								m: 'auto',
							}}
							color="white"
						/>
					</div>
				) : (
					<table
						sx={{
							width: '100%',
							borderCollapse: 'collapse',

							'& th, & td': {
								border: '1px solid',
								borderColor: 'gray',
								p: 2,
							},

							svg: {
								fill: 'gray',

								'&:hover': {
									fill: 'text',
								},
							},
						}}
					>
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th colSpan={2}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data?.genres.map(genre => (
								<tr key={genre.id}>
									<td>{genre.name}</td>
									<td>
										<div>{genre.desc}</div>
									</td>
									<td>
										<Link href={`genres/edit/${genre.id}`}>
											<a>
												<IoCreate />
											</a>
										</Link>
									</td>
									<td>
										<IoClose
											sx={{
												cursor: 'pointer',
											}}
											onClick={() => mutation.mutate(genre.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</AdminSidebar>
	)
}
Genres.access = UserRole.ADMIN
export default Genres
