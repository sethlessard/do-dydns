import axios from "axios";
import { ApiErrorResponse } from "@do-dydns/api-definition";
import {injectable} from "tsyringe";

// TODO: dev and production urls

@injectable()
export class Api {

  readonly #url: string;

  constructor() {
    const urlSplit = window.location.href.split("/");
    this.#url = `${urlSplit[0]}//${urlSplit[2]}/api/v1`
  }

  /**
   * Get some data from the Api.
   * @param urlHash the url hash to GET.
   * @returns the data.
   */
  get<T>(urlHash: string): Promise<T | ApiErrorResponse> {
    return axios({
      method: "GET",
      url: this.#url + urlHash
    })
      .then(response => {
        // TODO: check response.data.success = false. Return ApiErrorPromise
        return response.data as T;
      });
  }

  /**
   * Get some data from the Api.
   * @param urlHash the url hash to DELETE.
   * @returns the data.
   */
  delete<T>(urlHash: string): Promise<T | ApiErrorResponse> {
    return axios({
      method: "DELETE",
      url: this.#url + urlHash
    })
      .then(response => {
        return response.data as T;
      });
  }

  /**
   * Get some data from the Api.
   * @param urlHash the url hash to DELETE.
   * @param payload the payload to POST in the body.
   * @returns the data.
   */
  post<T>(urlHash: string, payload: unknown): Promise<T | ApiErrorResponse> {
    return axios({
      method: "POST",
      url: this.#url + urlHash,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(payload)
    })
      .then(response => {
        return response.data as T;
      });
  }

  /**
   * Get some data from the Api.
   * @param urlHash the url hash to DELETE.
   * @param payload the payload to POST in the body.
   * @returns the data.
   */
  put<T>(urlHash: string, payload: unknown): Promise<T | ApiErrorResponse> {
    return axios({
      method: "PUT",
      url: this.#url + urlHash,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(payload)
    })
      .then(response => {
        return response.data as T;
      });
  }
}
