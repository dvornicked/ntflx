import { useAppSelector } from '../../src/hooks/useAppSelector'
import { NextPageAuth } from '../../src/providers/AuthProvider/AuthProvider.interface'
import { UserRole } from '../../src/shared/types/user.interface'
import Image from 'next/image'
import { Spinner } from 'theme-ui'
import { useQuery } from '@tanstack/react-query'
import { userService } from '../../src/services/user.service'
import ErrorMessage from '../../src/components/shared/ErrorMessage/ErrorMessage'
import ProfileSidebar from '../../src/components/screens/Profile/Sidebar/ProfileSidebar'

const Profile: NextPageAuth = () => {
	const { user } = useAppSelector(state => state.user)
	const {
		data: favFilms,
		isLoading: isFavFilmsLoading,
		isError: isFavFilmsError,
		error: favFilmsError,
	} = useQuery(
		['GET_FAVORITED_FILMS'],
		async () => await userService.getFavFilms(),
	)

	if (!user) return null

	return (
		<ProfileSidebar>
			<div
				sx={{
					display: 'grid',
					gridTemplateColumns: '300px 1fr',
					gridTemplateRows: '300px 200px 200px',
					gridGap: 4,
					height: '300px',
					mx: 4,
				}}
			>
				<div>
					<Image
						sx={{
							borderRadius: '5px',
						}}
						src={user.image}
						width="300px"
						height="300px"
						alt="Avatar"
					/>
				</div>
				<div
					sx={{
						display: 'grid',
						div: {
							fontSize: 18,
						},
					}}
				>
					<h1
						sx={{
							mb: 1,
						}}
					>
						Profile
					</h1>
					<div>Username: {user.username}</div>
					<div>Email: {user.email}</div>
					<div>Role: {user.role}</div>
					<div>About me: {user.desc}</div>
				</div>
				<div
					sx={{
						gridColumn: '1/-1',
					}}
				>
					<h2>Favorite films</h2>
					{isFavFilmsLoading && (
						<Spinner
							sx={{
								m: 'auto',
							}}
							color="white"
						/>
					)}
					{isFavFilmsError && (
						<ErrorMessage
							error={
								favFilmsError instanceof Error ? favFilmsError.message : 'Error'
							}
						/>
					)}
					{favFilms?.data.count ? (
						favFilms?.data.films.map(film => <p key={film.id}>{film.image}</p>)
					) : (
						<div
							sx={{
								fontSize: 2,
							}}
						>
							Favorite films not found
						</div>
					)}
				</div>
			</div>
		</ProfileSidebar>
	)
}

Profile.access = UserRole.USER
export default Profile
