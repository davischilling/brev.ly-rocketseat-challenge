import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getOriginalUrlQuery, 
  increaseLinkAccessCountMutation 
} from '@/domain/api/links'
import Logo_Icon from '@/public/Logo_Icon.svg'

export const RedirectPage = () => {
  const { shortenedUrl: rawShortenedUrl } = useParams<{ shortenedUrl: string }>()
  const shortenedUrl = rawShortenedUrl ? decodeURIComponent(rawShortenedUrl) : undefined

  console.log('Raw param:', rawShortenedUrl)
  console.log('Decoded shortenedUrl:', shortenedUrl);
  

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [countdown, setCountdown] = useState(2)

  const { data, error, isLoading } = useQuery({
    ...getOriginalUrlQuery(shortenedUrl || ''),
    enabled: !!shortenedUrl,
    retry: false,
  })

  const increaseLinkAccessCount = useMutation({
    ...increaseLinkAccessCountMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  useEffect(() => {
    if (!shortenedUrl) {
      navigate('/not-found')
      return
    }

    if (error) {
      navigate('/not-found')
      return
    }

    if (data?.originalUrl) {
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Increase access count and redirect
            increaseLinkAccessCount.mutate(shortenedUrl)
            window.location.href = data.originalUrl
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [data, error, shortenedUrl, navigate, increaseLinkAccessCount])

  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-8 py-6 px-3 h-[100%] lg:px-0 lg:py-10 lg:gap-10 lg:items-center lg:justify-center lg:min-h-screen">
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col w-full lg:flex-row gap-5">
            <div className="bg-white p-8 rounded-lg border flex flex-col gap-6 min-h-[380px] w-full min-w-0 lg:w-[580px] lg:min-w-[580px] items-center justify-center text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <h1 className="text-2xl font-bold text-gray-800">Verificando link...</h1>
              <p className="text-gray-600">Aguarde enquanto verificamos o link solicitado.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (data?.originalUrl) {
    return (
      <div className="flex flex-col w-full gap-8 py-6 px-3 h-[100%] lg:px-0 lg:py-10 lg:gap-10 lg:items-center lg:justify-center lg:min-h-screen">
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col w-full lg:flex-row gap-5">
            <div className="bg-white p-8 rounded-lg border flex flex-col gap-6 min-h-[380px] w-full min-w-0 lg:w-[580px] lg:min-w-[580px] items-center justify-center text-center">
              <img src={Logo_Icon} alt="Logo" />
              <h1 className="text-2xl font-bold text-gray-800">Redirecionando...</h1>
              <p className="text-gray-600">
                Você será redirecionado para{' '}
                <span className="font-semibold text-blue-600 break-all">
                  {data.originalUrl}
                </span>
                {' '}em {countdown} segundo{countdown !== 1 ? 's' : ''}.
              </p>
              <button
                onClick={() => {
                  increaseLinkAccessCount.mutate(shortenedUrl!)
                  window.location.href = data.originalUrl
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ir agora
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
