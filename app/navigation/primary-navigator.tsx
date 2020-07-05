/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"

import { AboutScreen } from "../screens/about-screen"
import { BatchMenuScreen } from "../screens/batch-menu-screen"
import { CookingRecipeScreen } from "../screens/cooking-recipe-screen"
import { HomeScreen } from "../screens/home-screen"
import { ShoppingListScreen } from "../screens/shopping-list-screen"
import { WeekdayScreen } from "../screens/weekday-screen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export interface PrimaryParamList {
  welcome: undefined
  demo: undefined
}

// Documentation: https://github.com/software-mansion/react-native-screens/tree/master/native-stack
const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="weekday" component={WeekdayScreen} />
      <Stack.Screen name="shoppingList" component={ShoppingListScreen} />
      <Stack.Screen name="cookingRecipe" component={CookingRecipeScreen} />
      <Stack.Screen name="batchMenu" component={BatchMenuScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
