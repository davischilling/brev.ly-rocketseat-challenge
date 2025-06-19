import { ICSVGenerator, type ILinkRepository, ISearchableParams, IValidation } from '@/domain/contracts'
import { Link } from '@/domain/entities'
import type { CreateLinkDTO, ILinkToJSON } from '@/domain/models'
import { LinkAlreadyExistsError } from '../errors'
import { NotFoundError } from '../errors/notFoundError'

export class LinksService {
  constructor(
    private readonly linksRepository: ILinkRepository<ILinkToJSON>,
    private readonly searchableParams: IValidation<ISearchableParams>,
    private readonly csvGenerator: ICSVGenerator,
  ) { }

  async create(createLinkDto: CreateLinkDTO): Promise<ILinkToJSON> {
    const linkEntity = Link.create(createLinkDto).toJSON()
    const hasLink = await this.linksRepository.findOriginalUrlByShortenedUrl(
      linkEntity.shortenedUrl
    )
    if (hasLink) {
      throw new LinkAlreadyExistsError(linkEntity.shortenedUrl)
    }
    await this.linksRepository.create(linkEntity)
    return linkEntity
  }

  async findAll() {
    return this.linksRepository.findAll()
  }

  async findOriginalUrlByShortenedUrl(
    shortenedUrl: string
  ): Promise<ILinkToJSON> {
    const link =
      await this.linksRepository.findOriginalUrlByShortenedUrl(shortenedUrl)
    if (!link) {
      throw new NotFoundError(shortenedUrl)
    }
    return link
  }

  async increaseLinkAccessCount(shortenedUrl: string): Promise<ILinkToJSON> {
    const hasLink =
      await this.linksRepository.findOriginalUrlByShortenedUrl(shortenedUrl)
    if (!hasLink) {
      throw new NotFoundError(shortenedUrl)
    }
    const linkEntity = Link.create(hasLink)
    linkEntity.increaseAccessCount()
    const link = linkEntity.toJSON()
    return this.linksRepository.update(link.id, link)
  }

  async remove(shortenedUrl: string) {
    const hasLink =
      await this.linksRepository.findOriginalUrlByShortenedUrl(shortenedUrl)
    if (!hasLink) {
      throw new NotFoundError(shortenedUrl)
    }
    return this.linksRepository.remove(shortenedUrl)
  }

  async exportLinks(input: ISearchableParams): Promise<{
    csvUrl: string
  }> {
    const { searchQuery } = this.searchableParams.parse(input)
    const { sql, params } = this.linksRepository.getSQLParamsByFilter(searchQuery)
    const { csvUrl } = await this.csvGenerator.generateCSV({ sql, params })
    return { csvUrl }
  }
}
