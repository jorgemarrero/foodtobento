import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { color, spacing } from "../../theme"
import { Text } from "../text"

export interface MenuStepsProps {
  steps?: string[]

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

const STEP: ViewStyle = {}
const STEP_NUMBER: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 40,
  backgroundColor: color.palette.greenTransparent,
  justifyContent: "center",
  alignItems: "center",
  marginTop: spacing[5],
  marginBottom: spacing[2],
}
const FIRST_STEP_NUMBER: ViewStyle = {
  ...STEP_NUMBER,
  marginTop: 0,
}
const STEP_NUMBER_TEXT: TextStyle = {
  color: color.palette.white,
}

export function MenuSteps(props: MenuStepsProps) {
  // grab the props
  const { style, steps } = props

  return (
    <View style={style}>
      {steps.map((step, index) => (
        <View key={step} style={STEP}>
          <View style={index === 0 ? FIRST_STEP_NUMBER : STEP_NUMBER}>
            <Text style={STEP_NUMBER_TEXT}>{`${index + 1}`}</Text>
          </View>
          <Text>{step}</Text>
        </View>
      ))}
    </View>
  )
}
