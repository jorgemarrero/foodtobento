import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"

import { BulletItem } from "../../components/bullet-item"
import { Header } from "../../components/header"
import { MenuSteps } from "../../components/menu-steps"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
import { WEEK_DAYS } from "../../models/menu-store"
import { useStores } from "../../models/root-store"
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

export const WeekdayScreen: React.FunctionComponent<WeekdayScreenProps> = observer(props => {
  const {
    menuStore: { selectedDay },
    mealStore: { getMeal, mealById },
  } = useStores()
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const active = true

  useEffect(() => {
    getMeal(selectedDay.lunch.mealRef)
  }, [getMeal, selectedDay.lunch.mealRef])

  const meal = mealById(selectedDay.lunch.mealRef.id)

  return (
    <>
      <Header
        tx={`weekdays.${WEEK_DAYS[selectedDay.index].day}`}
        onPress={goBack}
        style={active ? {} : HEADER_INACTIVE}
      />
      <Screen style={ROOT} preset="scroll">
        <Wrapper>
          <Text text="Plato del día" category="h6" style={TITLE_WITH_TEXT} />
          <Text>{selectedDay.lunch.meal}</Text>
          {meal && (
            <>
              <Text text="Ingredientes" category="h6" style={TITLE_WITH_TEXT} />
              {meal.ingredientsWeekday.length > 0 ? (
                meal.ingredientsWeekday.map(ingredient => (
                  <BulletItem key={ingredient} text={ingredient} color={color.dim}></BulletItem>
                ))
              ) : (
                <Text>El plato ya está preparado.</Text>
              )}
              <View style={ROW_TITLE}>
                <Text text="Preparación" category="h6" />
                <Text style={TIME}> - {meal.minutes.toString()} minutos</Text>
              </View>
              <MenuSteps style={MEAL_LIST} steps={meal.steps} />
            </>
          )}
          <Text text="Para el día siguiente" category="h6" style={TITLE_WITH_TEXT} />
          <Text>{selectedDay.nextDay}</Text>
        </Wrapper>
      </Screen>
    </>
  )
})
