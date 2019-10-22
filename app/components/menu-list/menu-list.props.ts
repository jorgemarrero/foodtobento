import { ImageSourcePropType, ViewStyle } from "react-native"

export interface MenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  source?: ImageSourcePropType

  vegan?: boolean

  /**
   * Text which is looked up via i18n.
   */
  nameTx?: string

  /**
   * The name to display if not using `tx` or nested components.
   */
  name?: string

  rating?: number

  meals?: string[]

  id?: string

  onPress?: () => void
}

export interface MenuListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  menus: MenuProps[]
}
