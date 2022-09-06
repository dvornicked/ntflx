import AdminSidebar from '../../src/components/screens/Admin/Sidebar/AdminSidebar'
import { UserRole } from '../../src/shared/types/user.interface'

const Films = () => {
	return (
		<AdminSidebar>
			<div>Films</div>
		</AdminSidebar>
	)
}
Films.access = UserRole.ADMIN
export default Films
