import * as React from "react"
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { color, spacing } from "../../theme"
import { Text } from "../text"
import { WeekdayProps } from "./weekday.props"

export const WEEKDAY_SQUARE_SIZE = 104

const ROOT: ViewStyle = {
  width: WEEKDAY_SQUARE_SIZE,
}
const ROOT_INACTIVE: ViewStyle = {
  ...ROOT,
  opacity: 0.5,
}

const IMAGE: ImageStyle = {
  width: WEEKDAY_SQUARE_SIZE,
  height: WEEKDAY_SQUARE_SIZE,
  backgroundColor: color.primary,
  borderRadius: spacing[1],
}
const TEXT: TextStyle = {
  alignSelf: "center",
  textAlign: "center",
  paddingTop: spacing[1],
}

/**
 * Stateless functional component for your needs
 */
export function Weekday(props: WeekdayProps) {
  // grab the props
  const { tx, text, style, source, active, ...rest } = props

  const rootStyle: ViewStyle = active ? { ...ROOT, ...style } : { ...ROOT_INACTIVE, ...style }

  return (
    <TouchableOpacity style={rootStyle} {...rest}>
      <Image source={source} style={IMAGE} />

      <Text category="label" style={TEXT} text={text} tx={tx}></Text>
    </TouchableOpacity>
  )
}
