import { HTMLAttributes } from 'react'

export interface IErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
	error: string
}
