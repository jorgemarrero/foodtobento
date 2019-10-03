import { observer } from "mobx-react"
import * as React from "react"
// @ts-ignore: until they update @type/react-navigation
import { getNavigation, NavigationScreenProp, NavigationState } from "react-navigation"

import { useStores } from "../models/root-store"
import { RootNavigator } from "./root-navigator"

let currentNavigation: NavigationScreenProp<NavigationState> | undefined

export const StatefulNavigator: React.FunctionComponent<{}> = observer(() => {
  const {
    navigationStore: { state, dispatch, actionSubscribers },
  } = useStores()

  currentNavigation = getNavigation(
    RootNavigator.router,
    state,
    dispatch,
    actionSubscribers(),
    {},
    () => currentNavigation,
  )

  return <RootNavigator navigation={currentNavigation} />
})
