export interface IFormWrapperProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	type: 'login' | 'register'
	setType: (type: 'login' | 'register') => void
}
