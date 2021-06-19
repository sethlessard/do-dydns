import { container } from "tsyringe";
import { SettingsRequestEntity } from "../../domain/entity/SettingsRequestEntity";
import { GetSettings } from "../../domain/usecase/settings/GetSettings";
import { UpdateSettings } from "../../domain/usecase/settings/UpdateSettings";
import { SettingsView } from "../view/SettingsView";
import { Presenter } from "./Presenter";
import { ResetSettings } from "../../domain/usecase/settings/ResetSettings";
import { ResetDigitalOceanApiKey } from "../../domain/usecase/settings/ResetDigitalOceanApiKey";

export class SettingsViewPresenter implements Presenter {
  private readonly getSettingsUseCase: GetSettings;
  private readonly resetSettingsUseCase: ResetSettings;
  private readonly resetDigitalOceanApiKeyUseCase: ResetDigitalOceanApiKey;

  /**
   * Create a new SettingsViewPresenter instance.
   * @param settingsView
   */
  constructor(private readonly settingsView: SettingsView) {
    this.getSettingsUseCase = container.resolve(GetSettings);
    this.resetSettingsUseCase = container.resolve(ResetSettings);
    this.resetDigitalOceanApiKeyUseCase = container.resolve(
      ResetDigitalOceanApiKey
    );
  }

  /**
   * Initialize the view.
   */
  initializeView(): void {
    this.getSettingsUseCase
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error?.message));
  }

  /**
   * Reset the Digital Ocean API key.
   */
  resetApiKey(): void {
    this.resetDigitalOceanApiKeyUseCase
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error?.message));
  }

  /**
   * Reset the settings.
   */
  resetSettings(): void {
    this.resetSettingsUseCase
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error?.message));
  }

  /**
   * Update the settings.
   * @param settings the settings.
   */
  updateSettings(settings: SettingsRequestEntity): void {
    const updateSettings = container.resolve(UpdateSettings);
    updateSettings.setRequestParams(settings);
    updateSettings
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error?.message));
  }
}
