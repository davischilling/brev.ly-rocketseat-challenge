import { LinksService } from '@/application/services'
import { CloudflareStorageService } from '@/infra/cloudfareStorage'
import { CSVGeneratorSergvice } from '@/infra/csvStringify'
import { db } from '@/infra/postgresDb'
import { LinksRepository } from '@/infra/postgresDb/repositories/links.repository'
import {
  searchableParams,
  type SearchableParams,
  uploadFileToStorageInput,
  ZodValidator,
} from '@/infra/zodValidation'

export const linksServiceFactory = (): LinksService => {
  const linksRepository = new LinksRepository(db)
  const storage = new CloudflareStorageService(uploadFileToStorageInput)
  const csvService = new CSVGeneratorSergvice(storage)
  const searchableParamsSchema = new ZodValidator<SearchableParams>(
    searchableParams
  )
  return new LinksService(linksRepository, searchableParamsSchema, csvService)
}
