import { container } from "tsyringe";
import { GetCurrentIPAddressUseCase } from "../../domain/usecase/ip/GetCurrentIPAddressUseCase";
import { AppbarView } from "../view/AppbarView";
import { Presenter } from "./Presenter";
import { GetSettingsUseCase } from "../../domain/usecase/settings/GetSettingsUseCase";
import { SyncWithDigitalOceanUseCase } from "../../domain/usecase/digitalocean/SyncWithDigitalOceanUseCase";

export class AppbarPresenter implements Presenter {
  private readonly getCurrentIP: GetCurrentIPAddressUseCase;
  private readonly getSettings: GetSettingsUseCase;
  private readonly syncWithDigitalOceanUseCase: SyncWithDigitalOceanUseCase;

  /**
   * Create a new AppbarPresenter constructor.
   * @param view the AppbarView.
   */
  constructor(private readonly view: AppbarView) {
    // build the use cases
    this.getCurrentIP = container.resolve(GetCurrentIPAddressUseCase);
    this.getSettings = container.resolve(GetSettingsUseCase);
    this.syncWithDigitalOceanUseCase = container.resolve(
      SyncWithDigitalOceanUseCase
    );
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
