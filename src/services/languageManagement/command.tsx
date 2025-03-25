import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n';

export const switchLanguage = (language: string) => {
  i18n.changeLanguage(language);
  AsyncStorage.setItem('LANGUAGE', language)
};