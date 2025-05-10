import { messages as pt } from "./locales/pt"
import { messages as en } from "./locales/en"

export const i18n = {
  defaultLocale: "pt",
  locales: ["pt", "en"],
  messages: {
    pt: pt,
    en: en,
  },
}

export type Locale = keyof typeof i18n.messages
