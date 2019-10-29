import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { Meal, MealModel } from "../meal/meal"

/**
 * Model description here for TypeScript hints.
 */
export const MealStoreModel = types
  .model("MealStore")
  .props({
    meals: types.array(MealModel),
  })
  .views(self => ({
    mealById(id: string) {
      return self.meals.find(meal => meal.id === id)
    },
  }))
  .actions(self => ({
    setMeal(meal: Meal) {
      const meals = [meal, ...self.meals]
      const result: Meal[] = []
      const map = new Map()
      for (const meal of meals) {
        if (!map.has(meal.name)) {
          map.set(meal.name, true) // set any value to Map
          result.push(meal)
        }
      }
      self.meals.replace(result)
    },
  }))
  .actions(self => ({
    async getMeal(mealRef: FirebaseFirestoreTypes.DocumentReference) {
      if (mealRef && mealRef.get) {
        const mealSnapshot = await mealRef.get()
        const data = mealSnapshot.data() as Meal
        if (data) {
          data.id = mealRef.id
          self.setMeal(data)
        }
      }
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MealStoreType = Instance<typeof MealStoreModel>
export interface MealStore extends MealStoreType {}
type MealStoreSnapshotType = SnapshotOut<typeof MealStoreModel>
export interface MealStoreSnapshot extends MealStoreSnapshotType {}
