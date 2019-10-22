import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { MenuStoreModel } from "../../models/menu-store"
import { NavigationStoreModel } from "../../navigation/navigation-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  menuStore: types.optional(MenuStoreModel, {}),
  navigationStore: types.optional(NavigationStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
