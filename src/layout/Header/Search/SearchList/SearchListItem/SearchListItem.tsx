import { ISearchListItemProps } from './SearchListItem.interface'
import Image from 'next/image'
import Link from 'next/link'

const SearchListItem = (props: ISearchListItemProps) => {
	const { film } = props
	return (
		<Link href={`/films/${film.id}`}>
			<a>
				<div
					sx={{
						p: '10px',
						height: '180px',
						display: 'grid',
						rowGap: '5px',
						columnGap: '15px',
						gridTemplateColumns: '100px 1fr',
						gridTemplateRows: '20px 16px 1fr',
						borderTop: '1px solid',
						borderImage:
							'linear-gradient(to right, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',

						'&:hover': {
							backgroundColor: '#202020',
						},
					}}
				>
					<div
						sx={{
							gridRow: '1 / 3',
						}}
					>
						<Image
							src={film.image}
							alt={film.title}
							width="100px"
							height="160px"
							sx={{ borderRadius: '5px' }}
						/>
					</div>
					<span
						sx={{
							fontSize: 2,
							fontWeight: 'bold',
						}}
					>
						{film.title}
					</span>
					<div>
						{film.genres.map(genre => (
							<span key={genre.id}>{genre.name} / </span>
						))}
						{new Date(film.releaseDate).getFullYear()}
					</div>
					<div
						sx={{
							height: '100%',
							gridColumn: '2 / 3',
							gridRow: '3 / 4',
							display: '-webkit-box',
							WebkitLineClamp: 6,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
						}}
					>
						{film.desc}
					</div>
				</div>
			</a>
		</Link>
	)
}
export default SearchListItem
