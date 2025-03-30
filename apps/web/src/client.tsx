/// <reference types="vinxi/types/client" />

import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import * as i18nConfig from './config/i18n';
import { createRouter } from './router';

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18nConfig,
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupCookie: '_i18n',
      caches: ['cookie', 'localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
