import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useToggle } from '../../../../hooks/useToggle'
import { UserSlice } from '../../../../store/reducers/user/user.slice'
import { IProfileMenuOption, IProfileMenuProps } from './ProfileMenu.interface'

const ProfileMenu = (props: IProfileMenuProps) => {
	const { user } = props
	const [isOpen, toggleIsOpen] = useToggle()
	const menuRef = useRef<HTMLDivElement>(null)
	const dispatch = useAppDispatch()
	const { logout } = UserSlice.actions

	const handleOutsideClick = useCallback(
		(e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node))
				toggleIsOpen()
		},
		[toggleIsOpen],
	)

	useEffect(() => {
		if (isOpen) document.addEventListener('click', handleOutsideClick)
		else document.removeEventListener('click', handleOutsideClick)
		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [isOpen, handleOutsideClick])
	const options: IProfileMenuOption[] = [
		{
			label: 'My Profile',
			href: '/profile',
		},
		{
			label: 'Settings',
			href: '/settings',
		},
		{
			label: 'Logout',
			href: '',
			onClick: () => {
				dispatch(logout())
			},
		},
	]
	return (
		<div ref={menuRef} sx={{ position: 'relative' }}>
			<div
				sx={{
					display: 'flex',
					alignItems: 'center',
					mx: 2,
					cursor: 'pointer',
					height: '100%',
				}}
				onClick={toggleIsOpen}
			>
				<Image
					sx={{
						borderRadius: '50%',
						mr: 2,
					}}
					src={user.image}
					alt="Avatar"
					width="32"
					height="32"
				/>
				<IoChevronDown
					sx={{
						transform: isOpen ? 'rotate(270deg)' : 'rotate(0deg)',
					}}
				/>
			</div>
			{isOpen && (
				<div
					sx={{
						position: 'absolute',
						width: '200px',
						backgroundColor: '#242424',
						right: '0',
						top: 50,
						borderRadius: '5px',
					}}
				>
					{options.map(option => (
						<Link href={option.href} key={option.href}>
							<a>
								<div
									sx={{
										textAlign: 'center',
										cursor: 'pointer',
										fontSize: 2,
										border: '1px solid',
										borderImage:
											'linear-gradient(to right, transparent 5%, rgba(80,80,80,.5) 50%, transparent 95%) 1',
										p: 2,
										'&:hover': {
											backgroundColor: '#282828',
										},
									}}
									onClick={option.onClick}
								>
									{option.label}
								</div>
							</a>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
export default ProfileMenu
