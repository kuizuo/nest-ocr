export class ResOp<T = any> {
  data?: T

  code: number

  message: string

  constructor(code: number, data: T, message = 'success') {
    this.code = code
    this.data = data
    this.message = message
  }

  static success<T>(data?: T, message?: string) {
    return new ResOp(200, data, message)
  }

  static error(code: number, message) {
    return new ResOp(code, {}, message)
  }
}

export class TreeResult<T> {
  id: number

  parentId: number

  children?: TreeResult<T>[]
}
