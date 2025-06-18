import { LinksService } from '@/application/services'
import { db } from '@/infra/db'
import { LinksRepository } from '@/infra/db/repositories/links.repository'

export const linksServiceFactory = (): LinksService => {
  const repository = new LinksRepository(db)
  return new LinksService(repository)
}
