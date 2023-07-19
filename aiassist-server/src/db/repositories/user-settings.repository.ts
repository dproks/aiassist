import { IUserSettings } from "@/src/types";
import { UserSettingsModel } from "../models/user-settings.model";

export class UserSettingsRepository {
  static defaultUserSettings: IUserSettings = {
    originLanguage: "ukranian",
    targetLanguage: "english",
    messagesLimit: 20,
  };

  static async setUserSettings(settings: IUserSettings) {
    try {
      const collectionLength = await UserSettingsModel.count();
      if (collectionLength > 0) {
        await UserSettingsModel.replaceOne({}, settings);
      } else {
        const newSettings = new UserSettingsModel(settings);
        await newSettings.save();
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async setDefaultUserSettings() {
    this.setUserSettings(this.defaultUserSettings);
  }

  static async getUserSettings() {
    try {
      const settings = await UserSettingsModel.find({});

      if (!settings[0]) throw new Error("No user settings found");

      return settings[0];
    } catch (error) {
      console.error(error);
      return this.defaultUserSettings;
    }
  }

  static async getUserLanguages() {
    const settings = await this.getUserSettings();

    return {
      originLanguage: settings.originLanguage,
      targetLanguage: settings.targetLanguage,
    };
  }
}
