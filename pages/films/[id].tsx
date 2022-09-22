import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Spinner } from 'theme-ui'
import { filmService } from '../../src/services/film.service'
import Image from 'next/image'

const FilmPage = () => {
	const router = useRouter()
	const { id: idString } = router.query
	const id = Number(idString)
	const { data, error, isLoading } = useQuery(
		[`GET_FILM_${id}`, id],
		async () => {
			const { data } = await filmService.getOne(id)
			return data
		},
	)
	if (isLoading) return <Spinner color="text" sx={{ m: 'auto' }} />
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
					<Image
						src={data.image}
						alt={data.title}
						width="300px"
						height="400px"
						sx={{
							borderRadius: '5px',
						}}
					/>
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
