import { DomainError } from './domainError'

export class InvalidRequestError extends DomainError {
  name = 'InvalidRequestError'
}
