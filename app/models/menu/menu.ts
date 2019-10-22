import { Instance, SnapshotOut, types } from "mobx-state-tree"
import toPairs from "ramda/es/toPairs"

import { IngredientModel } from "../ingredient"

/**
 * Model description here for TypeScript hints.
 */
export const MenuModel = types
  .model("Menu")
  .props({
    id: types.identifier,
    rating: types.number,
    ingredients: IngredientModel,
    vegan: types.boolean,
    preparation: types.array(types.string),
    meals: types.array(types.string),
    steps: types.array(types.string),
    // date: types.Date,
    description: types.string,
    name: types.string,
    // days: types.array(DayModel)
  })
  .views(self => ({
    get shoppingList() {
      const result = toPairs(self.ingredients).map(([key, value]) => {
        return {
          title: key, // TODO: Traduce this
          data: value as string[],
        }
      })
      return result
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MenuType = Instance<typeof MenuModel>
export interface Menu extends MenuType {}
type MenuSnapshotType = SnapshotOut<typeof MenuModel>
export interface MenuSnapshot extends MenuSnapshotType {}
