import { useQuery } from '@tanstack/react-query'
import { Spinner } from 'theme-ui'
import FilmCard from '../src/components/shared/FilmCard/FilmCard'
import { filmService } from '../src/services/film.service'

const Home = () => {
	const { data, isLoading } = useQuery(['GET_FILMS'], async () => {
		const { data } = await filmService.getAll({})
		const newFilms = data.films
			.sort((a, b) => {
				return (
					new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
				)
			})
			.slice(0, 3)
		const popularFilms = data.films
			.sort((a, b) => {
				return b.views - a.views
			})
			.slice(0, 3)
		const featuredFilms = data.films
			.sort((a, b) => {
				return b.rating - a.rating
			})
			.slice(0, 3)
		return {
			newFilms,
			popularFilms,
			featuredFilms,
		}
	})
	return isLoading ? (
		<Spinner
			size={34}
			color="white"
			sx={{
				mx: 'auto',
				mt: 5,
			}}
		/>
	) : (
		<div
			sx={{
				m: 3,
			}}
		>
			<div>
				<h2>New films</h2>
				<ul
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, 200px)',
						justifyContent: 'space-between',
						gap: '10px',
					}}
				>
					{data?.newFilms?.map(film => (
						<li key={film.id}>
							<FilmCard
								id={film.id}
								views={film.views}
								title={film.title}
								image={film.image}
								rating={film.rating}
								duration={film.duration}
								releaseDate={film.releaseDate}
								ratingCount={film.ratingCount}
							/>
						</li>
					))}
				</ul>
			</div>
			<div>
				<h2>Popular films</h2>

				<ul
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, 200px)',
						justifyContent: 'space-between',
						gap: '10px',
					}}
				>
					{data?.popularFilms?.map(film => (
						<li key={film.id}>
							<FilmCard
								id={film.id}
								views={film.views}
								title={film.title}
								image={film.image}
								rating={film.rating}
								duration={film.duration}
								releaseDate={film.releaseDate}
								ratingCount={film.ratingCount}
							/>
						</li>
					))}
				</ul>
			</div>
			<div>
				<h2>Featured films</h2>

				<ul
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, 200px)',
						justifyContent: 'space-between',
						gap: '10px',
					}}
				>
					{data?.featuredFilms?.map(film => (
						<li key={film.id}>
							<FilmCard
								id={film.id}
								views={film.views}
								title={film.title}
								image={film.image}
								rating={film.rating}
								duration={film.duration}
								releaseDate={film.releaseDate}
								ratingCount={film.ratingCount}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Home
