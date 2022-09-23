import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Spinner } from 'theme-ui'
import { filmService } from '../../src/services/film.service'
import Image from 'next/image'
import { useAppSelector } from '../../src/hooks/useAppSelector'
import Button from '../../src/components/UI/Button/Button'
import RateForm from '../../src/components/shared/RateForm/RateForm'
import { useRef, useState } from 'react'
import { userService } from '../../src/services/user.service'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { queryClient } from '../_app'

const FilmPage = () => {
	const router = useRouter()
	const { id: idString } = router.query
	const id = Number(idString)

	const { user } = useAppSelector(state => state.user)
	const rateFormRef = useRef<HTMLDivElement>(null)
	const [rateForm, setRateForm] = useState(false)
	const mutation = useMutation(
		['FAVORITE_FILM', id],
		async () => {
			const { data } = await userService.favFilm(id)
			return data
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['GET_FAVORITED_FILMS', id])
			},
		},
	)
	const { data: ratedFilm, isLoading: isRatedFilmsLoading } = useQuery(
		['GET_RATED_FILMS', id],
		async () => {
			const { films } = await filmService.rated()
			return films.find(film => film.id === id)
		},
	)
	const { data, error, isLoading } = useQuery(
		[`GET_FILM_${id}`, id],
		async () => {
			const { data } = await filmService.getOne(id)
			return data
		},
	)
	const { data: isFavorited, isLoading: isFavFilmsLoading } = useQuery(
		['GET_FAVORITED_FILMS', id],
		async () => {
			const { data } = await userService.getFavFilms()
			return data.films.some(film => film.id === id)
		},
	)
	if (isLoading || isRatedFilmsLoading || isFavFilmsLoading)
		return <Spinner color="text" sx={{ m: 'auto' }} />
	if (!data)
		return (
			<div
				sx={{
					m: 'auto',
					fontSize: 3,
				}}
			>
				{error instanceof Error ? error.message : 'Error'}
			</div>
		)
	return (
		<div>
			{rateForm && (
				<RateForm
					filmId={id}
					setRateForm={setRateForm}
					ref={rateFormRef}
					onClick={e => {
						if (rateFormRef.current === e.target) {
							setRateForm(false)
						}
					}}
				/>
			)}
			<div
				sx={{
					m: 3,
					display: 'grid',
					gridTemplateColumns: '300px 1fr',
					p: {
						fontSize: 2,
					},
				}}
			>
				<div>
					<div
						sx={{
							position: 'relative',
							height: '400px',
						}}
					>
						<Image
							src={data.image}
							alt={data.title}
							layout="fill"
							sx={{
								borderRadius: '5px',
							}}
						/>
						<div
							sx={{
								position: 'absolute',
								top: 0,
								right: 0,
								bg: 'primary',
								p: 2,
								borderRadius: '0 5px 0 5px',
							}}
						>
							<span>{data.rating.toFixed(1)}</span>
						</div>
						<div
							sx={{
								position: 'absolute',
								bottom: 0,
								right: 0,
								border: '1px solid',
								bg: 'rgba(0,0,0,0.5)',
								lineHeight: 0,
								color: 'primary',
								cursor: 'pointer',
								p: 2,
								borderRadius: '5px 0 5px 0',
							}}
							onClick={async () => {
								mutation.mutate()
							}}
						>
							{isFavorited ? <IoHeart /> : <IoHeartOutline />}
						</div>
					</div>
					<div
						sx={{
							textAlign: 'center',
							fontSize: 2,
						}}
					>
						{user ? (
							ratedFilm ? (
								<div
									sx={{
										my: 1,
									}}
								>
									You have already rated this movie {ratedFilm.rate} stars.{' '}
									<span
										sx={{
											color: 'primary',
											cursor: 'pointer',
										}}
										onClick={() => setRateForm(true)}
									>
										Change?
									</span>
								</div>
							) : (
								<Button sx={{ my: 1 }} onClick={() => setRateForm(true)}>
									Rate the film
								</Button>
							)
						) : (
							'Login to rate'
						)}
					</div>
				</div>
				<div
					sx={{
						mx: 4,
					}}
				>
					<h1
						sx={{
							textAlign: 'center',
						}}
					>
						{data.title}
					</h1>
					<p>{data.desc}</p>
					<p>Release Date: {data.releaseDate.split('-').reverse().join('.')}</p>
					<p>Daration: {data.duration} minutes</p>
					<div>
						<h2>Genres</h2>
						<ul
							sx={{
								display: 'flex',
							}}
						>
							{data.genres.map(genre => (
								<li
									key={genre.id}
									sx={{
										mr: 2,
										':last-child': {
											mr: 0,
										},
									}}
								>
									{genre.name}
								</li>
							))}
						</ul>
					</div>
					<div>
						<h2>Actors</h2>
						<ul
							sx={{
								display: 'flex',
							}}
						>
							{data.actors.map(actor => (
								<li
									key={actor.id}
									sx={{
										mr: 2,
										':last-child': {
											mr: 0,
										},
									}}
								>
									<div>
										<div
											sx={{
												width: '80px',
											}}
										>
											<Image
												src={actor.image}
												title={actor.name}
												alt={actor.name}
												width="80px"
												height="100px"
												sx={{
													borderRadius: '5px',
												}}
											/>
										</div>
										<div
											sx={{
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												whiteSpace: 'nowrap',
												width: '80px',
												textAlign: 'center',
											}}
										>
											{actor.name}
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
					<video
						sx={{
							borderRadius: '5px',
						}}
						src={data.video}
						controls
						width="100%"
					/>
				</div>
			</div>
		</div>
	)
}
export default FilmPage
