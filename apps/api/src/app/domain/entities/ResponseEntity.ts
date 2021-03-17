
export interface ErrorResponseEntity {
  success: false;

  /**
   * The error, if any occurred.
   */
   error?: Error;

   /**
    * The code of the error, if any occurred.
    */
   errorCode?: string;
}

export interface ResponseEntity<T> {

  /**
   * True if successful, false if not.
   */
  success: true;

  /**
   * The payload to return.
   */
  payload: T;
}
