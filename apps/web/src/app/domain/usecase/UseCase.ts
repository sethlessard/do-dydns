export abstract class UseCase<RequestEntity, ResponseEntity> {
  protected request: RequestEntity;

  /**
   * Execute the UseCase.
   */
  execute(): Promise<ResponseEntity> {
    return this.useCaseLogic();
  }

  /**
   * Set the request parameters.
   * @param request the request parameters.
   */
  setRequestParams(request: RequestEntity): void {
    this.request = request;
  }

  /**
   * The use case logic.
   */
  protected abstract useCaseLogic(): Promise<ResponseEntity>;
}
