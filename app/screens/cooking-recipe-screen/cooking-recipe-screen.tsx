import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FunctionComponent as Component } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button } from "react-native-ui-kitten"

import { BulletItem } from "../../components/bullet-item"
import { Header } from "../../components/header"
import { MenuSteps } from "../../components/menu-steps"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  paddingTop: spacing[4],
  // backgroundColor: color.palette.green,
}

const DESCRIPTION: ViewStyle = {
  paddingTop: spacing[5],
}

const MEAL_LIST: ViewStyle = {
  paddingVertical: spacing[2],
  // paddingLeft: spacing[2],
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

const CONGRATULATIONS: TextStyle = {
  paddingBottom: spacing[2],
}

const END_BUTTON: ViewStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[5],
}

/**
 * TODO: Si ha estado más de 5 minutos y le da atrás sin darle a he terminado, confirmar que no ha terminado
 */
export const CookingRecipeScreen: Component = observer(props => {
  const navigation = useNavigation()
  const {
    menuStore: { nextWeekMenu, completeCooking },
  } = useStores()
  const goBack = React.useMemo(() => () => navigation.goBack(), [navigation])

  function handleOnPress() {
    completeCooking()
    goBack()
  }

  return (
    <>
      <Header text="¡A cocinar!" onPress={goBack} />
      <Screen style={ROOT} preset="scroll">
        <Wrapper>
          <View style={MEAL_LIST}>
            {nextWeekMenu.meals.map(meal => {
              return <BulletItem key={meal} text={meal}></BulletItem>
            })}
          </View>
          <Text text="Preparativos" category="h6" style={TITLE} />
          <Text>Asegúrate de tener esto preparado antes de empezar a cocinar:</Text>
          <View style={MEAL_LIST}>
            {nextWeekMenu.preparation.map(meal => {
              return <BulletItem key={meal} text={meal} color={color.dim}></BulletItem>
            })}
          </View>
          <Text text="Pasos" category="h6" style={TITLE} />
          <MenuSteps style={MEAL_LIST} steps={nextWeekMenu.steps} />
          <Text text="¡Todo listo!" category="h6" style={TITLE} />
          <Text style={CONGRATULATIONS}>
            ¡Felicidades, has acabado de cocinar! Ahora deja que se enfríe y guardalo todo a buen
            recaudo.
          </Text>
          {nextWeekMenu.mealsFridge.length > 0 && (
            <>
              <Text>Guardar en la nevera:</Text>
              <View style={MEAL_LIST}>
                {nextWeekMenu.mealsFridge.map(meal => {
                  return <BulletItem key={meal} text={meal}></BulletItem>
                })}
              </View>
            </>
          )}
          {nextWeekMenu.mealsFreezer.length > 0 && (
            <>
              <Text>Guardar en la congelador:</Text>
              <View style={MEAL_LIST}>
                {nextWeekMenu.mealsFreezer.map(meal => {
                  return <BulletItem key={meal} text={meal}></BulletItem>
                })}
              </View>
            </>
          )}
          <Button status="success" style={END_BUTTON} onPress={handleOnPress}>
            He terminado de cocinar
          </Button>
        </Wrapper>
      </Screen>
    </>
  )
})
