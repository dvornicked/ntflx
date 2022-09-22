import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from 'theme-ui'
import AdminSidebar from '../../../../src/components/screens/Admin/Sidebar/AdminSidebar'
import ErrorMessage from '../../../../src/components/shared/ErrorMessage/ErrorMessage'
import Input from '../../../../src/components/shared/Input/Input'
import { filmService } from '../../../../src/services/film.service'
import {
	IFilmForm,
	IFilmUpdate,
} from '../../../../src/shared/types/films.interface'
import Image from 'next/image'
import UploadFile from '../../../../src/components/shared/UploadFile/UploadFile'
import { selectOption } from '../../../../src/types/reactSelect.interface'
import Button from '../../../../src/components/UI/Button/Button'
import ReactSelect from 'react-select'
import { UserRole } from '../../../../src/shared/types/user.interface'
import { actorService } from '../../../../src/services/actor.service'
import { genreService } from '../../../../src/services/genre.service'

const Edit = () => {
	const router = useRouter()
	const { id: idString } = router.query
	const id = Number(idString)
	const { data, error, isLoading } = useQuery(
		[`GET_FILM_${id}`, id],
		async () => {
			const { data } = await filmService.getOne(id)
			return data
		},
	)
	const [mutationError, setMutationError] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [videoUrl, setVideoUrl] = useState('')
	const [releaseDate, setReleaseDate] = useState('')
	const [duration, setDuration] = useState(0)
	const [actors, setActors] = useState<selectOption<number>[]>([])
	const [genres, setGenres] = useState<selectOption<number>[]>([])
	const mutation = useMutation(
		['EDIT_FILM'],
		(data: IFilmUpdate) =>
			filmService.update(id, {
				...data,
				image: imageUrl,
				video: videoUrl,
				duration: Number(data.duration),
			}),
		{
			onSuccess: () => {
				router.push('/admin/films')
			},
			onError: error => {
				error instanceof Error
					? setMutationError(error.message)
					: setMutationError('Error')
			},
		},
	)
	useEffect(() => {
		if (data) {
			setTitle(data.title)
			setDescription(data.desc)
			setImageUrl(data.image)
			setVideoUrl(data.video)
			setReleaseDate(data.releaseDate)
			setDuration(data.duration)
			setActors(
				data.actors.map(actor => ({
					label: actor.name,
					value: actor.id,
				})),
			)
			setGenres(
				data.genres.map(genre => ({
					label: genre.name,
					value: genre.id,
				})),
			)
			reset({
				title: data.title,
				desc: data.desc,
				duration: data.duration,
				releaseDate: data.releaseDate,
				actors: data.actors.map(actor => ({
					value: actor.id,
					label: actor.name,
				})),
				genres: data.genres.map(genre => ({
					value: genre.id,
					label: genre.name,
				})),
			})
		}
	}, [data]) // eslint-disable-line react-hooks/exhaustive-deps
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<IFilmForm>({
		mode: 'onChange',
		defaultValues: {
			title,
			desc: description,
			duration,
			releaseDate,
			actors,
			genres,
			image: imageUrl,
			video: videoUrl,
		},
	})
	const onSubmit: SubmitHandler<IFilmForm> = async data => {
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
		isLoading: isGenresLoading,
		isError: isGenresError,
		error: genresError,
	} = useQuery(['GET_GENRES'], async () => {
		const { genres } = await genreService.getAll({})
		return genres.map(genre => ({ value: genre.id, label: genre.name }))
	})
	const {
		data: actorsOptions,
		isLoading: isActorsLoading,
		isError: isActorsError,
		error: actorsError,
	} = useQuery(['GET_ACTORS'], async () => {
		const { actors } = await actorService.getAll()
		return actors.map(actor => ({ value: actor.id, label: actor.name }))
	})
	if (isLoading) return <Spinner color="text" sx={{ m: 'auto' }} />
	if (error)
		return (
			<div
				sx={{
					m: 'auto',
					fontSize: 3,
				}}
			>
				{error instanceof Error ? error.message : 'Error'}
			</div>
		)
	return (
		<div>
			<AdminSidebar>
				<form
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						mx: 3,
					}}
				>
					<h1
						sx={{
							textAlign: 'center',
						}}
					>
						Edit film
					</h1>
					{mutationError && <ErrorMessage error={mutationError} />}
					<Input<IFilmForm>
						name="title"
						register={register}
						rules={{ required: 'Title is required' }}
						error={errors.title}
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Input<IFilmForm>
						register={register}
						name="desc"
						error={errors.desc}
						rules={{
							required: 'Description is required',
						}}
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<Input<IFilmForm>
						register={register}
						name="duration"
						error={errors.duration}
						type="number"
						value={duration}
						onChange={e => setDuration(Number(e.target.value))}
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
						value={releaseDate}
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
							mt: 2,
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
							mb: 2,
						}}
					/>
					<label>Actors</label>
					{actorsOptions && (
						<Controller
							control={control}
							name="actors"
							render={({ field: { onChange, value } }) => (
								<ReactSelect
									options={actorsOptions}
									isMulti
									value={value}
									onChange={onChange}
									sx={{
										color: 'black',
										my: 2,
									}}
								/>
							)}
						/>
					)}
					<label>Genres</label>
					{genres && (
						<Controller
							control={control}
							name="genres"
							render={({ field: { onChange, value } }) => (
								<ReactSelect
									options={genresOptions}
									value={value}
									isMulti
									onChange={onChange}
									sx={{
										color: 'black',
										my: 2,
									}}
								/>
							)}
						/>
					)}
					<Button
						sx={{
							mt: 2,
						}}
						type="submit"
					>
						Save
					</Button>
				</form>
			</AdminSidebar>
		</div>
	)
}
Edit.access = UserRole.ADMIN
export default Edit
