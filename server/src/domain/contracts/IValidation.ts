export interface IValidation<T> {
  parse: (input: unknown) => T
}
