import { ImageSourcePropType, ViewStyle } from "react-native"

export interface MenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  source: ImageSourcePropType

  vegan?: boolean

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  rating?: number

  meals?: string[]
}

export interface MenuListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  menus: Menu[]
}
