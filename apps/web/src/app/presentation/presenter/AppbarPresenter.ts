import { container } from "tsyringe";
import { GetCurrentIPAddressUseCase } from "../../domain/usecase/ip/GetCurrentIPAddressUseCase";
import { AppbarView } from "../view/AppbarView";
import { Presenter } from "./Presenter";
import { GetSettingsUseCase } from "../../domain/usecase/settings/GetSettingsUseCase";

export class AppbarPresenter implements Presenter {
  private readonly getCurrentIP: GetCurrentIPAddressUseCase;
  private readonly getSettings: GetSettingsUseCase;

  /**
   * Create a new AppbarPresenter constructor.
   * @param view the AppbarView.
   */
  constructor(private readonly view: AppbarView) {
    // build the use cases
    this.getCurrentIP = container.resolve(GetCurrentIPAddressUseCase);
    this.getSettings = container.resolve(GetSettingsUseCase);
  }

  initializeView(): void {
    // get the current IP address.
    this.getCurrentIP
      .execute()
      .then((ipAddress) => this.view.showPublicIPAddress(ipAddress))
      .catch((error) => this.view.showError(error?.message));

    // verify that the user has set their Digital Ocean API key. This determines
    // whether or not to display the sync icon.
    this.getSettings
      .execute()
      .then((settings) => {
        if (!settings.apiKey || settings.apiKey.length === 0) {
          this.view.showSyncIcon(false);
        } else {
          this.view.showSyncIcon(true);
        }
      })
      .catch((error) => this.view.showError(error?.message));
  }
}
