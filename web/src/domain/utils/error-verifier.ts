import { LinkAlreadyExistsError } from "../errors"
import { InvalidRequestError } from "../errors/invalidRequestError"

type Response = {
  status: number
  data: {
    message: string
  }
}

export const errorVerifier = (response: Response): Error => {
  const { status, data } = response
  if (status === 400) {
    return new InvalidRequestError('Invalid request')
  } else if (status === 409) {
    return new LinkAlreadyExistsError("O link já existe")
  }
  return new Error(data.message)
}
