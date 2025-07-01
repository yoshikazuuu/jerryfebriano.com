import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true,
    }
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)