import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export enum ModelName {
  Links = 'links',
}

export abstract class RepositoriesService<
  Schema extends Record<string, PgTableWithColumns<any>>,
  CreateDTO,
  Entity,
> {
  protected readonly model: PostgresJsDatabase<Schema>;
  protected readonly schema: PgTableWithColumns<any>;

  constructor(pg: PostgresJsDatabase<Schema>, schema: PgTableWithColumns<any>) {
    this.model = pg;
    this.schema = schema;
  }

  async create(createDTO: CreateDTO): Promise<Entity> {
    const entity = await this.model.insert(this.schema).values([createDTO]);
    return entity as Entity;
  }

  async findAll(): Promise<Entity[]> {
    const result = await this.model.select({
      id: this.schema.id,
      original_url: this.schema.original_url,
      shortened_url: this.schema.shortened_url,
      access_count: this.schema.access_count,
      created_at: this.schema.created_at,
      updated_at: this.schema.updated_at,
    }).from(this.schema);
    return result as Entity[];
  }

  findById(id: string): Promise<Entity | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: CreateDTO): Promise<Entity> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<Entity> {
    throw new Error("Method not implemented.");
  }
}
