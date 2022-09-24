import { IUser } from '../../../../shared/types/user.interface'

export interface IProfileMenuProps {
	user: IUser
}

export interface IProfileMenuOption {
	label: string
	href: string
	onClick?: () => void
}
