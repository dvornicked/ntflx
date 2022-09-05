import { useQuery } from '@tanstack/react-query'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import { genreService } from '../../../src/services/genre.service'

const Genres = () => {
	const { data, isLoading, isError, error } = useQuery(['GET_GENRES'], () =>
		genreService.getAll({}),
	)
	return (
		<AdminSidebar>
			<div sx={{ mx: 2 }}>
				<h1
					sx={{
						textAlign: 'center',
					}}
				>
					Genres
				</h1>
				<ul
					sx={{
						li: {
							display: 'grid',
							gridTemplateColumns: '1fr 5fr',
							'&:last-child': {
								borderBottom: '1px solid gray',
							},
							div: {
								p: 2,
								border: '1px solid gray',
								borderBottom: 'none',
								'&:first-of-type': {
									borderRight: 'none',
								},
							},
						},
					}}
				>
					<li
						sx={{
							fontWeight: 'bold',
							textAlign: 'center',
							fontSize: 2,
						}}
					>
						<div>Name</div>
						<div>Description</div>
					</li>
					{data?.genres?.map(genre => (
						<li key={genre.id}>
							<div
								sx={{
									textAlign: 'center',
								}}
							>
								{genre.name}
							</div>
							<div
								sx={{
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
							>
								{genre.desc}
							</div>
						</li>
					))}
				</ul>
			</div>
		</AdminSidebar>
	)
}
export default Genres
