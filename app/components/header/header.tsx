import * as React from "react"
import {
  Platform,
  SafeAreaView,
  StatusBar,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Icon } from "react-native-ui-kitten"

import { color, spacing } from "../../theme"
import { Text } from "../text"

export interface HeaderProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  onPress?: () => void
}

const HEADER: ViewStyle = {
  minHeight: 80 - (Platform.OS === "android" ? StatusBar.currentHeight : 0),
  width: "100%",
  backgroundColor: color.palette.green,
  flexDirection: "row",
  alignItems: "center",
}

const ICON_BUTTON: ViewStyle = {
  padding: spacing[4],
}

const ICON_BUTTON_FAKE: ViewStyle = {
  ...ICON_BUTTON,
  opacity: 0,
}

const ICON: ViewStyle = {
  width: 28,
  height: 28,
}

const TITLE: TextStyle = {
  flex: 1,
  textAlign: "center",
  color: color.palette.white,
}

/**
 * Component description here for TypeScript tips.
 */
export function Header(props: HeaderProps) {
  // grab the props
  const { tx, text, style, onPress } = props

  return (
    <SafeAreaView style={{ ...HEADER, ...style }}>
      <TouchableOpacity style={ICON_BUTTON} onPress={onPress}>
        <Icon name="arrow-back-outline" style={ICON} fill={color.palette.white} />
      </TouchableOpacity>

      <Text category="h5" style={TITLE} tx={tx} text={text}></Text>
      <View style={ICON_BUTTON_FAKE}>
        <Icon name="arrow-back-outline" style={ICON} />
      </View>
    </SafeAreaView>
  )
}
