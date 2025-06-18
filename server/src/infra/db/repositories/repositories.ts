import type { IRepository } from '@/domain/contracts';
import { eq } from 'drizzle-orm';
import type { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export abstract class RepositoriesService<
  Schema extends Record<string, PgTableWithColumns<Columns>>,
  Columns extends TableConfig,
  ToJSONDto
> implements IRepository<ToJSONDto> {
  protected readonly model: PostgresJsDatabase<Schema>
  protected readonly schema: PgTableWithColumns<any>

  constructor(pg: PostgresJsDatabase<Schema>, schema: PgTableWithColumns<any>) {
    this.model = pg
    this.schema = schema
  }
  async create(data: ToJSONDto): Promise<void> {
    await this.model.insert(this.schema).values(data as { [key: string]: unknown })
  }

  async findAll(): Promise<ToJSONDto[]> {
    const result = await this.model.select({ ...this.schema }).from(this.schema)
    return result as ToJSONDto[]
  }

  findById(id: string): Promise<ToJSONDto | null> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, data: ToJSONDto): Promise<ToJSONDto> {
    const [link] = await this.model
      .update(this.schema)
      .set(data as { [key: string]: unknown })
      .where(eq(this.schema.id, id))
      .returning({ ...this.schema })
    return link as ToJSONDto
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
