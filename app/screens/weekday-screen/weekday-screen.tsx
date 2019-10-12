import { observer } from "mobx-react"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button } from "react-native-ui-kitten"
import { NavigationScreenProps } from "react-navigation"

import { BulletItem } from "../../components/bullet-item"
import { Header } from "../../components/header"
import { MenuSteps } from "../../components/menu-steps"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

export interface WeekdayScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.green,
}

const HEADER_INACTIVE: ViewStyle = {
  backgroundColor: color.dim,
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
}

const TITLE_WITH_TEXT: TextStyle = {
  ...TITLE,
  paddingBottom: spacing[3],
}

const ROW_TITLE: ViewStyle = {
  flexDirection: "row",
  alignItems: "baseline",
  ...TITLE_WITH_TEXT,
}

const MEAL_LIST: ViewStyle = {
  paddingVertical: spacing[2],
  // paddingLeft: spacing[2],
}

const TIME: TextStyle = {
  color: color.dim,
}

const END_BUTTON: ViewStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[5],
}

export const WeekdayScreen: React.FunctionComponent<WeekdayScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const active = true
  console.tron.log("wprops", props)
  const { weekday }: { weekday?: string } = props.navigation.state.params
  return (
    <>
      <Header text={weekday} onPress={goBack} style={active ? {} : HEADER_INACTIVE} />
      <Screen style={ROOT} preset="scroll">
        <Wrapper>
          <Text text="Plato del día" category="h6" style={TITLE_WITH_TEXT} />
          <Text>Pierna de cordero con ajo, verduras de primavera asadas y judías blancas</Text>
          <Text text="Ingredientes" category="h6" style={TITLE_WITH_TEXT} />
          <Text>El plato ya está preparado</Text>
          <View style={ROW_TITLE}>
            <Text text="Preparación" category="h6" />
            <Text style={TIME}> - 10 minutos</Text>
          </View>
          <MenuSteps
            style={MEAL_LIST}
            steps={[
              "Precalienta el horno a 180º y calienta la pierna de cordero con la guarnición durante 10 minutos.",
              "¡Sírvelo!",
            ]}
          />
          <Text text="Para el día siguiente" category="h6" style={TITLE_WITH_TEXT} />
          <Text>
            Congela el bacalao a las finas hierbas, sácalo del congelador y déjalo en la nevera para
            que vaya descongelándose.
          </Text>
          <Button status="success" style={END_BUTTON}>
            Dar día como terminado
          </Button>
        </Wrapper>
      </Screen>
    </>
  )
})
