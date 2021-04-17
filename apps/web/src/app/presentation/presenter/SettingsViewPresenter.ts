import { container } from "tsyringe";
import { SettingsRequestEntity } from "../../domain/entity/SettingsRequestEntity";
import { GetSettingsUseCase } from "../../domain/usecase/settings/GetSettingsUseCase";
import { UpdateSettingsUseCase } from "../../domain/usecase/settings/UpdateSettingsUseCase";
import { SettingsView } from "../view/SettingsView";
import { Presenter } from "./Presenter";
import { ResetSettingsUseCase } from "../../domain/usecase/settings/ResetSettingsUseCase";
import { ResetDigitalOceanApiKeyUseCase } from "../../domain/usecase/settings/ResetDigitalOceanApiKeyUseCase";

export class SettingsViewPresenter implements Presenter {
  private readonly getSettingsUseCase: GetSettingsUseCase;
  private readonly resetSettingsUseCase: ResetSettingsUseCase;
  private readonly resetDigitalOceanApiKeyUseCase: ResetDigitalOceanApiKeyUseCase;

  /**
   * Create a new SettingsViewPresenter instance.
   * @param settingsView
   */
  constructor(private readonly settingsView: SettingsView) {
    this.getSettingsUseCase = container.resolve(GetSettingsUseCase);
    this.resetSettingsUseCase = container.resolve(ResetSettingsUseCase);
    this.resetDigitalOceanApiKeyUseCase = container.resolve(ResetDigitalOceanApiKeyUseCase);
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
      .then(settings => this.settingsView.showSettings(settings))
      .catch(error => this.settingsView.showError(error?.message));
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
    const updateSettings = container.resolve(UpdateSettingsUseCase);
    updateSettings.setRequestParams(settings);
    updateSettings
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error?.message));
  }
}
