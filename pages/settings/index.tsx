import SettingsSidebar from '../../src/components/screens/Settings/SettingsSidebar'
import { UserRole } from '../../src/shared/types/user.interface'

const Settings = () => {
	return (
		<SettingsSidebar>
			<h1
				sx={{
					textAlign: 'center',
				}}
			>
				Select a section
			</h1>
		</SettingsSidebar>
	)
}
Settings.access = UserRole.USER
export default Settings
