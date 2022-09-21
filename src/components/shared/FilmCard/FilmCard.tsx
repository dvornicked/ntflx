import Link from 'next/link'
import { IFilmCardProps } from './FilmCard.interface'
import Image from 'next/image'

const FilmCard = (props: IFilmCardProps) => {
	const {
		id,
		image,
		releaseDate,
		duration,
		rating,
		ratingCount,
		title,
		...rest
	} = props
	return (
		<div
			{...rest}
			sx={{
				display: 'inline-block',
				transition: 'transform .2s ease-in-out',
				':hover': {
					transform: 'scale(1.05)',
				},
			}}
		>
			<Link href={`/films/${id}`}>
				<a>
					<div
						sx={{
							width: '200px',
						}}
					>
						<Image
							src={image}
							width="300px"
							height="400px"
							alt="Poster"
							sx={{
								borderRadius: 4,
							}}
						/>
					</div>
					<div
						sx={{
							textAlign: 'center',
							fontSize: 2,
							p: 1,
						}}
					>
						{title}
					</div>
					<div
						sx={{
							display: 'flex',
							justifyContent: 'space-evenly',
						}}
					>
						<span>{new Date(releaseDate).getFullYear()} year</span>
						<span>|</span>
						<span>{duration} minutes</span>
					</div>
				</a>
			</Link>
		</div>
	)
}
export default FilmCard
