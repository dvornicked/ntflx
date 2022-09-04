import { NextPageAuth } from '../src/providers/AuthProvider/AuthProvider.interface'
import { UserRole } from '../src/shared/types/user.interface'

const Admin: NextPageAuth = () => {
	return <div>Admin</div>
}

Admin.access = UserRole.ADMIN
export default Admin
