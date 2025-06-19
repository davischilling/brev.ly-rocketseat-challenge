import { TokenGuard } from '@/domain/entities/utils/tokenGuard'

type AbstractionValueObjectDTO = {
  token: symbol
  valueObject: string
}

export abstract class AbstractionValueObject<ToJSON> {
  static internalToken = TokenGuard.getToken('VALUE_OBJECT_TOKEN')
  constructor({ token, valueObject }: AbstractionValueObjectDTO) {
    TokenGuard.validateToken(
      AbstractionValueObject.internalToken,
      token,
      valueObject
    )
  }

  abstract toJSON(): ToJSON
}
