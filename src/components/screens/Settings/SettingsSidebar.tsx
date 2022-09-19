import Sidebar from '../../UI/Sidebar/Sidebar'
import { ISettingsSidebarProps } from './SettingsSidebar.interface'

const SettingsSidebar = (props: ISettingsSidebarProps) => {
	const { children, ...rest } = props
	return (
		<Sidebar
			sx={{
				m: 2,
			}}
			sidebar={[
				{
					label: 'Change email',
					link: '/settings/email',
				},
				{
					label: 'Change password',
					link: '/settings/password',
				},
			]}
			{...rest}
		>
			{children}
		</Sidebar>
	)
}
export default SettingsSidebar
