export interface CreateLinkDTO {
  id?: string
  originalUrl: string
  shortenedUrl: string
  accessCount?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ILinkToJSON {
  id: string
  originalUrl: string
  shortenedUrl: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ILink {
  id: string
  originalUrl: string
  shortenedUrl: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
  increaseAccessCount(): void
  toJSON(): ILinkToJSON
}
