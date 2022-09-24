import { IInputProps } from './Input.interface'

const Input = <T,>(props: IInputProps<T>) => {
	const { name, register, rules, error, ...rest } = props
	return (
		<div
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<label
				sx={{
					'&:first-letter': {
						textTransform: 'capitalize',
					},
				}}
				htmlFor={name}
			>
				{name}
			</label>
			<input
				sx={{
					color: 'text',
					backgroundColor: 'transparent',
					border: 'none',
					borderBottom: '1px solid',
					borderImage:
						'linear-gradient(to right, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
					borderRadius: '5px',
					fontSize: 3,
					p: 1,
				}}
				type={name}
				{...register(name, rules)}
				{...rest}
			/>
			{error && (
				<span sx={{ color: '#eb4d4b', lineHeight: 1.4 }}>{error.message}</span>
			)}
		</div>
	)
}
export default Input
