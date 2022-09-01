import { useState } from 'react'
import { IoLogIn } from 'react-icons/io5'
import FormWrapper from '../FormWrapper/FormWrapper'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'

const Login = () => {
	const [showForm, setShowForm] = useState(false)
	const [type, setType] = useState<'login' | 'register'>('login')
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
				<FormWrapper type={type} setType={setType}>
					{type === 'login' ? <LoginForm /> : <RegisterForm />}
				</FormWrapper>
			)}
		</>
	)
}
export default Login
