/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["cloudflare-ipfs.com", "avatars.githubusercontent.com"],
		formats: ["image/avif", "image/webp"],
	  }
}

module.exports = nextConfig
