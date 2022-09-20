import Image from 'next/image'
import { FaVk, FaTelegram, FaDiscord } from 'react-icons/fa'

const Contact = () => {
	const contacts = [
		{
			link: 'https://vk.me/dvornicked',
			icon: FaVk,
			color: '#2088ff',
		},
		{
			link: 'https://t.me/dvornicked',
			icon: FaTelegram,
			color: '#28A8E9',
		},
		{
			link: 'http://discordapp.com/users/706804466631835763',
			icon: FaDiscord,
			color: '#404EED',
		},
	]
	return (
		<div
			sx={{
				margin: 3,
			}}
		>
			<div
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gridGap: 3,
				}}
			>
				<div
					sx={{
						mx: 'auto',
					}}
				>
					<Image
						src="/uploads/files/mn6f6z-avatar.jpg"
						alt="Avatar"
						width="300px"
						height="300px"
						sx={{
							borderRadius: '5px',
						}}
					/>
				</div>
				<div
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
					<p
						sx={{
							fontSize: 2,
						}}
					>
						If you for some reason like the work, you can always hire me by
						contacting me at the contacts below:
					</p>
					<div
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
						}}
					>
						{contacts.map(contact => (
							<a
								href={contact.link}
								target="_blank"
								rel="noreferrer"
								key={contact.link}
								sx={{
									display: 'inline-block',
									textAlign: 'center',
									mr: 2,
									transition: 'color 0.2s ease-in-out',
									':hover': {
										color: contact.color,
									},
								}}
							>
								<contact.icon
									sx={{
										width: '50%',
										height: '50%',
									}}
								/>
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Contact
