
export abstract class UseCase<RequestEntity, ResponseEntity> {

  protected request: RequestEntity;

  /**
   * Execute the UseCase.
   */
  execute(): Promise<ResponseEntity> {
    return this.usecaseLogic();
  }

  /**
   * Set the request parameters.
   * @param request the request parameters.
   */
  setRequestParams(request: RequestEntity): void {
    this.request = request;
  }

  /**
   * The usecase logic.
   */
  protected abstract usecaseLogic(): Promise<ResponseEntity>;
}
