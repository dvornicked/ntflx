import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { IoAdd, IoClose, IoCreate } from 'react-icons/io5'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import { actorService } from '../../../src/services/actor.service'
import { UserRole } from '../../../src/shared/types/user.interface'
import { queryClient } from '../../_app'

const Actors = () => {
	const { data, isLoading, isError, error } = useQuery(['GET_ACTORS'], () =>
		actorService.getAll(),
	)
	const [mutationError, setMutationError] = useState('')
	const mutation = useMutation(
		['REMOVE_ACTOR'],
		(id: number) => actorService.remove(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['GET_ACTORS'])
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
						Actors
					</h1>
					<Link href="/admin/actors/create">
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
								<th colSpan={2}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data?.actors.map(actor => (
								<tr key={actor.id}>
									<td>{actor.name}</td>
									<td>
										<Link href={`actors/edit/${actor.id}`}>
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
											onClick={() => mutation.mutate(actor.id)}
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
