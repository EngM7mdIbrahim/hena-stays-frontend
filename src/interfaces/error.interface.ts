export interface ErrorData {
  data?: {
    data?: { message: string; msg?: string; path: string[] }[]
    msg?: string
    message?: string
  }
}

export interface ShowError extends ErrorData {
  response?: ErrorData

  message?: string
}
