import i18n from "i18n-js"
import * as RNLocalize from "react-native-localize"

const en = require("./en")
const es = require("./es")

i18n.fallbacks = true
i18n.translations = { en, es }

const fallback = { languageTag: "en", isRTL: false }
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) || fallback
i18n.locale = languageTag

i18n.missingTranslation = (key: string) => {
  if (typeof key !== "string") {
    return "Translation key error."
  }
  const textWithoutPrefix = key
    .split(".")
    .slice(1)
    .join(".")
  return textWithoutPrefix.length === 0 ? key : textWithoutPrefix
}
