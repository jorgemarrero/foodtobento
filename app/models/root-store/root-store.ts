import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { MealStoreModel } from "../../models/meal-store"
import { MenuStoreModel } from "../../models/menu-store"
import { UserStoreModel } from "../../models/user-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  mealStore: types.optional(MealStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
  menuStore: types.optional(MenuStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
