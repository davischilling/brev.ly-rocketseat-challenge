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
  getSQLParamsByFilter(searchQuery?: string): Query
  remove(shortenedUrl: string): Promise<void>
} & IRepository<T>

export interface ISearchableParams {
  searchQuery?: string;
  sortBy?: 'createdAt';
  sortDirection?: 'desc' | 'asc';
  page?: number;
  perPage?: number;
}

export interface Query {
  sql: string;
  params: unknown[];
}