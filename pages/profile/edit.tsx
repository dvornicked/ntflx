import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ProfileSidebar from '../../src/components/screens/Profile/Sidebar/ProfileSidebar'
import Input from '../../src/components/shared/Input/Input'
import Textarea from '../../src/components/shared/Textarea/Textarea'
import Button from '../../src/components/UI/Button/Button'
import { useAppSelector } from '../../src/hooks/useAppSelector'
import { IUser, UserRole } from '../../src/shared/types/user.interface'
import ErrorMessage from '../../src/components/shared/ErrorMessage/ErrorMessage'
import { useAppDispatch } from '../../src/hooks/useAppDispatch'
import { userActions } from '../../src/store/reducers/user/user.actions'

export type EditProfileType = Pick<IUser, 'username' | 'desc'>

const EditProfile = () => {
	const { user, error } = useAppSelector(state => state.user)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditProfileType>({
		mode: 'onChange',
	})
	const router = useRouter()
	const [username, setUsername] = useState(user?.username)
	const [desc, setDesc] = useState(user?.desc)
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<EditProfileType> = async data => {
		dispatch(userActions.update(data)).then(
			data =>
				data.type === userActions.update.fulfilled.type &&
				router.push('/profile'),
		)
	}
	return (
		<ProfileSidebar>
			<div
				sx={{
					mx: 4,
				}}
			>
				<h1
					sx={{
						textAlign: 'center',
					}}
				>
					Edit profile
				</h1>
				{error && <ErrorMessage error={error} />}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input<EditProfileType>
						rules={{
							required: 'Username is required',
							minLength: {
								value: 3,
								message: 'Username must be at least 3 characters',
							},
						}}
						name="username"
						register={register}
						error={errors.username}
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<Textarea<EditProfileType>
						name="desc"
						register={register}
						error={errors.desc}
						value={desc}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setDesc(e.target.value)
						}
					/>
					<Button
						sx={{
							mt: 3,
						}}
					>
						Submit changes
					</Button>
				</form>
			</div>
		</ProfileSidebar>
	)
}
EditProfile.access = UserRole.USER
export default EditProfile
