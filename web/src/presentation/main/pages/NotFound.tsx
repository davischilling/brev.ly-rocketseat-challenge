import NotFound from '@/public/404.svg'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col w-full gap-8 py-6 px-3 h-[100%] lg:px-0 lg:py-10 lg:gap-10 lg:items-center lg:justify-center lg:min-h-screen">
      <div className="flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col w-full lg:flex-row gap-5">
        <div
          className={
            'bg-white p-8 rounded-lg border flex flex-col gap-6 min-h-[380px] w-full min-w-0 lg:w-[580px] lg:min-w-[580px] items-center justify-center text-center'
          }
        >
          <img src={NotFound} alt="Logo" />
          <h1 className="text-2xl font-bold text-gray-800">Link não encontrado</h1>
          <p className="text-gray-600">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em{' '}
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
              brev.ly
            </Link>
            .
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
