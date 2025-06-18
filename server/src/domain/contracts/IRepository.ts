import type { ILinkToJSON } from '../models'

export interface IRepository<T> {
  create(data: T): Promise<void>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  update(id: string, data: T): Promise<T>
  remove(id: string): Promise<void>
}

export type ILinkRepository<T> = {
  findOriginalUrlByShortenedUrl(url: string): Promise<ILinkToJSON | null>
  remove(shortenedUrl: string): Promise<void>
} & IRepository<T>
