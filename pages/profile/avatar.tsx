import ProfileSidebar from '../../src/components/screens/Profile/Sidebar/ProfileSidebar'
import UploadFile from '../../src/components/shared/UploadFile/UploadFile'
import { useAppSelector } from '../../src/hooks/useAppSelector'
import Image from 'next/image'
import Button from '../../src/components/UI/Button/Button'
import { useState } from 'react'
import { useAppDispatch } from '../../src/hooks/useAppDispatch'
import { UserSlice } from '../../src/store/reducers/user/user.slice'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { userService } from '../../src/services/user.service'
import { UserRole } from '../../src/shared/types/user.interface'

const Avatar = () => {
	const { user } = useAppSelector(state => state.user)
	const [imageUrl, setImageUrl] = useState<string | null>(null)
	const mutation = useMutation(['uploadAvatar'], async (imageUrl: string) => {
		await userService.updateAvatar(imageUrl)
	})
	const dispatch = useAppDispatch()
	const router = useRouter()
	if (!user) return null
	return (
		<ProfileSidebar>
			<div
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mx: 4,
				}}
			>
				<Image
					sx={{
						borderRadius: '5px',
					}}
					src={imageUrl || user?.image}
					width="300px"
					height="300px"
					alt="Avatar"
				/>
				<UploadFile
					accept="image/*"
					setImageUrl={setImageUrl}
					styles={{
						my: 2,
						width: '300px',
					}}
				/>
				<Button
					sx={{
						width: '300px',
					}}
					onClick={() => {
						if (imageUrl) {
							mutation.mutate(imageUrl)
							dispatch(UserSlice.actions.updateAvatar(imageUrl))
							router.push('/profile')
						}
					}}
				>
					Save changes
				</Button>
			</div>
		</ProfileSidebar>
	)
}
Avatar.access = UserRole.USER
export default Avatar
