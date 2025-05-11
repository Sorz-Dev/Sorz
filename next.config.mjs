/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Habilitando otimização de imagens
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd7hd88ngyqaw6jtz.public.blob.vercel-storage.com',
      },
    ],
  },
  // Removido swcMinify que não é mais reconhecido no Next.js 15
  // Otimizações para reduzir o JavaScript
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
  },
  // Configuração para evitar JavaScript legado
  webpack: (config, { dev, isServer }) => {
    // Apenas aplicar em produção e no cliente
    if (!dev && !isServer) {
      // Configurar o Terser para remover polyfills desnecessários
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  },
}

export default nextConfig
