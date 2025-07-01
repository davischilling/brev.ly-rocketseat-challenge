import { ISearchableParams } from '../contracts'
import { CreateLinkDTO, ILinkToJSON } from '../models'

export interface ILinkUseCases {
  create: (link: CreateLinkDTO) => Promise<ILinkToJSON>
  findAll: () => Promise<ILinkToJSON[]>
  findOriginalUrlByShortenedUrl: (shortenedUrl: string) => Promise<ILinkToJSON>
  increaseLinkAccessCount: (shortenedUrl: string) => Promise<ILinkToJSON>
  remove: (shortenedUrl: string) => Promise<void>
  exportLinks: (input: ISearchableParams) => Promise<{
    csvUrl: string
  }>
}
