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
    unoptimized: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: true, // Remover todos os console.log em produção
  },
  poweredByHeader: false,
  // Removido reactStrictMode que é apenas para desenvolvimento
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@headlessui/react'],
    // Adicionando mais otimizações para produção
    serverActions: {
      bodySizeLimit: '2mb', // Limitar tamanho das requisições
    },
    timeoutProtection: true, // Proteção contra timeout
  }
}

export default nextConfig
