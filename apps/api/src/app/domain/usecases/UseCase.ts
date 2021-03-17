import { ErrorResponseEntity } from "../entities/ResponseEntity";

export abstract class UseCase<Request, Response> {

  protected _param: Request;

  /**
   * Set the use case's request parameter.
   * @param request the request parameter.
   */
  setRequestParam(request: Request): void {
    this._param = request;
  }

  /**
   * Execute the use case.
   */
  execute(): Promise<Response | ErrorResponseEntity> {
    return this.useCaseLogic();
  }

  /**
   * Execute the use case and return the reponse.
   * @returns the use case response.
   */
  protected abstract useCaseLogic(): Promise<Response | ErrorResponseEntity>;
}
