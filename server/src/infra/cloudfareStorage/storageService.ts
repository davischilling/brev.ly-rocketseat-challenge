import type {
  IStorage,
  IValidation,
  UploadFileToStorageInput,
} from '@/domain/contracts'
import { basename, extname } from 'node:path'
import { randomUUID } from 'node:crypto'
import { Upload } from '@aws-sdk/lib-storage'
import { r2 } from './client'
import { env } from '@/env'

export class CloudflareStorageService implements IStorage {
  constructor(
    private readonly uploadFileToStorageInput: IValidation<UploadFileToStorageInput>
  ) {}

  async uploadFileToStorage(input: UploadFileToStorageInput): Promise<{
    key: string
    url: string
  }> {
    const { folder, contentStream, contentType, fileName } =
      this.uploadFileToStorageInput.parse(input)

    const fileExtension = extname(fileName)
    const fileNameWithoutExtension = basename(fileName)

    const sanitedFileName = fileNameWithoutExtension.replace(
      /[^a-zA-Z0-9]/g,
      ''
    )
    const sanitezNameWithExtension = sanitedFileName.concat(fileExtension)

    const uniqueFileName = `${folder}/${randomUUID()}-${sanitezNameWithExtension}`

    const upload = new Upload({
      client: r2,
      params: {
        Key: uniqueFileName,
        Bucket: env.CLOUDFLARE_BUCKET,
        Body: contentStream,
        ContentType: contentType,
      },
    })

    await upload.done()

    return {
      key: uniqueFileName,
      url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
    }
  }
}
