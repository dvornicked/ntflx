import { useCallback, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { uploadService } from '../../../services/upload.service'
import Button from '../../UI/Button/Button'
import { IUploadFileProps } from './UploadFile.interface'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const UploadFile = (props: IUploadFileProps) => {
	const { accept, setImageUrl, styles, ...rest } = props
	const inputRef = useRef<HTMLInputElement>(null)
	const mutation = useMutation(
		['uploadFile'],
		async (file: File) => {
			const formData = new FormData()
			formData.append('file', file)
			return await uploadService.upload(formData)
		},
		{
			onSuccess: response => {
				setImageUrl(response.data.url)
			},
		},
	)
	const handleButtonClick = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}, [inputRef])
	return (
		<div sx={styles}>
			<Button type="button" onClick={handleButtonClick}>
				Choose file
			</Button>
			<input
				sx={{
					display: 'none',
				}}
				ref={inputRef}
				type="file"
				id="upload"
				accept={accept}
				onChange={e => {
					if (e.target.files) {
						mutation.mutate(e.target.files[0])
					}
				}}
				{...rest}
			/>
		</div>
	)
}
export default UploadFile
