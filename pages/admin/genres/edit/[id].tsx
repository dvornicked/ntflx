import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../../src/components/shared/Input/Input'
import Textarea from '../../../../src/components/shared/Textarea/Textarea'
import Button from '../../../../src/components/UI/Button/Button'
import { genreService } from '../../../../src/services/genre.service'
import { IGenre } from '../../../../src/shared/types/genres.interface'
import { UserRole } from '../../../../src/shared/types/user.interface'

const EditGenre = () => {
	const router = useRouter()
	const { id: idString } = router.query
	const id = Number(idString)
	const { data, error, isLoading } = useQuery(['GET_GENRE', id], () =>
		genreService.getGenre(id),
	)
	const [mutationError, setMutationError] = useState('')
	const [name, setName] = useState('')
	const [desc, setDesc] = useState('')
	const mutation = useMutation(
		['EDIT_GENRE'],
		(data: Omit<IGenre, 'id'>) => genreService.updateGenre(id, data),
		{
			onSuccess: () => {
				router.push('/admin/users')
			},
			onError: error => {
				error instanceof Error
					? setMutationError(error.message)
					: setMutationError('Error')
			},
		},
	)
	useEffect(() => {
		if (data) {
			setName(data.name)
			setDesc(data.desc)
			reset({ name: data.name, desc: data.desc })
		}
	}, [data]) // eslint-disable-line react-hooks/exhaustive-deps
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IGenre>({
		mode: 'onChange',
		defaultValues: {
			name,
			desc,
		},
	})
	const onSubmit: SubmitHandler<Omit<IGenre, 'id'>> = async (
		data: Omit<IGenre, 'id'>,
	) => {
		mutation.mutate(data)
	}
	if (isLoading) return <Spinner color="text" sx={{ m: 'auto' }} />
	if (error)
		return (
			<div
				sx={{
					m: 'auto',
					fontSize: 3,
				}}
			>
				{error instanceof Error ? error.message : 'Error'}
			</div>
		)
	return (
		<div>
			<AdminSidebar>
				<form
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						mx: 3,
					}}
				>
					<h1
						sx={{
							textAlign: 'center',
						}}
					>
						Edit Genre
					</h1>
					{mutationError && <ErrorMessage error={mutationError} />}
					<Input<IGenre>
						name="name"
						register={register}
						rules={{ required: 'Name is required' }}
						error={errors.name}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Textarea<IGenre>
						name="desc"
						register={register}
						rules={{
							required: 'Description is required',
						}}
						error={errors.desc}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setDesc(e.target.value)
						}
						value={desc}
					/>
					<Button
						sx={{
							mt: 2,
						}}
						type="submit"
					>
						Save
					</Button>
				</form>
			</AdminSidebar>
		</div>
	)
}
EditGenre.access = UserRole.ADMIN
export default EditGenre
