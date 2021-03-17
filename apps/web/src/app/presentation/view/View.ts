export interface View {

  /**
   * Display an error message to the user.
   * @param error the error message to display.
   */
  showError(error: string): void;
}
