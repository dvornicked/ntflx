import Sidebar from '../../../UI/Sidebar/Sidebar'
import { IAdminSidebarProps } from './AdminSidebar.interface'

const AdminSidebar = (props: IAdminSidebarProps) => {
	const { children, ...rest } = props
	return (
		<Sidebar
			sidebar={[
				{ label: 'Users', link: '/admin/users' },
				{ label: 'Genres', link: '/admin/genres' },
				{ label: 'Films', link: '/admin/films' },
				{ label: 'Actors', link: '/admin/actors' },
			]}
			{...rest}
		>
			{children}
		</Sidebar>
	)
}
export default AdminSidebar
