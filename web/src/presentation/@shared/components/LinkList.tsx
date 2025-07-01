import { LinkModel } from '@/domain/models'
import { Title } from './Title'
import { CopyIcon, TrashIcon, DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  deleteLinkMutation,
  exportCSVMutation,
} from '@/domain/api/links'

type LinkListProps = {
  links: LinkModel[]
}

export const LinkList = ({ links }: LinkListProps) => {
  const navigate = useNavigate()
  const notify = () =>
    toast('Link copiado para a área de transferência!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
    })
  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    notify()
  }

  const queryClient = useQueryClient()
  const deleteLink = useMutation({
    ...deleteLinkMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  const exportCSV = useMutation({
    ...exportCSVMutation(),
    onSuccess: (data) => {
      // Optional: You can also handle success here if needed
      console.log('CSV exported successfully:', data.csvUrl)
    },
  })

  const handleDownloadCSV = async () => {
    try {
      const result = await exportCSV.mutateAsync()
      // Open the CSV URL in a new tab
      window.open(result.csvUrl, '_blank')
    } catch (error) {
      console.error('Failed to export CSV:', error)
      // You could show a toast notification here for the error
    }
  }
  const hasLinks = links.length > 0

  return (
    <div
      className={
        'bg-white p-8 rounded-lg border flex flex-col gap-5 w-full min-w-0 lg:w-[580px] lg:min-w-[580px] min-h-[234px] mb-8 lg:mb-0'
      }
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Title title="Meus links" />
        <button 
          className="flex flex-row items-center rounded bg-gray-200 p-2 gap-[6px] disabled:bg-gray-100 text-sm"
          onClick={handleDownloadCSV}
          title="Baixar links como CSV"
          disabled={!hasLinks}
        >
          <DownloadSimpleIcon size={16} weight="bold" color={hasLinks ? "#1F2025" : "#CDCFD5"} />
          <span
            className={`text-sm font-semibold transition-colors ${
              hasLinks ? 'text-gray-500' : 'text-gray-300'
            }`}
          >
            Baixar CSV
          </span>
        </button>
      </div>
      <ul className={`flex flex-col ${links.length > 6 ? 'max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400' : ''}`}>
        {links.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-3 text-gray-500 first:border-t py-6'>
            <LinkIcon size={24} weight="bold" color="#74798B" />
            <span className='uppercase'>ainda não existem links cadastrados</span>
          </div>
        ) : (
          links.map(link => (
            <li
              key={link.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-[18px] border-b last:border-b-0 first:border-t gap-3"
            >
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <button
                  onClick={() => {
                    console.log('Navigating to:', link.shortenedUrl)
                    navigate(`/${encodeURIComponent(link.shortenedUrl)}`)
                  }}
                  className="text-blue-dark hover:underline font-semibold break-words text-left"
                >
                  {link.shortenedUrl}
                </button>
                <span className="text-gray-600 text-sm truncate">{link.originalUrl}</span>
              </div>
              <div className="flex flex-row items-center gap-3 sm:gap-5 justify-between sm:justify-end pr-2">
                <span className="text-gray-500 text-sm whitespace-nowrap">
                  Acessos: {link.accessCount}
                </span>
                <div className="flex flex-row items-center gap-1">
                  <button
                    className="text-gray-400 rounded bg-gray-200 p-2"
                    onClick={() => handleCopyToClipboard(link.originalUrl)}
                    title="Copiar URL original"
                  >
                    <CopyIcon size={16} weight="bold" color="#1F2025" />
                  </button>
                  <button
                    className="text-gray-400 rounded bg-gray-200 p-2"
                    onClick={() => deleteLink.mutate(link.shortenedUrl)}
                    title="Excluir link"
                  >
                    <TrashIcon size={16} weight="bold" color="#1F2025" />
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <ToastContainer />
    </div>
  )
}
