import axios from 'axios'
import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'
import {
	IActor,
	IActorCreate,
	IActors,
	IActorUpdate,
} from '../shared/types/actors.interface'

const getAll = async () => {
	const { data } = await axios.get<IActors>(API.actors)
	return data
}

const getOne = async (id: number) => {
	const { data } = await axios.get<IActor>(`${API.actors}/${id}`)
	return data
}

const create = async (actor: IActorCreate) => {
	const { data } = await AxiosAuth.post<IActor>(`${API.actors}/create`, actor)
	return data
}

const update = async (id: number, actor: IActorUpdate) => {
	const { data } = await AxiosAuth.put<IActor>(
		`${API.actors}/update/${id}`,
		actor,
	)
	return data
}

const remove = async (id: number) => {
	const { data } = await AxiosAuth.delete(`${API.actors}/delete/${id}`)
	return data
}

export const actorService = {
	getAll,
	getOne,
	create,
	update,
	remove,
}
