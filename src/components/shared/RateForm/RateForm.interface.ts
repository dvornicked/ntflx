import { HTMLAttributes } from 'react'

export interface IRateFormProps extends HTMLAttributes<HTMLDivElement> {
	filmId: number
	setRateForm: (value: boolean) => void
}
