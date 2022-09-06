import { ITextareaProps } from './Textarea.interface'

const Textarea = <T,>(props: ITextareaProps<T>) => {
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
					mb: 1,
					'&:first-letter': {
						textTransform: 'capitalize',
					},
				}}
				htmlFor={name}
			>
				{name}
			</label>
			<textarea
				sx={{
					color: 'text',
					backgroundColor: 'transparent',
					resize: 'vertical',
					borderColor: '#444',
					borderRadius: '5px',
					p: 2,
					fontSize: 2,
					fontFamily: 'default',
				}}
				{...register(name, rules)}
				{...rest}
			></textarea>
			{error && (
				<span sx={{ color: '#eb4d4b', lineHeight: 1.4 }}>{error.message}</span>
			)}
		</div>
	)
}
export default Textarea
