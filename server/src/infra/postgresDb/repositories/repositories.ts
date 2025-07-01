import type { IRepository } from '@/domain/contracts'
import { eq } from 'drizzle-orm'
import type { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type { schema } from '../schemas'

export type SchemaType = typeof schema
export type LinksTable = typeof schema.links

export type AvailableTables = LinksTable
export abstract class RepositoriesService<ToJSONDto>
  implements IRepository<ToJSONDto>
{
  protected readonly model: PostgresJsDatabase<SchemaType>
  protected readonly schema: AvailableTables

  constructor(pg: PostgresJsDatabase<SchemaType>, schema: AvailableTables) {
    this.model = pg
    this.schema = schema
  }

  async create(data: ToJSONDto): Promise<void> {
    await this.model
      .insert(this.schema)
      .values(data as AvailableTables['$inferInsert'])
  }

  async findAll(): Promise<ToJSONDto[]> {
    const result = await this.model.select().from(this.schema)
    return result as ToJSONDto[]
  }

  findById(id: string): Promise<ToJSONDto | null> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, data: ToJSONDto): Promise<ToJSONDto> {
    const [link] = await this.model
      .update(this.schema)
      .set(data as PgTableWithColumns<TableConfig>['$inferInsert'])
      .where(eq(this.schema.id, id))
      .returning()
    return link as ToJSONDto
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
