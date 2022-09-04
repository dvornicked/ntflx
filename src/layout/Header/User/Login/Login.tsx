import { useRef, useState } from 'react'
import { IoLogIn } from 'react-icons/io5'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { UserSlice } from '../../../../store/reducers/user/user.slice'
import FormWrapper from '../FormWrapper/FormWrapper'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'

const Login = () => {
	const [showForm, setShowForm] = useState(false)
	const [type, setType] = useState<'login' | 'register'>('login')
	const wrapperRef = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()
	return (
		<>
			<div
				sx={{ display: 'flex', alignItems: 'center', mx: 2, cursor: 'pointer' }}
				onClick={() => setShowForm(true)}
			>
				<IoLogIn />
				<span
					sx={{
						fontSize: 2,
						ml: 2,
					}}
				>
					Login
				</span>
			</div>
			{showForm && (
				<FormWrapper
					type={type}
					setType={setType}
					ref={wrapperRef}
					onClick={e => {
						if (wrapperRef.current === e.target) {
							setShowForm(false)
							dispatch(UserSlice.actions.resetError())
						}
					}}
				>
					{type === 'login' ? <LoginForm /> : <RegisterForm />}
				</FormWrapper>
			)}
		</>
	)
}
export default Login
