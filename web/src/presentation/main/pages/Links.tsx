import { findAllLinks } from '@/domain/api/links'
import { Form, LinkList, Logo } from '@/presentation/@shared/components'
import { useQuery } from '@tanstack/react-query'

export const LinksPage = () => {
  const { isPending: pending, error: hasError, data } = useQuery(findAllLinks())

  if (pending) {
    return <div>Loading...</div>
  }

  if (hasError) {
    return <div>Error loading links.</div>
  }

  return (
    <div className="flex flex-col w-full gap-8 py-6 px-3 h-[100%] lg:px-0 lg:py-10 lg:gap-10 lg:items-center lg:justify-center lg:min-h-screen">
      <div className="flex flex-col gap-8 lg:gap-10">
        <div className="flex justify-center lg:justify-start">
          <Logo />
        </div>
        <div className="flex flex-col w-full lg:flex-row gap-5">
          <Form />
          <LinkList links={data?.links ?? []} />
        </div>
      </div>
    </div>
  )
}
