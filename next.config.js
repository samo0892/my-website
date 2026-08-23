/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployment laeuft ueber GitHub Pages, also statischer Export.
  // Explizit hier, damit der lokale Build dem CI-Build entspricht:
  // Server-Routen fallen so schon lokal auf, nicht erst im Deploy.
  output: 'export',
  images: { unoptimized: true },
}

module.exports = nextConfig
