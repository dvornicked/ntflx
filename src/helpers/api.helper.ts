const API_URL = `${process.env.APP_URL}/api`

export const API = {
	users: `${API_URL}/users`,
	profile: `${API_URL}/profile`,
	favorite: `${API_URL}/favorite`,
	password: `${API_URL}/password`,
	register: `${API_URL}/register`,
	login: `${API_URL}/login`,
	token: `${API_URL}/token`,
	films: `${API_URL}/films`,
	actors: `${API_URL}/actors`,
	genres: `${API_URL}/genres`,
	upload: `${API_URL}/upload`,
}
