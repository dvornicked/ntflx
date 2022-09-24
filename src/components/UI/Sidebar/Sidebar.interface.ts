import { HTMLAttributes } from 'react'

export interface ISidebarProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	sidebar: ISidebarData[]
}

export interface ISidebarData {
	label: string
	link: string
}
