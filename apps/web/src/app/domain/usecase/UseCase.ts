
export abstract class UseCase<RequestEntity, ResponseEntity> {

  /**
   * Create a new UseCase instance.
   * @param request the request params.
   */
  constructor(protected readonly request: RequestEntity) { }

  /**
   * Execute the UseCase.
   */
  execute(): Promise<ResponseEntity> {
    return this.usecaseLogic();
  }

  /**
   * The usecase logic.
   */
  protected abstract usecaseLogic(): Promise<ResponseEntity>;
}
