/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */

import "./i18n"
import "./utils/ignore-warnings"
import "./utils/fixAndroidFont" // TODO: CHeck this
// TODO: REMOVE THIS IMPORT. IT'S A TEMPORAL FIX OF react-native-gesture-handler.
// Read more in this issue https://github.com/kmagiera/react-native-gesture-handler/issues/746#issuecomment-537562738
import "react-native-gesture-handler"

import { NavigationContainerRef } from "@react-navigation/native"
import React, { FunctionComponent as Component, useEffect, useRef, useState } from "react"
import { initialWindowSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context"
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"

import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"
import {
  canExit,
  RootNavigator,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "./navigation"
import { ThemeProvider } from "./theme-provider"
import { bootstrapCollections } from "./utils/bootstrap"
import * as storage from "./utils/storage"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App: Component<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      bootstrapCollections()
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <ThemeProvider>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </ThemeProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
