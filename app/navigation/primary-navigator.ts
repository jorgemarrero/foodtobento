import { createStackNavigator } from "react-navigation"

import { DemoScreen } from "../screens/demo-screen"
import { HomeScreen } from "../screens/home-screen"

export const PrimaryNavigator = createStackNavigator(
  {
    home: { screen: HomeScreen },
    demo: { screen: DemoScreen },
  },
  {
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"]
