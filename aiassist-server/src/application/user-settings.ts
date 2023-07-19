import { UserSettingsRepository } from "../db/repositories/user-settings.repository";
import { IUserSettings } from "../types";

export class UserSettings {
  static setUserSettings = async (settings: IUserSettings) => {
    await UserSettingsRepository.setUserSettings(settings);
    return settings;
  };

  static getUserSettings = async () => {
    const settings = await UserSettingsRepository.getUserSettings();
    return settings;
  };

  static getUserSettingsLanguages = async () => {
    const languages = await UserSettingsRepository.getUserLanguages();
    return languages;
  };
}
