import type { Readable } from 'node:stream'

export type UploadFileToStorageInput = {
  folder: string
  fileName: string
  contentType: string
  contentStream: Readable
}

export interface IStorage {
  uploadFileToStorage(input: UploadFileToStorageInput): Promise<{
    key: string
    url: string
  }>
}
