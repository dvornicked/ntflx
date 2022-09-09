import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import SettingsSidebar from '../../src/components/screens/Settings/SettingsSidebar'
import ErrorMessage from '../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../src/components/shared/Input/Input'
import Button from '../../src/components/UI/Button/Button'
import { useAppDispatch } from '../../src/hooks/useAppDispatch'
import { useAppSelector } from '../../src/hooks/useAppSelector'
import { userService } from '../../src/services/user.service'
import { IResponseError } from '../../src/shared/types/response.interface'
import { UserRole } from '../../src/shared/types/user.interface'
import { UserSlice } from '../../src/store/reducers/user/user.slice'

export interface IUpdateEmail {
	email: string
}

const Email = () => {
	const dispatch = useAppDispatch()
	const userEmail = useAppSelector(state => state.user.user?.email)
	const [email, setEmail] = useState<string>(userEmail!)
	const [error, setError] = useState('')
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdateEmail>({
		mode: 'onChange',
		defaultValues: {
			email: userEmail,
		},
	})
	const mutation = useMutation(['updateEmail'], async (email: string) => {
		if (email === userEmail) router.push('/settings')
		try {
			await userService.updateEmail(email)
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const error = e.response?.data as IResponseError
				setError(error.message)
			} else setError('Something went wrong')
		}
	})
	const onSubmit: SubmitHandler<IUpdateEmail> = data => {
		setError('')
		mutation.mutate(data.email)
		if (!error) {
			dispatch(UserSlice.actions.updateEmail(data.email))
			router.push('/profile')
		}
	}
	return (
		<SettingsSidebar>
			<form
				sx={{
					mx: 4,
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input<IUpdateEmail>
					register={register}
					name="email"
					error={errors.email}
					rules={{
						required: 'Email is required',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Email is invalid',
						},
					}}
				/>
				{error && <ErrorMessage error={error} />}
				<Button
					sx={{
						mt: 2,
					}}
				>
					Change Email
				</Button>
			</form>
		</SettingsSidebar>
	)
}
Email.access = UserRole.USER
export default Email
