import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ConservationModel = types
  .model("Conservation")
  .props({
    freezer: types.optional(types.array(types.string), []),
    fridge: types.optional(types.array(types.string), []),
    normal: types.optional(types.array(types.string), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ConservationType = Instance<typeof ConservationModel>
export interface Conservation extends ConservationType {}
type ConservationSnapshotType = SnapshotOut<typeof ConservationModel>
export interface ConservationSnapshot extends ConservationSnapshotType {}
