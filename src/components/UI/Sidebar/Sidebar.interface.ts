export interface ISidebarProps {
	children: React.ReactNode
	sidebar: ISidebarData[]
}

export interface ISidebarData {
	label: string
	link: string
}
