import AdminSidebar from '../../src/components/screens/Admin/Sidebar/AdminSidebar'
import { NextPageAuth } from '../../src/providers/AuthProvider/AuthProvider.interface'
import { UserRole } from '../../src/shared/types/user.interface'

const Admin: NextPageAuth = () => {
	return (
		<AdminSidebar>
			<h1 sx={{ textAlign: 'center' }}>Choose a section</h1>
		</AdminSidebar>
	)
}

Admin.access = UserRole.ADMIN
export default Admin
