import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../src/components/shared/Input/Input'
import Textarea from '../../../src/components/shared/Textarea/Textarea'
import Button from '../../../src/components/UI/Button/Button'
import { genreService } from '../../../src/services/genre.service'
import { IGenre } from '../../../src/shared/types/genres.interface'

const EditGenre = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [desc, setDesc] = useState('')
	const [error, setError] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IGenre>({
		mode: 'onChange',
		defaultValues: {
			name,
			desc,
		},
	})
	const mutation = useMutation(
		['CREACTE_GENRE'],
		(data: Omit<IGenre, 'id'>) => genreService.createGenre(data),
		{
			onSuccess: () => {
				router.push('/admin/genres')
			},
			onError: error => {
				error instanceof Error ? setError(error.message) : setError('Error')
			},
		},
	)
	const onSubmit: SubmitHandler<Omit<IGenre, 'id'>> = async (
		data: Omit<IGenre, 'id'>,
	) => {
		mutation.mutate(data)
	}
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
					{error && <ErrorMessage error={error} />}
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
export default EditGenre
