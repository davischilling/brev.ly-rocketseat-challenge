import { type ILinkRepository, IRepository } from '@/domain/contracts'
import { Link } from '@/domain/entities'
import type { CreateLinkDTO, ILink, ILinkToJSON } from '@/domain/models'
import { LinkAlreadyExistsError } from '../errors'
import { NotFoundError } from '../errors/notFoundError'

export class LinksService {
  constructor(
    private readonly linksRepository: ILinkRepository<ILinkToJSON>
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

  // async findOne(id: string) {
  //   return this.linksRepository.findById(id);
  // }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.linksRepository.update(id, updateUserDto);
  // }

  async remove(shortenedUrl: string) {
    const hasLink =
      await this.linksRepository.findOriginalUrlByShortenedUrl(shortenedUrl)
    if (!hasLink) {
      throw new NotFoundError(shortenedUrl)
    }
    return this.linksRepository.remove(shortenedUrl)
  }
}
