import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../src/components/shared/Input/Input'
import UploadFile from '../../../src/components/shared/UploadFile/UploadFile'
import Button from '../../../src/components/UI/Button/Button'
import { UserRole } from '../../../src/shared/types/user.interface'
import Image from 'next/image'
import {
	IFilmCreate,
	IFilmForm,
} from '../../../src/shared/types/films.interface'
import { filmService } from '../../../src/services/film.service'
import { actorService } from '../../../src/services/actor.service'
import { genreService } from '../../../src/services/genre.service'
import Select from 'react-select'

const Create = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFilmForm>({
		mode: 'onChange',
	})
	const [imageUrl, setImageUrl] = useState('')
	const [videoUrl, setVideoUrl] = useState('')
	const [releaseDate, setReleaseDate] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()
	const mutation = useMutation(
		['FILM_CREATE'],
		async (data: IFilmCreate) => {
			return await filmService.create({
				...data,
				image: imageUrl,
				video: videoUrl,
				duration: Number(data.duration),
			})
		},
		{
			onSuccess: () => {
				router.push('/admin/films')
			},
			onError: error => {
				error instanceof Error ? setError(error.message) : setError('Error')
			},
		},
	)
	const {
		data: actorsOptions,
		isLoading: isActorsLoading,
		isError: isActorsError,
		error: actorsError,
	} = useQuery(['GET_ACTORS'], async () => {
		const { actors } = await actorService.getAll()
		return actors.map(actor => ({ value: actor.id, label: actor.name }))
	})
	const onSubmit = async (data: IFilmForm) => {
		mutation.mutate({
			...data,
			image: imageUrl,
			video: videoUrl,
			releaseDate,
			duration: Number(data.duration),
			actors: data.actors.map(actor => actor.value),
			genres: data.genres.map(genre => genre.value),
		})
	}

	const {
		data: genresOptions,
		isLoading,
		isError: isGenresError,
		error: genresError,
	} = useQuery(['GET_GENRES'], async () => {
		const { genres } = await genreService.getAll({})
		return genres.map(genre => ({ value: genre.id, label: genre.name }))
	})

	return (
		<AdminSidebar>
			<div
				sx={{
					m: 4,
				}}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						'& > div': {
							my: 3,
						},
					}}
				>
					<Input<IFilmForm>
						register={register}
						name="title"
						error={errors.title}
						rules={{
							required: 'Title is required',
						}}
					/>
					<Input<IFilmForm>
						register={register}
						name="desc"
						error={errors.desc}
						rules={{
							required: 'Description is required',
						}}
					/>
					<Input<IFilmForm>
						register={register}
						name="duration"
						error={errors.duration}
						type="number"
						rules={{
							required: 'Duration is required',
							pattern: {
								value: /^[0-9]*$/,
								message: 'Duration must be a number',
							},
						}}
					/>
					<label>Release date</label>
					<input
						type="date"
						sx={{
							display: 'block',
							mt: 1,
							mb: 2,
						}}
						onChange={e => setReleaseDate(e.target.value)}
					/>
					<label>Image</label>
					{imageUrl && (
						<div
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Image
								sx={{
									borderRadius: '5px',
								}}
								src={imageUrl}
								width="300px"
								height="300px"
								alt="Avatar"
							/>
						</div>
					)}
					<UploadFile
						accept="image/*"
						setImageUrl={setImageUrl}
						styles={{
							mx: 'auto',
							width: '300px',
						}}
					/>
					<label>Video</label>
					{videoUrl && (
						<video
							width="300px"
							sx={{
								mx: 'auto',
								display: 'block',
							}}
							src={videoUrl}
							controls
						/>
					)}
					<UploadFile
						accept=".mp4"
						setImageUrl={setVideoUrl}
						styles={{
							mx: 'auto',
							width: '300px',
						}}
					/>
					<label>Actors</label>
					{actorsOptions && (
						<Controller
							control={control}
							name="actors"
							render={({ field: { onChange } }) => (
								<Select
									options={actorsOptions}
									isMulti
									onChange={onChange}
									sx={{
										color: 'black',
									}}
								/>
							)}
						/>
					)}
					<label>Genres</label>
					{genresOptions && (
						<Controller
							control={control}
							name="genres"
							render={({ field: { onChange } }) => (
								<Select
									options={genresOptions}
									isMulti
									onChange={onChange}
									sx={{
										color: 'black',
									}}
								/>
							)}
						/>
					)}
					{error && <ErrorMessage error={error} />}
					<Button type="submit">
						{mutation.isLoading ? <Spinner size={16} color="text" /> : 'Create'}
					</Button>
				</form>
			</div>
		</AdminSidebar>
	)
}

Create.access = UserRole.ADMIN
export default Create
