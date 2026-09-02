import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
	webpack(config) {
		config.resolve.fallback = { fs: false };
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'@': path.resolve(process.cwd(), 'src'),
		};
		return config;
	},
	trailingSlash: true,
	images: { unoptimized: true }
};

export default nextConfig;