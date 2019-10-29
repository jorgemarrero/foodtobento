import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const MealModel = types
  .model("Meal")
  .props({
    minutes: types.number,
    name: types.string,
    steps: types.optional(types.array(types.string), []),
    id: types.identifier,
    ingredientsWeekday: types.optional(types.array(types.string), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MealType = Instance<typeof MealModel>
export interface Meal extends MealType {}
type MealSnapshotType = SnapshotOut<typeof MealModel>
export interface MealSnapshot extends MealSnapshotType {}
