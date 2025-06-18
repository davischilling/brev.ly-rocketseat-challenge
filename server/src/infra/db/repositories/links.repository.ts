import { ILinkToJSON, ILink } from "@/domain/models";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { schema } from "../schemas";
import { RepositoriesService } from "./repositories";
import { ILinkRepository } from "@/domain/contracts";
import { eq } from 'drizzle-orm'

type SchemaType = typeof schema
type ColumnsType = SchemaType[keyof SchemaType]['_']['config']

export class LinksRepository extends RepositoriesService<
  typeof schema,
  ColumnsType,
  ILinkToJSON
> implements ILinkRepository<ILinkToJSON> {
  constructor(model: PostgresJsDatabase<typeof schema>) {
    super(model, schema.links);
  }

  async findOriginalUrlByShortenedUrl(url: string): Promise<ILinkToJSON | null> {
    const [link] = await this.model.select()
      .from(schema.links)
      .where(
        eq(schema.links.shortenedUrl, url)
      );
    return link;
  }

  async remove(shortenedUrl: string): Promise<void> {
    await this.model.delete(schema.links)
      .where(eq(schema.links.shortenedUrl, shortenedUrl));
  }
}
