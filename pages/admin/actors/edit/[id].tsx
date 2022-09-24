import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../../src/components/shared/Input/Input'
import UploadFile from '../../../../src/components/shared/UploadFile/UploadFile'
import Button from '../../../../src/components/UI/Button/Button'
import { actorService } from '../../../../src/services/actor.service'
import { IActorUpdate } from '../../../../src/shared/types/actors.interface'
import { UserRole } from '../../../../src/shared/types/user.interface'
import Image from 'next/image'

const Edit = () => {
	const router = useRouter()
	const { id: idString } = router.query
	const id = Number(idString)
	const { data, error, isLoading } = useQuery(['GET_ACTOR', id], () =>
		actorService.getOne(id),
	)
	const [mutationError, setMutationError] = useState('')
	const [name, setName] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const mutation = useMutation(
		['EDIT_ACTOR'],
		(data: IActorUpdate) => actorService.update(id, data),
		{
			onSuccess: () => {
				router.push('/admin/actors')
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
			setImageUrl(data.image)
			reset({ name: data.name, image: data.image })
		}
	}, [data]) // eslint-disable-line react-hooks/exhaustive-deps
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IActorUpdate>({
		mode: 'onChange',
		defaultValues: {
			name,
			image: imageUrl,
		},
	})
	const onSubmit: SubmitHandler<IActorUpdate> = async () => {
		mutation.mutate({ name, image: imageUrl })
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
						Edit actor
					</h1>
					{mutationError && <ErrorMessage error={mutationError} />}
					<Input<IActorUpdate>
						name="name"
						register={register}
						rules={{ required: 'Name is required' }}
						error={errors.name}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<label>Image</label>
					{imageUrl && (
						<div
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Image
								sx={{
									borderRadius: '5px',
								}}
								src={imageUrl}
								width="300px"
								height="300px"
								alt="Avatar"
							/>
						</div>
					)}
					<UploadFile
						accept="image/*"
						setImageUrl={setImageUrl}
						styles={{
							mt: 2,
							mx: 'auto',
							width: '300px',
						}}
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
Edit.access = UserRole.ADMIN
export default Edit
