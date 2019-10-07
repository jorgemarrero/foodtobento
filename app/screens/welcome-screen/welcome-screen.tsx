import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { ProgressSteps } from "../../components/progress-steps"
import { getSteps } from "../../components/progress-steps/progress-steps.story"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wallpaper } from "../../components/wallpaper"
import { Week } from "../../components/week"
import { getWeekList } from "../../components/week/week.story"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const TITLE: TextStyle = {
  lineHeight: 38,
  color: color.palette.white,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("demo"), [
    props.navigation,
  ])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text category="h4" style={{ ...TITLE, marginTop: spacing[6] }}>
          Semana actual
        </Text>
        <Week weekdays={getWeekList(3)} />
        <Text category="h4" style={TITLE}>
          Próxima semana
        </Text>
        <ProgressSteps steps={getSteps(1)} />
        <Text category="h4" style={TITLE}>
          Menus Food to Bento
        </Text>
      </Screen>
    </View>
  )
}
