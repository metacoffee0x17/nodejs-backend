class Response {
  constructor(successCode, message, errorCode, errorMessage, data) {
    (this.Success = successCode),
      (this.message = message),
      (this.error = {
        ...(errorCode ? { errorCode: errorCode } : {}),
        ...(errorMessage ? { errorMessage: errorMessage } : {}),
      }),
      (this.data = data)
  }
}
module.exports = Response;
