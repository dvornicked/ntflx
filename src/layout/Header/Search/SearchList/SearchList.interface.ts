export interface ISearchListProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string
	setIsLoading: (isLoading: boolean) => void
}

export interface ISearchListWrapperProps {
	children: React.ReactNode
}
