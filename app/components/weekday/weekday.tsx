import * as React from "react"
import { Image, ImageStyle, TextStyle, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { color, spacing } from "../../theme"
import { Text } from "../text"
import { WeekdayProps } from "./weekday.props"

export const WEEKDAY_SQUARE_SIZE = 104

const ROOT: ViewStyle = {
  width: WEEKDAY_SQUARE_SIZE,
  marginLeft: spacing[3],
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
}
const ROOT_INACTIVE: ViewStyle = {
  ...ROOT,
  opacity: 0.6,
}

const IMAGE: ImageStyle = {
  width: WEEKDAY_SQUARE_SIZE,
  height: WEEKDAY_SQUARE_SIZE,
  backgroundColor: color.primary,
}
const TEXT: TextStyle = {
  alignSelf: "center",
  textAlign: "center",
  paddingTop: spacing[1],
  color: color.palette.white
}

/**
 * Stateless functional component for your needs
 */
export function Weekday(props: WeekdayProps) {
  // grab the props
  const { tx, text, style, source, active, isLast, ...rest } = props

  let rootStyle: ViewStyle = active ? { ...ROOT, ...style } : { ...ROOT_INACTIVE, ...style }
  rootStyle = isLast ? { ...rootStyle, marginRight: spacing[3] } : rootStyle
  return (
    <TouchableOpacity style={rootStyle} {...rest}>
      <Image source={source} style={IMAGE} />

      <Text category="label" style={TEXT} text={text} tx={tx}></Text>
    </TouchableOpacity>
  )
}
