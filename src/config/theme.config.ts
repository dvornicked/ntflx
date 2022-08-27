import { Theme } from '@theme-ui/core'

export const theme: Theme = {
	colors: {
		primary: '#f36f45',
		secondary: '#8769ff',
		accent: '#61d1ea',

		text: '#fefefe',
		muted: '#4e4f52',
		background: '#17171b',
	},
	fonts: {
		default: 'Nunito, Helvetica, sans-serif',
	},
	fontSizes: [12, 14, 16, 24],
	styles: {
		root: {
			fontFamily: 'default',
			fontSize: 1,
			a: {
				color: 'text',
				textDecoration: 'none',
				cursor: 'pointer',
			},
			ul: {
				listStyle: 'none',
				paddingLeft: 0,
			},
			svg: {
				fontSize: 3,
			},
		},
	},
}
