import { createStackNavigator } from "react-navigation"

import { BatchMenuScreen } from "../screens/batch-menu-screen"
import { CookingRecipeScreen } from "../screens/cooking-recipe-screen"
import { HomeScreen } from "../screens/home-screen"
import { SettingsScreen } from "../screens/settings-screen"
import { ShoppingListScreen } from "../screens/shopping-list-screen"
import { WeekdayScreen } from "../screens/weekday-screen"

export const PrimaryNavigator = createStackNavigator(
  {
    home: { screen: HomeScreen },
    weekday: { screen: WeekdayScreen },
    shoppingList: { screen: ShoppingListScreen },
    cookingRecipe: { screen: CookingRecipeScreen },
    batchMenu: { screen: BatchMenuScreen },
    settings: { screen: SettingsScreen },
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
