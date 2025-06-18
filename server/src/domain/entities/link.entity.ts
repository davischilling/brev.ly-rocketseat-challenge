import { AbstractionEntity } from '@/domain/utils'
import type { CreateLinkDTO, ILink, ILinkToJSON } from '../models/link.dto'

export class Link extends AbstractionEntity<ILinkToJSON> implements ILink {
  #originalUrl: string
  #shortenedUrl: string
  #accessCount: number

  static create({
    id,
    originalUrl,
    shortenedUrl,
    accessCount,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: CreateLinkDTO): Link {
    return new Link({
      id,
      originalUrl,
      shortenedUrl,
      accessCount,
      createdAt,
      updatedAt,
      token: AbstractionEntity.internalToken,
    })
  }

  // ✅ Private constructor blocks direct `new Character(...)`
  private constructor({
    id,
    originalUrl,
    shortenedUrl,
    accessCount = 0,
    createdAt,
    updatedAt,
    token,
  }: CreateLinkDTO & { token: symbol }) {
    super({
      id,
      createdAt,
      updatedAt,
      token,
      entity: 'Link',
    })
    this.#originalUrl = originalUrl
    this.#shortenedUrl = shortenedUrl
    this.#accessCount = accessCount
  }

  get originalUrl(): string {
    return this.#originalUrl
  }
  get shortenedUrl(): string {
    return this.#shortenedUrl
  }
  get accessCount(): number {
    return this.#accessCount
  }

  increaseAccessCount(): void {
    this.#accessCount += 1
    this.#updateLink()
  }

  #updateLink(): void {
    this.updatedAt = new Date()
  }

  toJSON(): ILinkToJSON {
    return {
      id: this.id,
      originalUrl: this.originalUrl,
      shortenedUrl: this.shortenedUrl,
      accessCount: this.accessCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
