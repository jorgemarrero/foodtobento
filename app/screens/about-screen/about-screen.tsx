import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"

import { Header } from "../../components/header"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
// import { useStores } from "../../models/root-store"
import { spacing } from "../../theme"

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.green,
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

export const AboutScreen: React.FunctionComponent = observer(props => {
  // const { someStore } = useStores()
  const navigation = useNavigation()
  const goBack = React.useMemo(() => () => navigation.goBack(), [navigation])

  return (
    <>
      <Header text="Food to Bento" onPress={goBack} />
      <Screen style={ROOT}>
        <Wrapper>
          <Text text="¿En qué consiste el batch cooking?" category="h6" style={TITLE} />
          <Text text="Consiste en dedicar unas pocas horas semanales a preparar con antelación todos los platos para las comidas y/o cenas de entre semana." />
          <Text text="¿Qué es el batch cooking?" category="h6" style={TITLE} />
          <Text text="Es ahorrar dinero. Evitamos desperdiciar alimentos porque compramos según un plan y preparamos la comida en el momento." />
          <Text text="Es ahorrar tiempo. Pensar cada día lo que vamos a comer nos quita mucho tiempo, eso sin contar con ir a la compra y cocinar." />
          <Text text="Es comer sano. Establecer un plan de comidas semanal equilibrado nos evita recurrir a lo primero que pillemos en la nevera y nos hace más sencillo llevar una buena dieta." />
          <Text text="Contáctanos" category="h6" style={TITLE} />
          <Text text="Si tienes alguna duda, sugerencia o nos quieres proner un menú no dudes en contactarnos por e-mail: info@foodtobento.com" />
        </Wrapper>
      </Screen>
    </>
  )
})
