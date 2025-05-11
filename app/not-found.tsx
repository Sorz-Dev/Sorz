import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1d1d1d] text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        A página que você está procurando não existe ou foi movida para outro endereço.
      </p>
      <Link href="/" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
        Voltar para a página inicial
      </Link>
    </div>
  )
}
