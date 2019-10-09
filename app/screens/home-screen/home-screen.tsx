import * as React from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon } from "react-native-ui-kitten"
import { NavigationScreenProps } from "react-navigation"

import { MenuList } from "../../components/menu-list"
import { MENU_LIST } from "../../components/menu-list/menu-list.story"
import { ProgressSteps } from "../../components/progress-steps"
import { getSteps } from "../../components/progress-steps/progress-steps.story"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Week } from "../../components/week"
import { getWeekList } from "../../components/week/week.story"
import { Wrapper } from "../../components/wrapper"
import { color, spacing } from "../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.green,
}
const SETTINGS_ICON_BUTTON: ViewStyle = {
  position: "absolute",
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2,
  padding: spacing[4],
}
const SETTINGS_ICON: ViewStyle = {
  width: 32,
  height: 32,
}

const TITLE: TextStyle = {
  lineHeight: 38,
  color: color.palette.white,
  paddingTop: spacing[5],
  paddingBottom: spacing[3],
}

const HINT: TextStyle = {
  marginTop: -spacing[3],
  paddingBottom: spacing[4],
  color: color.palette.offWhite,
}

export interface HomeScreenProps extends NavigationScreenProps<{}> {}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = props => {
  const navigateSettings = React.useMemo(() => () => props.navigation.navigate("settings"), [
    props.navigation,
  ])

  return (
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.green}>
      <TouchableOpacity style={SETTINGS_ICON_BUTTON} onPress={navigateSettings}>
        <Icon name="settings-outline" style={SETTINGS_ICON} fill={color.palette.offWhite}></Icon>
      </TouchableOpacity>
      <Wrapper>
        <Text category="h4" style={{ ...TITLE, marginTop: spacing[5] }}>
          Semana actual
        </Text>
      </Wrapper>
      <Week weekdays={getWeekList(3)} />
      <Wrapper>
        <Text category="h4" style={TITLE}>
          Próxima semana
        </Text>
        <ProgressSteps steps={getSteps(2)} />
        <Text category="h4" style={TITLE}>
          Menus Food to Bento
        </Text>
        <Text category="p2" style={HINT}>
          Cada semana dos nuevos menus
        </Text>
        <MenuList menus={MENU_LIST} />
      </Wrapper>
    </Screen>
  )
}
