import {
	FieldError,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form'

export interface IInputProps<T>
	extends React.InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegister<T>
	name: Path<T>
	rules?: RegisterOptions
	error?: FieldError
}
