import { ForwardedRef, forwardRef } from 'react'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { IFormWrapperProps } from './FormWrapper.interface'

const FormWrapper = forwardRef(function FormWrapper(
	props: IFormWrapperProps,
	ref: ForwardedRef<HTMLDivElement>,
) {
	const { children, type, setType, ...rest } = props
	const error = useAppSelector(state => state.user.error)

	const content = {
		heading: type === 'login' ? 'Log In' : 'Sign Up',
		subheading:
			type === 'login'
				? 'Enter your credentials to access yourd account'
				: "Let's get started to create your account",
		question: {
			text:
				type === 'login'
					? "Don't have an account yet?"
					: 'Already have an account?',
		},
	}

	return (
		<div
			sx={{
				display: 'flex',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'rgba(0,0,0,0.5)',
			}}
			ref={ref}
			{...rest}
		>
			<div
				sx={{
					minWidth: '400px',
					backgroundColor: '#242424',
					margin: 'auto',
					p: 3,
					borderRadius: '5px',
				}}
			>
				<div
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<span sx={{ fontSize: 3 }}>{content.heading}</span>
					<span>{content.subheading}</span>
				</div>
				{children}
				{error && (
					<div
						sx={{
							textAlign: 'center',
							my: 2,
							p: 2,
							border: '1px solid #eb4d4b',
							backgroundColor: 'rgba(255, 121, 121, 0.3)',
							borderRadius: '5px',
						}}
					>
						{error}
					</div>
				)}
				<div
					sx={{
						mt: 1,
						textAlign: 'center',
						color: 'gray',
						cursor: 'pointer',
						transition: 'color 0.3s ease',
						'&:hover': {
							color: 'lightGray',
						},
					}}
					onClick={() => setType(type === 'login' ? 'register' : 'login')}
				>
					{content.question.text}
				</div>
			</div>
		</div>
	)
})
export default FormWrapper
