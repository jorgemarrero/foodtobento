import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const LunchModel = types
  .model("Lunch")
  .props({
    // meal_ref: NOT used
    conservation: types.enumeration(["fridge", "freezer"]),
    meal: types.string,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type LunchType = Instance<typeof LunchModel>
export interface Lunch extends LunchType {}
type LunchSnapshotType = SnapshotOut<typeof LunchModel>
export interface LunchSnapshot extends LunchSnapshotType {}
