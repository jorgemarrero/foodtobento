import { ImageSourcePropType, ViewStyle } from "react-native"

export interface Step {
  title: string
  description?: string
  onPress?: () => void
  completed?: boolean
  source?: ImageSourcePropType
}

export interface ProgressStepsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  steps: Step[]
}
