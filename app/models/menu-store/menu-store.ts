import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { withRootStore } from "../extensions"
import { MenuModel, MenuSnapshot } from "../menu/menu"

interface Day {
  index: number
  lunch: {
    // eslint-disable-next-line camelcase
    meal_ref: FirebaseFirestoreTypes.DocumentReference
    conservation: string
  }
  nextDat: string
}

enum IngredientsCategory {
  DAIRY = "dairy",
  FISH = "fish",
  MEAT = "meat",
  MISCELLANEOUS = "miscellaneous",
  VEGETABLES = "vegetables",
  FRUIT = "fruit",
}
interface Menu {
  rating: number
  ingredients: {
    [category in IngredientsCategory]: string[]
  }
  vegan: boolean
  preparation: string[]
  steps: string[]
  date: Date
  description: string
  name: string
  days: Day[]
  meals: string[]
  id: string
}

/**
 * Model description here for TypeScript hints.
 */
export const MenuStoreModel = types
  .model("MenuStore")
  .extend(withRootStore)
  .props({
    menus: types.optional(types.array(MenuModel), []),
    active: types.optional(types.string, ""),
  })
  .views(self => ({
    get hasActiveMenu() {
      return self.active !== ""
    },
    get selectedMenu() {
      const id = self.rootStore.navigationStore.getIdParam()
      return self.menus.find(menu => menu.id === id)
    },
  }))
  .actions(self => ({
    setData(menus: MenuSnapshot[]) {
      self.menus.replace(menus as any)
    },
  }))
  .actions(self => ({
    async getData() {
      const menusSnapshot = await firestore()
        .collection("menus")
        .get()
      const menus: Menu[] = await Promise.all(
        menusSnapshot.docs.map(async doc => {
          const data = doc.data() as Menu
          data.id = doc.id
          const daysSnapshot = await firestore()
            .collection("menus")
            .doc(data.id)
            .collection("days")
            .get()
          data.days = daysSnapshot.docs.map(doc => {
            return doc.data() as Day
          })
          data.meals = [
            "Potaje de lentejas",
            "Pollo al limón",
            "Ceviche",
            "Caracoles en salsa",
            "Berenjenas asiáticas",
          ]
          return data
        }),
      )
      console.tron.log("MENUS", menus)
      self.setData(menus)
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type MenuStoreType = Instance<typeof MenuStoreModel>
export interface MenuStore extends MenuStoreType {}
type MenuStoreSnapshotType = SnapshotOut<typeof MenuStoreModel>
export interface MenuStoreSnapshot extends MenuStoreSnapshotType {}
