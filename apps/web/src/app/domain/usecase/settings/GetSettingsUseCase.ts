import { inject, injectable } from 'tsyringe';
import { SettingsRepository } from '../../datasource/repository/SettingsRepository';
import { SettingsEntity } from '../../entity/SettingsEntity';
import { UseCase } from '../UseCase';

@injectable()
export class GetSettingsUseCase extends UseCase<void, SettingsEntity> {
  /**
   * Create a new GetSettingsUseCase instance.
   * @param settingsRepository the settings repository.
   */
  constructor(
    @inject('SettingsRepository')
    private readonly settingsRepository: SettingsRepository
  ) {
    super();

    // bind
    this.usecaseLogic = this.usecaseLogic.bind(this);
  }

  /**
   * Get the settings.
   * @returns the settings.
   */
  protected usecaseLogic(): Promise<SettingsEntity> {
    return this.settingsRepository.getSettings();
  }
}
