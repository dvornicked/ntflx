import { IErrorMessageProps } from './ErrorMessage.interface'

const ErrorMessage = (props: IErrorMessageProps) => {
	const { error, ...rest } = props
	return (
		<div
			sx={{
				textAlign: 'center',
				my: 2,
				p: 2,
				border: '1px solid #eb4d4b',
				backgroundColor: 'rgba(255, 121, 121, 0.3)',
				borderRadius: '5px',
			}}
			{...rest}
		>
			{error}
		</div>
	)
}
export default ErrorMessage
