import { QueryClient, useMutation } from '@tanstack/react-query'
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'
import { IoStar } from 'react-icons/io5'
import { queryClient } from '../../../../pages/_app'
import { filmService } from '../../../services/film.service'
import Button from '../../UI/Button/Button'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { IRateFormProps } from './RateForm.interface'

const RateForm = forwardRef(function FormWrapper(
	props: IRateFormProps,
	ref: ForwardedRef<HTMLDivElement>,
) {
	const { filmId, setRateForm, ...rest } = props
	const [error, setError] = useState('')
	const [validMessage, setValidMessage] = useState('')
	const [currentRate, setCurrentRate] = useState(0)
	const [hoverRate, setHoverRate] = useState(0)

	useEffect(() => {
		setValidMessage('')
	}, [currentRate])

	const mutation = useMutation(
		['RATE_FILM', filmId],
		async () => await filmService.rate(filmId, currentRate),
		{
			onError: error => {
				if (error instanceof Error) setError(error.message)
				else setError('Something went wrong')
			},
			onSuccess: () => {
				queryClient.invalidateQueries([`GET_FILM_${filmId}`])
				queryClient.invalidateQueries(['GET_RATED_FILMS'])
				setRateForm(false)
			},
		},
	)
	return (
		<div
			sx={{
				display: 'flex',
				position: 'fixed',
				zIndex: 1,
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
					<span sx={{ fontSize: 2 }}>Rate the movie from 1 to 5</span>
					<span>Try to rate the film as objectively as possible</span>
				</div>
				<div
					sx={{
						my: 2,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{[1, 2, 3, 4, 5].map((value, index) => (
						<IoStar
							key={index}
							onClick={() => setCurrentRate(value)}
							onMouseEnter={() => setHoverRate(value)}
							onMouseLeave={() => setHoverRate(0)}
							sx={{
								mx: 1,
								cursor: 'pointer',
								color: (hoverRate || currentRate) >= value ? 'primary' : 'gray',
							}}
						/>
					))}
				</div>
				{validMessage && (
					<div sx={{ color: '#eb4d4b', lineHeight: 1.4, textAlign: 'center' }}>
						{validMessage}
					</div>
				)}
				{error && <ErrorMessage error={error} />}
				<Button
					sx={{ mt: 2 }}
					onClick={() => {
						if (currentRate === 0) {
							setValidMessage('You must rate the film')
						} else {
							mutation.mutate()
						}
					}}
				>
					Submit
				</Button>
			</div>
		</div>
	)
})

export default RateForm
