import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import SettingsSidebar from '../../src/components/screens/Settings/SettingsSidebar'
import ErrorMessage from '../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../src/components/shared/Input/Input'
import Button from '../../src/components/UI/Button/Button'
import { userService } from '../../src/services/user.service'
import { IResponseError } from '../../src/shared/types/response.interface'
import { UserRole } from '../../src/shared/types/user.interface'

export interface IUpdatePassword {
	password: string
}

const Password = () => {
	const [error, setError] = useState('')
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUpdatePassword>({
		mode: 'onChange',
	})
	const mutation = useMutation(['updatePassword'], async (password: string) => {
		try {
			await userService.updatePassword(password)
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const error = e.response?.data as IResponseError
				setError(error.message)
			} else setError('Something went wrong')
		}
	})
	const onSubmit: SubmitHandler<IUpdatePassword> = data => {
		setError('')
		mutation.mutate(data.password)
		if (!error) {
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
				<Input<IUpdatePassword>
					register={register}
					name="password"
					error={errors.password}
					rules={{
						required: 'Password is required',
						minLength: {
							value: 8,
							message: 'Password must be at least 8 characters',
						},
					}}
				/>
				{error && <ErrorMessage error={error} />}
				<Button
					sx={{
						mt: 2,
					}}
				>
					Change password
				</Button>
			</form>
		</SettingsSidebar>
	)
}
Password.access = UserRole.USER
export default Password
