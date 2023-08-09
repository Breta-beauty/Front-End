/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        BRETA_API: process.env.BRETA_API
    }
}

module.exports = nextConfig
