import { ILinkToJSON, ILink } from "@/domain/models";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { schema } from "../schemas";
import { RepositoriesService } from "./repositories";
import { IRepository } from "@/domain/contracts";

export class LinksRepository extends RepositoriesService<
  typeof schema,
  ILinkToJSON,
  ILink
> implements IRepository<ILinkToJSON, ILink> {
  constructor(model: PostgresJsDatabase<typeof schema>) {
    super(model, schema.links);
  }
}
