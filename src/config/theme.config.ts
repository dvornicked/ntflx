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
	fontWeights: {
		body: 400,
		heading: 700,
	},
	lineHeights: {
		body: '22px',
		heading: '30px',
	},
	styles: {
		root: {
			fontFamily: 'default',
			fontSize: 1,
		},
	},
}
