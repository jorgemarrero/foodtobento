import * as React from "react"
import { Text as UIKittenText } from "react-native-ui-kitten"

import { translate } from "../../i18n"
import { TextProps } from "./text.props"
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const { tx, txOptions, text, children, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return <UIKittenText {...rest}>{content}</UIKittenText>
}
