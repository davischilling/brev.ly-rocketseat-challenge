export abstract class DomainError extends Error {
  abstract name: string
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
