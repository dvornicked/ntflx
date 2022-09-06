import AdminSidebar from '../../src/components/screens/Admin/Sidebar/AdminSidebar'
import { UserRole } from '../../src/shared/types/user.interface'

const Users = () => {
	return (
		<AdminSidebar>
			<div>Users</div>
		</AdminSidebar>
	)
}
Users.access = UserRole.ADMIN
export default Users
