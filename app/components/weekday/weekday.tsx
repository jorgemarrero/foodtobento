import * as React from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { color, spacing } from "../../theme"
import { Text } from "../text"
import { WeekdayProps } from "./weekday.props"

export const WEEKDAY_SQUARE_SIZE = 104
const TEXT_BOX_HEIGHT = 24

const ROOT: ViewStyle = {
  width: WEEKDAY_SQUARE_SIZE,
  marginLeft: spacing[3],
  shadowColor: "#000",
  backgroundColor: color.palette.white,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
}

const INACTIVE: ViewStyle = {
  position: "absolute",
  backgroundColor: color.palette.grayTransparent,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
}

const IMAGE: ImageStyle = {
  width: WEEKDAY_SQUARE_SIZE,
  height: WEEKDAY_SQUARE_SIZE - TEXT_BOX_HEIGHT,
  backgroundColor: color.primary,
}

const TEXT_WRAPPER: ViewStyle = {
  justifyContent: "center",
  height: TEXT_BOX_HEIGHT,
  alignItems: "center",
}
const TEXT: TextStyle = {
  alignSelf: "center",
  textAlign: "center",
}
const TEXT_INACTIVE: TextStyle = {
  ...TEXT,
  opacity: 0.6,
}

/**
 * Stateless functional component for your needs
 */
export function Weekday(props: WeekdayProps) {
  // grab the props
  const { tx, text, style, source, active, isLast, ...rest } = props

  let rootStyle: ViewStyle = { ...ROOT, ...style }
  rootStyle = isLast ? { ...rootStyle, marginRight: spacing[3] } : rootStyle

  return (
    <TouchableOpacity style={rootStyle} {...rest}>
      {!active && <View style={INACTIVE}></View>}
      <Image source={source} style={IMAGE} />
      <View style={TEXT_WRAPPER}>
        <Text category="s2" style={active ? TEXT : TEXT_INACTIVE} text={text} tx={tx}></Text>
      </View>
    </TouchableOpacity>
  )
}
