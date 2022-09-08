import { HTMLAttributes } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'

export interface IUploadFileProps extends HTMLAttributes<HTMLInputElement> {
	accept: string
	setImageUrl: (url: string) => void
	styles: ThemeUIStyleObject
}
