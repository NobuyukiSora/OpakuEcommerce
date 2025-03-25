import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './languages/en.json'
import id from './languages/id.json'
import vi from './languages/vi.json'

const deviceLocale = Localization.getLocales()[0].languageTag;

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: deviceLocale,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      vi: { translation: vi },
      id: { translation: id },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
