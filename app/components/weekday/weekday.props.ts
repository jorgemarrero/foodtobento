import { ImageSourcePropType, ViewStyle } from "react-native"

export interface WeekdayProps {
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

  source: ImageSourcePropType

  active?: boolean

  onPress?: () => void

  isFirst?: boolean

  isLast?: boolean
}
