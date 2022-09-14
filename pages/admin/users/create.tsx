import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../src/components/shared/Input/Input'
import Button from '../../../src/components/UI/Button/Button'
import { userService } from '../../../src/services/user.service'
import { IRegister } from '../../../src/shared/types/register.interface'

const Create = () => {
	const [error, setError] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegister>({
		mode: 'onChange',
	})
	const router = useRouter()
	const onSubmit: SubmitHandler<IRegister> = async data => {
		mutation.mutate(data)
	}
	const mutation = useMutation(
		['CREATE_USER'],
		async (credentials: IRegister) => {
			return await userService.register(credentials)
		},
		{
			onSuccess: () => {
				router.push('/admin/genres')
			},
			onError: error => {
				error instanceof Error ? setError(error.message) : setError('Error')
			},
		},
	)
	return (
		<AdminSidebar>
			<div
				sx={{
					mx: 3,
				}}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						'& > div': {
							my: 3,
						},
					}}
				>
					<Input<IRegister>
						register={register}
						name="email"
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Invalid email address',
							},
						}}
						error={errors.email}
					/>
					<Input<IRegister>
						register={register}
						name="username"
						rules={{
							required: 'Username is required',
							minLength: {
								value: 3,
								message: 'Username must be at least 3 characters',
							},
						}}
						error={errors.username}
					/>
					<Input<IRegister>
						type="password"
						name="password"
						register={register}
						rules={{
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'Password must have at least 8 characters',
							},
						}}
						error={errors.password}
					/>
					{error && <ErrorMessage error={error} />}
					<Button type="submit">
						{mutation.isLoading ? <Spinner size={16} color="text" /> : 'Create'}
					</Button>
				</form>
			</div>
		</AdminSidebar>
	)
}
export default Create
