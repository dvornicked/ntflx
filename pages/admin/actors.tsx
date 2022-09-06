import AdminSidebar from '../../src/components/screens/Admin/Sidebar/AdminSidebar'
import { UserRole } from '../../src/shared/types/user.interface'

const Actors = () => {
	return (
		<AdminSidebar>
			<div>Actors</div>
		</AdminSidebar>
	)
}
Actors.access = UserRole.ADMIN
export default Actors
