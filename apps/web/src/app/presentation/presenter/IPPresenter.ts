import { container } from "tsyringe";
import { GetCurrentIPAddressUseCase } from "../../domain/usecase/ip/GetCurrentIPAddressUseCase";
import { IPView } from "../view/IPView";
import { Presenter } from "./Presenter";

export class IPPresenter implements Presenter {
  private readonly getCurrentIP: GetCurrentIPAddressUseCase;

  /**
   *
   * @param view the IPView (Appbar).
   */
  constructor(private readonly view: IPView) {
    // build the use cases
    this.getCurrentIP = container.resolve(GetCurrentIPAddressUseCase);
  }

  initializeView(): void {
    // get the current IP address.
    this.getCurrentIP
      .execute()
      .then((ipAddress) => this.view.showPublicIPAddress(ipAddress))
      .catch((error) => this.view.showError(error?.message));
  }
}
