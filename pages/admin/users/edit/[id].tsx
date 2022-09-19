import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../../src/components/shared/Input/Input'
import Textarea from '../../../../src/components/shared/Textarea/Textarea'
import UploadFile from '../../../../src/components/shared/UploadFile/UploadFile'
import Button from '../../../../src/components/UI/Button/Button'
import { userService } from '../../../../src/services/user.service'
import { IUser, UserRole } from '../../../../src/shared/types/user.interface'
import Image from 'next/image'
import ReactSelect from 'react-select'
import { EditProfileType } from '../../../profile/edit'

const EditGenre = () => {
	const router = useRouter()
	const { id: idString } = router.query
	const id = Number(idString)
	const { data, error, isLoading } = useQuery(['GET_USER', id], async () => {
		if (id) return await userService.getOne(id)
		else return null
	})

	const [mutationError, setMutationError] = useState('')
	const [username, setUsername] = useState('')
	const [desc, setDesc] = useState('')
	const [email, setEmail] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [role, setRole] = useState<UserRole>(UserRole.USER)
	const mutatationAvatar = useMutation(
		['UPDATE_AVATAR'],
		async () => {
			if (id) return await userService.updateAvatarById(id, imageUrl)
			else return null
		},
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
	const mutationProfile = useMutation(
		['UPDATE_PROFILE'],
		async () => {
			if (id) return await userService.updateProfileById(id, { username, desc })
			else return null
		},
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
	const mutationRole = useMutation(
		['UPDATE_ROLE'],
		async () => {
			if (id) return await userService.updateRole(id, role)
			else return null
		},
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
	const mutationEmail = useMutation(
		['UPDATE_EMAIL'],
		async () => {
			if (id) return await userService.updateEmailById(id, email)
			else return null
		},
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
			setUsername(data.username)
			setDesc(data.desc)
			setEmail(data.email)
			setImageUrl(data.image)
			setRole(data.role)
			reset({
				username: data.username,
				desc: data.desc,
			})
			emailReset({
				email: data.email,
			})
		}
	}, [data]) // eslint-disable-line react-hooks/exhaustive-deps
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<EditProfileType>({
		mode: 'onChange',
		defaultValues: {
			username,
			desc,
		},
	})
	const {
		register: emailRegister,
		handleSubmit: emailHandleSubmit,
		formState: { errors: emailErrors },
		reset: emailReset,
	} = useForm<Pick<IUser, 'email'>>({
		mode: 'onChange',
	})
	const roleOptions = [
		{
			label: 'ADMIN',
			value: UserRole.ADMIN,
		},
		{
			label: 'USER',
			value: UserRole.USER,
		},
	]
	const onSubmit: SubmitHandler<EditProfileType> = async () => {
		return mutationProfile.mutate()
	}
	const onEmailSubmit: SubmitHandler<Pick<IUser, 'email'>> = async () => {
		return mutationEmail.mutate()
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
	if (!data) return null
	return (
		<div>
			<AdminSidebar>
				<div
					sx={{
						m: 4,
					}}
				>
					<h1
						sx={{
							textAlign: 'center',
						}}
					>
						Edit user
					</h1>
					{mutationError && <ErrorMessage error={mutationError} />}
					<div>
						<h2>Change avatar</h2>
						<div
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{imageUrl && (
								<Image
									sx={{
										borderRadius: '5px',
									}}
									src={imageUrl}
									width="300px"
									height="300px"
									alt="Avatar"
								/>
							)}
						</div>
						<UploadFile
							accept="image/*"
							setImageUrl={setImageUrl}
							styles={{
								my: 2,
								mx: 'auto',
								width: '300px',
							}}
						/>
						<Button
							sx={{
								width: '300px',
								mx: 'auto',
								mb: 2,
								display: 'block',
							}}
							onClick={() => {
								if (imageUrl) {
									mutatationAvatar.mutate()
									router.push('/profile')
								}
							}}
						>
							Update avatar
						</Button>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h2>Update Profile</h2>
						<Input<EditProfileType>
							name="username"
							register={register}
							rules={{ required: 'Name is required' }}
							error={errors.username}
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<Textarea<EditProfileType>
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
							onClick={() => mutationEmail.mutate()}
						>
							Save
						</Button>
					</form>
					<form onSubmit={emailHandleSubmit(onEmailSubmit)}>
						<h2>Update Email</h2>
						<Input<Pick<IUser, 'email'>>
							name="email"
							register={emailRegister}
							rules={{
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
							}}
							error={emailErrors.email}
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Button
							sx={{
								mt: 2,
							}}
						>
							Save
						</Button>
					</form>
					<div>
						<h2>Update Role</h2>
						<ReactSelect
							sx={{
								my: 2,
								color: 'black',
							}}
							defaultValue={
								roleOptions[
									roleOptions.findIndex(role => role.value === data.role)
								]
							}
							options={roleOptions}
							onChange={option => {
								if (option) {
									setRole(option.value)
								}
							}}
						/>
						<Button
							sx={{
								mt: 2,
							}}
							onClick={() => mutationRole.mutate()}
						>
							Save
						</Button>
					</div>
				</div>
			</AdminSidebar>
		</div>
	)
}
EditGenre.access = UserRole.ADMIN
export default EditGenre
