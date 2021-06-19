import { container } from "tsyringe";
import { GetCurrentIPAddress } from "../../domain/usecase/ip/GetCurrentIPAddress";
import { AppbarView } from "../view/AppbarView";
import { Presenter } from "./Presenter";
import { GetSettings } from "../../domain/usecase/settings/GetSettings";
import { SyncWithDigitalOcean } from "../../domain/usecase/digitalocean/SyncWithDigitalOcean";

export class AppbarPresenter implements Presenter {
  private readonly getCurrentIP: GetCurrentIPAddress;
  private readonly getSettings: GetSettings;
  private readonly syncWithDigitalOceanUseCase: SyncWithDigitalOcean;

  /**
   * Create a new AppbarPresenter constructor.
   * @param view the AppbarView.
   */
  constructor(private readonly view: AppbarView) {
    // build the use cases
    this.getCurrentIP = container.resolve(GetCurrentIPAddress);
    this.getSettings = container.resolve(GetSettings);
    this.syncWithDigitalOceanUseCase = container.resolve(SyncWithDigitalOcean);
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
        this.view.showSyncIcon(settings.apiKeyValid);
      })
      .catch((error) => this.view.showError(error?.message));
  }

  /**
   * Sync with Digital Ocean.
   */
  syncWithDigitalOcean(): void {
    this.view.showError("Synchronizing with Digital Ocean...");
    this.syncWithDigitalOceanUseCase.execute();
  }
}
