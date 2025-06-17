export class TokenGuard {
  static getToken(envVar: string): symbol {
    const value = process.env[envVar]
    if (!value) {
      throw new Error(`❌ ${envVar} is not set in .env`)
    }
    return Symbol.for(value)
  }

  static validateToken(envToken: symbol, passedToken: symbol, className: string) {
    if (envToken !== passedToken) {
      throw new Error(`❌ Use ${className}.create() instead of direct instantiation.`)
    }
  }

  constructor() {
    // Prevent instantiation of this class
    throw new Error('❌ This class cannot be instantiated directly.')
  }
}
