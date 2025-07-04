import { CURSOR_ROWS_LIMIT, FolderTypes } from '@/application/constants'
import type { ICSVGenerator, IStorage, Query } from '@/domain/contracts'
import { pg } from '@/infra/postgresDb'
import { stringify } from 'csv-stringify'
import { PassThrough, Transform, pipeline } from 'node:stream'

export class CSVGeneratorSergvice implements ICSVGenerator {
  constructor(private readonly storage: IStorage) {}

  async generateCSV({ sql, params }: Query): Promise<{
    csvUrl: string
  }> {
    const cursor = pg.unsafe(sql, params as string[]).cursor(CURSOR_ROWS_LIMIT)
    const csv = stringify({
      delimiter: ',',
      header: true,
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'originalUrl', header: 'Original URL' },
        { key: 'shortenedUrl', header: 'Shortened URL' },
        { key: 'accessCount', header: 'Access Count' },
        { key: 'createdAt', header: 'Uploaded At' },
      ],
    })
    const uploadToStorageStream = new PassThrough()

    const convertToCSVPipeline = pipeline(
      cursor,
      new Transform({
        objectMode: true,
        transform(chunks: unknown[], _encoding, callback) {
          for (const chunk of chunks) {
            this.push(chunk)
          }
          callback()
        },
      }),
      csv,
      uploadToStorageStream,
      err => {
        if (err) {
          console.error('Pipeline failed.', err)
        } else {
          console.log('Pipeline succeeded.')
        }
      }
    )

    const uploadToStorage = this.storage.uploadFileToStorage({
      contentType: 'text/csv',
      folder: FolderTypes.LINKS,
      fileName: `${new Date().toISOString()}-links.csv`,
      contentStream: uploadToStorageStream,
    })

    const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

    return {
      csvUrl: url,
    }
  }
}
