import { API } from '../helpers/api.helper'
import { AxiosAuth } from '../helpers/axios.interceptor.helper'

const upload = async (data: FormData) => {
	return AxiosAuth.post<{ url: string }>(`${API.upload}/file`, data)
}

export const uploadService = {
	upload,
}
