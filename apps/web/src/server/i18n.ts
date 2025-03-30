// import { serverOnly$ } from "vite-env-only/macros";
// import { resolve } from "node:path";

// import { getCookie, setCookie, getEvent } from 'vinxi/http';
import Backend from 'i18next-fs-backend';

import * as i18n from '@/config/i18n';

// export const i18nCookie = {
//   name: '_i18n',
//   options: {
//     path: '/',
//     sameSite: 'lax',
//     httpOnly: true,
//     maxAge: 604_800,
//     secrets: [process.env.SESSION_SECRET || 'SESSION_SECRET'],
//     secure: process.env.NODE_ENV === 'production',
//   },
// };

// // Helper function to get/set the language cookie
// export const getLanguageCookie = () => {
//   const event = getEvent();
//   return getCookie(event, i18nCookie.name);
// };

// export const setLanguageCookie = (locale: string) => {
//   const event = getEvent();
//   setCookie(event, i18nCookie.name, locale, i18nCookie.options);
// };

// Create i18n server instance
export default {
  detection: {
    // cookie: i18nCookie.name,
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    // getCookie: getLanguageCookie,
    // setCookie: setLanguageCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    resources: i18n.resources,
    defaultNS: i18n.defaultNS,
    // ...i18n,
    // backend: {
    //   loadPath: resolve("./locales/{{lng}}/{{ns}}.json"),
    // },
  },
  plugins: [Backend],
};
