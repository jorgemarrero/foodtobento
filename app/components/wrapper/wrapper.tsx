import * as React from "react"
import { View, ViewStyle } from "react-native"

import { spacing } from "../../theme"

export interface WrapperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  children?: React.ReactNode
}

const WRAPPER: ViewStyle = {
  paddingHorizontal: spacing[4],
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Wrapper(props: WrapperProps) {
  // grab the props
  const { style: styleOverride, ...rest } = props
  const style = { ...WRAPPER, ...styleOverride }

  return <View style={style} {...rest} />
}
