import React, { useMemo, useState } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Button, Icon, Layout, Modal } from "react-native-ui-kitten"
import { NavigationScreenProps } from "react-navigation"

import { MenuList } from "../../components/menu-list"
import { MenuProps } from "../../components/menu-list/menu-list.props"
import { MENU_LIST } from "../../components/menu-list/menu-list.story"
import { ProgressSteps } from "../../components/progress-steps"
import { Step } from "../../components/progress-steps/progress-steps.props"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Week } from "../../components/week"
import { getWeekList } from "../../components/week/week.story"
import { WeekdayProps } from "../../components/weekday/weekday.props"
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
  const navigateSettings = useMemo(() => () => props.navigation.navigate("settings"), [
    props.navigation,
  ])

  const [startWeekModalVisible, setStartWeekModalVisible] = useState(false)

  function addOnPressToWeekdays(weekdays: WeekdayProps[]): WeekdayProps[] {
    return weekdays.map(weekday => {
      return {
        ...weekday,
        onPress: weekday.day
          ? () => props.navigation.navigate("weekday", { weekday: weekday.day })
          : () => {},
      }
    })
  }

  function addOnPressToMenus(menus: MenuProps[]): MenuProps[] {
    return menus.map(menu => {
      return {
        ...menu,
        onPress: menu.uuid
          ? () => props.navigation.navigate("batchMenu", { menu: menu.uuid })
          : () => {},
      }
    })
  }

  function setModalVisible() {
    setStartWeekModalVisible(value => !value)
  }

  const STEPS: Step[] = [
    {
      title: "1. Haz la compra",
      description: "Online con nosotros o en el súper",
      onPress: useMemo(() => () => props.navigation.navigate("shoppingList"), [props.navigation]),
      completed: true,
      source: {
        uri:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
      },
    },
    {
      title: "2. A cocinar",
      description: "¿La parte más divertida? A meterse en la cocina y ponerla patas arriba",
      onPress: useMemo(() => () => props.navigation.navigate("cookingRecipe"), [props.navigation]),
      source: {
        uri:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
      },
    },
    {
      title: "3. Empezar la semana",
      description: "Nosotros te guiaremos día a día para que cumplas tu objetivo",
      onPress: useMemo(() => setModalVisible, []),
      source: {
        uri:
          "https://images.unsplash.com/photo-1519248494489-1e9f5586bf10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
      },
    },
  ]

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
      <Week weekdays={addOnPressToWeekdays(getWeekList(3))} />
      <Wrapper>
        <Text category="h4" style={TITLE}>
          Próxima semana
        </Text>
        <ProgressSteps steps={STEPS} />
        <Modal
          visible={startWeekModalVisible}
          allowBackdrop
          backdropStyle={{ backgroundColor: "black", opacity: 0.5 }}
          onBackdropPress={setModalVisible}
        >
          <Layout>
            <Text>Sure?</Text>
            <Button onPress={setModalVisible}>Hide hodal</Button>
          </Layout>
        </Modal>
        <Text category="h4" style={TITLE}>
          Menus Food to Bento
        </Text>
        <Text category="p2" style={HINT}>
          Cada semana dos nuevos menus
        </Text>
        <MenuList menus={addOnPressToMenus(MENU_LIST)} />
      </Wrapper>
    </Screen>
  )
}
