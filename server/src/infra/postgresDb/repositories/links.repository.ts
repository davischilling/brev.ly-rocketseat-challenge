import type { ILinkRepository, Query } from '@/domain/contracts'
import type { ILinkToJSON } from '@/domain/models'
import { eq, ilike } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { schema } from '../schemas'
import { RepositoriesService } from './repositories'

export class LinksRepository
  extends RepositoriesService<ILinkToJSON>
  implements ILinkRepository<ILinkToJSON>
{
  constructor(model: PostgresJsDatabase<typeof schema>) {
    super(model, schema.links)
  }

  async findOriginalUrlByShortenedUrl(
    url: string
  ): Promise<ILinkToJSON | null> {
    const [link] = await this.model
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortenedUrl, url))
    return link
  }

  async remove(shortenedUrl: string): Promise<void> {
    await this.model
      .delete(schema.links)
      .where(eq(schema.links.shortenedUrl, shortenedUrl))
  }

  getSQLParamsByFilter(searchQuery?: string): Query {
    return this.model
      .select()
      .from(schema.links)
      .where(
        searchQuery
          ? ilike(schema.links.shortenedUrl, `%${searchQuery}%`)
          : undefined
      )
      .toSQL()
  }
}
