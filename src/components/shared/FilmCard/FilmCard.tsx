import Link from 'next/link'
import { IFilmCardProps } from './FilmCard.interface'
import Image from 'next/image'

const FilmCard = (props: IFilmCardProps) => {
	const { id, image, rating, ratingCount, title, ...rest } = props
	return (
		<div
			{...rest}
			sx={{
				display: 'inline-block',
				border: '1px solid',
				width: '300px',
				height: '400px',
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
							width="100%"
							height="100%"
							alt="Poster"
							sx={{
								borderRadius: 4,
							}}
						/>
					</div>
					<div
						sx={{
							textAlign: 'center',
						}}
					>
						{title}
					</div>
					<div></div>
				</a>
			</Link>
		</div>
	)
}
export default FilmCard
