import Link from 'next/link'
import { IFilmCardProps } from './FilmCard.interface'
import Image from 'next/image'
import { IoEyeOutline } from 'react-icons/io5'

const FilmCard = (props: IFilmCardProps) => {
	const {
		id,
		image,
		releaseDate,
		duration,
		rating,
		ratingCount,
		title,
		views,
		...rest
	} = props
	return (
		<div
			{...rest}
			sx={{
				display: 'inline-block',
				position: 'relative',
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
						<span>{rating.toFixed(1)}</span>
					</div>
					<div
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							p: 2,
							borderRadius: '5px 0 5px 0',
						}}
					>
						<div
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<span
								sx={{
									fontSize: 0,
								}}
							>
								{views}
							</span>
							<IoEyeOutline
								sx={{
									ml: 1,
									width: 16,
								}}
							/>
						</div>
					</div>
				</a>
			</Link>
		</div>
	)
}
export default FilmCard
