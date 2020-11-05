import { Action } from "redux";

interface ErrorAction extends Action {
  error: Error | string;
}

export default ErrorAction;
