import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../src/components/shared/Input/Input'
import UploadFile from '../../../src/components/shared/UploadFile/UploadFile'
import Button from '../../../src/components/UI/Button/Button'
import { actorService } from '../../../src/services/actor.service'
import { IActorCreate } from '../../../src/shared/types/actors.interface'
import { UserRole } from '../../../src/shared/types/user.interface'
import Image from 'next/image'

const Create = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IActorCreate>({
		mode: 'onChange',
	})
	const [imageUrl, setImageUrl] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
	const mutation = useMutation(
		['ACTOR_CREATE'],
		async (data: IActorCreate) => {
			return await actorService.create({ ...data, image: imageUrl })
		},
		{
			onSuccess: () => {
				router.push('/admin/actors')
			},
			onError: error => {
				error instanceof Error ? setError(error.message) : setError('Error')
			},
		},
	)

	const onSubmit = async (data: IActorCreate) => {
		mutation.mutate(data)
	}

	return (
		<AdminSidebar>
			<div
				sx={{
					m: 4,
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
					<Input<IActorCreate>
						register={register}
						name="name"
						error={errors.name}
						rules={{
							required: 'Name is required',
						}}
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
							mx: 'auto',
							width: '300px',
						}}
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

Create.access = UserRole.ADMIN
export default Create
