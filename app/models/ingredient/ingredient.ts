import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const IngredientModel = types.model("Ingredient").props({
  dairy: types.optional(types.array(types.string), []),
  fish: types.optional(types.array(types.string), []),
  meat: types.optional(types.array(types.string), []),
  miscellaneous: types.optional(types.array(types.string), []),
  vegetable: types.optional(types.array(types.string), []),
  fruit: types.optional(types.array(types.string), []),
  pantry: types.optional(types.array(types.string), []),
})

type IngredientType = Instance<typeof IngredientModel>
export interface Ingredient extends IngredientType {}
type IngredientSnapshotType = SnapshotOut<typeof IngredientModel>
export interface IngredientSnapshot extends IngredientSnapshotType {}
