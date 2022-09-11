import { useState } from 'react'
import { IoAdd, IoClose, IoCreate } from 'react-icons/io5'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import { userService } from '../../../src/services/user.service'
import { UserRole } from '../../../src/shared/types/user.interface'
import { queryClient } from '../../_app'

const Users = () => {
	const { data, isLoading, isError, error } = useQuery(['GET_USERS'], () =>
		userService.getAll({}),
	)
	const [mutationError, setMutationError] = useState('')
	const mutation = useMutation(
		['REMOVE_USER'],
		(id: number) => userService.remove(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['GET_USERS'])
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
						Users
					</h1>
					<Link href="/admin/users/create">
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
								textAlign: 'center',
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
								<th>Username</th>
								<th>Email</th>
								<th>Role</th>
								<th>Created At</th>
								<th colSpan={2}>Actions</th>
							</tr>
						</thead>
						<tbody>
							{data?.users.map(user => (
								<tr key={user.id}>
									<td>
										<Link href={`/profile/${user.id}`}>
											<a
												sx={{
													'&:hover': {
														borderBottom: '1px solid',
													},
												}}
											>
												{user.username}
											</a>
										</Link>
									</td>
									<td>
										<div>{user.email}</div>
									</td>
									<td>
										<div>{user.role}</div>
									</td>
									<td>
										<div>{user.createdAt}</div>
									</td>
									<td>
										<Link href={`users/edit/${user.id}`}>
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
											onClick={() => mutation.mutate(user.id)}
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
Users.access = UserRole.ADMIN
export default Users
