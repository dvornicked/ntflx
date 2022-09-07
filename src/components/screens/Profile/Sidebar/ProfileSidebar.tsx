import Sidebar from '../../../UI/Sidebar/Sidebar'
import { IProfileSidebarProps } from './ProfileSidebar.interface'

const ProfileSidebar = (props: IProfileSidebarProps) => {
	const { children, ...rest } = props
	return (
		<Sidebar
			sx={{
				m: 2,
			}}
			sidebar={[
				{
					label: 'Profile',
					link: '/profile',
				},
				{
					label: 'Edit profile',
					link: '/profile/edit',
				},
			]}
			{...rest}
		>
			{children}
		</Sidebar>
	)
}
export default ProfileSidebar
