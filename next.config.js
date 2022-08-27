/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	env: {
		API_URL: process.env.APP_URL,
		APP_URL: process.env.APP_API_URL,
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.APP_API_URL}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${process.env.APP_API_URL}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
