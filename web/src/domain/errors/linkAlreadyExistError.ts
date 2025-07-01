import { DomainError } from './domainError'

export class LinkAlreadyExistsError extends DomainError {
  name = 'LinkAlreadyExistsError'
  constructor(message: string) {
    super(message)
  }
}
