import { container } from 'tsyringe';
import { SettingsEntity } from '../../domain/entity/SettingsEntity';
import { GetSettingsUseCase } from '../../domain/usecase/settings/GetSettingsUseCase';
import { UpdateSettingsUseCase } from '../../domain/usecase/settings/UpdateSettingsUseCase';
import { SettingsView } from '../view/SettingsView';
import { Presenter } from './Presenter';

export class SettingsViewPresenter implements Presenter {
  private getSettingsUseCase: GetSettingsUseCase;

  /**
   * Create a new SettingsViewPresenter instance.
   * @param settingsView
   */
  constructor(private readonly settingsView: SettingsView) {
    this.getSettingsUseCase = container.resolve(GetSettingsUseCase);
  }

  /**
   * Initialize the view.
   */
  initializeView(): void {
    this.getSettingsUseCase
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error));
  }

  /**
   * Update the settings.
   * @param settings the settings.
   */
  updateSettings(settings: SettingsEntity): void {
    const updateSettings = container.resolve(UpdateSettingsUseCase);
    updateSettings.setRequestParams(settings);
    updateSettings
      .execute()
      .then((settings) => this.settingsView.showSettings(settings))
      .catch((error) => this.settingsView.showError(error));
  }
}
