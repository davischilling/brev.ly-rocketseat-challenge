import { DomainError } from './domainError'

export class LinkAlreadyExistsError extends DomainError {
  name = 'LinkAlreadyExistsError'
  constructor(url: string) {
    super(`Link with url ${url} already exists.`)
  }
}
