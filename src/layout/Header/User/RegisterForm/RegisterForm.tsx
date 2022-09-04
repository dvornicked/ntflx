import { SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import Input from '../../../../components/shared/Input/Input'
import Button from '../../../../components/UI/Button/Button'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { IRegister } from '../../../../shared/types/register.interface'
import { userActions } from '../../../../store/reducers/user/user.actions'

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegister>({
		mode: 'onChange',
	})
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(state => state.user.isLoading)
	const onSubmit: SubmitHandler<IRegister> = (data: IRegister) => {
		dispatch(userActions.register(data))
	}

	return (
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
			<Button type="submit">
				{isLoading ? <Spinner size={16} color="text" /> : 'Sign Up'}
			</Button>
		</form>
	)
}
export default RegisterForm
