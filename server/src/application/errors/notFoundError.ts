import { DomainError } from './domainError'

export class NotFoundError extends DomainError {
  name = 'NotFoundError'
  constructor(url: string) {
    super(`Link with url ${url} not found.`)
  }
}
