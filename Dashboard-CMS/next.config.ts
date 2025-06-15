/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',   // ← allow placeholder images
      // 'your-s3-bucket.amazonaws.com',
      // 'images.example.com',
    ],
  },
}

module.exports = nextConfig
