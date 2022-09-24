import { HTMLAttributes } from 'react'
import {
	FieldError,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form'

export interface ITextareaProps<T extends Record<string, any>>
	extends HTMLAttributes<HTMLTextAreaElement> {
	value?: string
	register: UseFormRegister<T>
	name: Path<T>
	rules?: RegisterOptions
	error?: FieldError
}
