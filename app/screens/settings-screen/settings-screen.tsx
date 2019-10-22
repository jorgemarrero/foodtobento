import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button, Select, SelectOptionType } from "react-native-ui-kitten"
import { NavigationScreenProps } from "react-navigation"

import { Header } from "../../components/header"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

export interface SettingsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.green,
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

const SELECT: ViewStyle = {
  // backgroundColor: "red",
  marginTop: spacing[2],
}

const DATA: SelectOptionType[] = [
  { text: "Lunes" },
  { text: "Martes" },
  { text: "Miércoles" },
  { text: "Jueves" },
  { text: "Viernes" },
  { text: "Sábado" },
  { text: "Domingo" },
]

export const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = observer(props => {
  // const { someStore } = useStores()
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const [daySelected, setDaySelected] = useState<SelectOptionType>(DATA[0])

  function onSelectDay(selectedOption: SelectOptionType) {
    setDaySelected(selectedOption)
  }
  return (
    <>
      <Header text="Ajustes" onPress={goBack} />
      <Screen style={ROOT}>
        <Wrapper>
          <Text text="Día de la semana" category="h6" style={TITLE} />
          <Text text="Decide cual el primer día de tu semana. Será efectivo la próxima vez que inicies una semana." />
          <Select
            data={DATA}
            selectedOption={daySelected}
            onSelect={onSelectDay}
            style={SELECT}
          ></Select>
        </Wrapper>
      </Screen>
    </>
  )
})
