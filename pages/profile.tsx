import { NextPageAuth } from '../src/providers/AuthProvider/AuthProvider.interface'
import { UserRole } from '../src/shared/types/user.interface'

const Profile: NextPageAuth = () => {
	return <div>Profile</div>
}

Profile.access = UserRole.USER
export default Profile
