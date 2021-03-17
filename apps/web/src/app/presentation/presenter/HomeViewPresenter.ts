import { Presenter } from "./Presenter";
import { HomeView } from "../view/HomeView";
import { GetCurrentIPAddressUseCase } from "../../domain/usecase/ip/GetCurrentIPAddressUseCase/GetCurrentIPAddressUseCase";
import {container} from "tsyringe";

export class HomeViewPresenter implements Presenter {

  private readonly getCurrentIP: GetCurrentIPAddressUseCase;

  /**
   * Create a new HomeViewPresenter instance.
   * @param view the HomeView.
   */
  constructor(
    private readonly view: HomeView
  ) {
    // build the use cases
    this.getCurrentIP = container.resolve(GetCurrentIPAddressUseCase);
  }

  /**
   * Initialize the view.
   */
  initializeView(): void {
    // get the current IP address.
    this.getCurrentIP.execute().then(ipAddress => this.view.showPublicIPAddress(ipAddress))
      .catch(error => this.view.showError(error?.message));
  }
}
