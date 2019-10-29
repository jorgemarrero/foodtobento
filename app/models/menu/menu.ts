import { Instance, SnapshotOut, types } from "mobx-state-tree"
import toPairs from "ramda/es/toPairs"

import { translate } from "../../i18n"
import { ConservationModel } from "../conservation"
import { DayModel } from "../day"
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
    steps: types.array(types.string),
    // date: types.Date,
    description: types.string,
    name: types.string,
    days: types.array(DayModel),
    conservation: ConservationModel,
  })
  .views(self => ({
    get shoppingList() {
      return toPairs(self.ingredients)
        .map(([key, value]) => {
          const ingredients = value as string[]
          return {
            title: translate(`ingredients.${key}`), // TODO: Traduce this
            data: ingredients.slice(),
          }
        })
        .filter(category => {
          return category.data.length > 0
        })
    },
    get meals() {
      return self.days.map(day => day.lunch.meal)
    },
    get mealsFridge() {
      return self.conservation.fridge
    },
    get mealsFreezer() {
      return self.conservation.freezer
    },
  }))

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
