/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	env: {
		API_URL: 'https://api.ntflx.ru',
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `https://api.ntflx.ru/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `https://uploads.ntflx.ru/:path*`,
			},
		]
	},
}

module.exports = nextConfig
