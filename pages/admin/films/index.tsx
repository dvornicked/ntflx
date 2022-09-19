import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { IoAdd, IoClose, IoCreate } from 'react-icons/io5'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import { filmService } from '../../../src/services/film.service'
import { UserRole } from '../../../src/shared/types/user.interface'
import { queryClient } from '../../_app'

const Actors = () => {
	const { data, isLoading, isError, error } = useQuery(
		['GET_FILMS'],
		async () => {
			const { data } = await filmService.getAll({})
			return data
		},
	)
	const [mutationError, setMutationError] = useState('')
	const mutation = useMutation(
		['REMOVE_FILM'],
		(id: number) => filmService.remove(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['GET_FILMS'])
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
						Films
					</h1>
					<Link href="/admin/films/create">
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
								textAlign: 'center',
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
								<th>Actors</th>
								<th>Genres</th>
								<th colSpan={2}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data?.films.map(film => (
								<tr key={film.id}>
									<td>
										<Link key={film.id} href={`/films/${film.id}`}>
											<a
												sx={{
													'&:hover': {
														borderBottom: '1px solid',
													},
												}}
											>
												{film.title}
											</a>
										</Link>
									</td>
									<td>{film.desc}</td>
									<td>
										{film.actors.map(actor => (
											<Link key={actor.id} href={`/actors/${actor.id}`}>
												<a
													sx={{
														mx: 1,
														'&:hover': {
															borderBottom: '1px solid',
														},
													}}
												>
													{actor.name}
												</a>
											</Link>
										))}
									</td>
									<td>
										{film.genres.map(genre => (
											<Link key={genre.id} href={`/genres/${genre.id}`}>
												<a
													sx={{
														mx: 1,
														'&:hover': {
															borderBottom: '1px solid',
														},
													}}
												>
													{genre.name}
												</a>
											</Link>
										))}
									</td>
									<td>
										<Link href={`films/edit/${film.id}`}>
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
											onClick={() => mutation.mutate(film.id)}
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
Actors.access = UserRole.ADMIN
export default Actors
