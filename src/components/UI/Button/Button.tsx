import { IButtonProps } from './Button.interface'

const Button = (props: IButtonProps) => {
	const { children, ...rest } = props
	return (
		<button
			sx={{
				backgroundColor: 'primary',
				border: 'none',
				borderRadius: '5px',
				color: 'text',
				width: '100%',
				cursor: 'pointer',
				fontSize: 2,
				lineHeight: 1.2,
				p: 2,
				transition: 'background-color 0.3s ease',
				'&:hover': {
					backgroundColor: '#f26236',
				},
				'&:active': {
					backgroundColor: '#f15627',
				},
			}}
			{...rest}
		>
			{children}
		</button>
	)
}
export default Button
