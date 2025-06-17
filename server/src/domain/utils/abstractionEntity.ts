import { TokenGuard } from '@/domain/utils/tokenGuard'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

type AbstractionEntityDTO = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  token: symbol
  entity: string
}

export abstract class AbstractionEntity<ToJSON> {
  #id: string
  #createdAt: Date;
  #updatedAt: Date;

  static internalToken = TokenGuard.getToken('ENTITY_TOKEN')
  constructor({ id = uuidv4(), createdAt = new Date(), updatedAt = new Date(), token, entity }: AbstractionEntityDTO) {
    TokenGuard.validateToken(AbstractionEntity.internalToken, token, entity)
    this.#id = this.idValidation(id)
    this.#createdAt = createdAt
    this.#updatedAt = updatedAt
  }

  get id(): string {
    return this.#id
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  get updatedAt(): Date {
    return this.#updatedAt
  }

  set updatedAt(value: Date) {
    this.#updatedAt = value
  }

  idValidation(id: string): string {
    if (id && !uuidValidate(id)) {
      throw new Error('Id is not valid')
    }
    return id;
  }

  abstract toJSON(): ToJSON
}
