
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUS from '../locales/en-US.json';
import esES from '../locales/es-ES.json';
import ptBR from '../locales/pt-BR.json';
import frFR from '../locales/fr-FR.json';
import deDE from '../locales/de-DE.json';
import ruRU from '../locales/ru-RU.json';
import jaJP from '../locales/ja-JP.json';
import koKR from '../locales/ko-KR.json';
import zhCN from '../locales/zh-CN.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: enUS },
      'es-ES': { translation: esES },
      'pt-BR': { translation: ptBR },
      'fr-FR': { translation: frFR },
      'de-DE': { translation: deDE },
      'ru-RU': { translation: ruRU },
      'ja-JP': { translation: jaJP },
      'ko-KR': { translation: koKR },
      'zh-CN': { translation: zhCN },
    },
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
