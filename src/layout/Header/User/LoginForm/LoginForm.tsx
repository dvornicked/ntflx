import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/shared/Input/Input'
import { ILogin } from '../../../../shared/types/login.interface'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { userActions } from '../../../../store/reducers/user/user.actions'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { Spinner } from 'theme-ui'

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogin>({
		mode: 'onChange',
	})
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(state => state.user.isLoading)
	const onSubmit: SubmitHandler<ILogin> = (credentials: ILogin) => {
		dispatch(userActions.login(credentials))
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
			<Input<ILogin>
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
			<Input<ILogin>
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
				{isLoading ? <Spinner size={16} color="text" /> : 'Log In'}
			</Button>
		</form>
	)
}
export default LoginForm
