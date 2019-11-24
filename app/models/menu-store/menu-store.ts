import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { flatten } from "ramda"

import { images } from "../../images"
import { withRootStore } from "../extensions"
import { MenuModel, MenuSnapshot } from "../menu/menu"

interface Day {
  index: number
  lunch: {
    mealRef: FirebaseFirestoreTypes.DocumentReference
    meal: string
    starterRef: FirebaseFirestoreTypes.DocumentReference // This is optional
    starter: string // This is optional
  }
  nextDay: string
  id: string
}

enum IngredientsCategory {
  DAIRY = "dairy",
  FISH = "fish",
  MEAT = "meat",
  MISCELLANEOUS = "miscellaneous",
  VEGETABLE = "vegetable",
  FRUIT = "fruit",
  PANTRY = "pantry",
}
interface Menu {
  rating: number
  ingredients: {
    [category in IngredientsCategory]: string[]
  }
  vegan: boolean
  preparation: string[]
  steps: string[]
  date: FirebaseFirestoreTypes.Timestamp
  description: string
  name: string
  days: Day[]
  meals: string[]
  id: string
  image: string // This is optional
  conservation: {
    fridge: string[]
    freezer: string[]
    normal: string[]
  }
}

interface WeekDay {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"
  source?: {
    uri: string
  }
}

export const WEEK_DAYS: WeekDay[] = [
  {
    day: "sunday",
  },
  {
    day: "monday",
    source: images.weekdays.monday,
  },
  {
    day: "tuesday",
    source: images.weekdays.tuesday,
  },
  {
    day: "wednesday",
    source: images.weekdays.wednesday,
  },
  {
    day: "thursday",
    source: images.weekdays.thursday,
  },
  {
    day: "friday",
    source: images.weekdays.friday,
  },
  {
    day: "saturday",
  },
]

/**
 * Model description here for TypeScript hints.
 */
export const MenuStoreModel = types
  .model("MenuStore")
  .extend(withRootStore)
  .props({
    menus: types.optional(types.array(MenuModel), []),
    nextWeekMenuId: types.optional(types.string, ""),
    nextWeekStep: types.optional(types.number, 0),
    currentWeekMenuId: types.optional(types.string, ""),
    ingredientsSelected: types.optional(types.array(types.string), []),
  })
  .views(self => ({
    get sortedMenus() {
      return self.menus.sort((a, b) => {
        if (a.date.toMillis > b.date.toMillis) return 1
        else return -1
      })
    },
    get hasNextWeek() {
      return this.nextWeekMenu !== undefined
    },
    get hasCurrentWeek() {
      return this.currentWeekMenu !== undefined
    },
    get selectedMenu() {
      const id = self.rootStore.navigationStore.getIdParam()
      return self.menus.find(menu => menu.id === id)
    },
    get nextWeekMenu() {
      return self.menus.find(menu => menu.id === self.nextWeekMenuId)
    },
    get currentWeekMenu() {
      return self.menus.find(menu => menu.id === self.currentWeekMenuId)
    },
  }))
  .views(self => ({
    get currentWeekMenuDays() {
      if (!self.hasCurrentWeek) return []

      return self.menus
        .find(menu => menu.id === self.currentWeekMenuId)
        .days.sort((a, b) => (a.index > b.index ? 1 : -1))
        .map(day => {
          const date = new Date()
          return {
            ...day,
            source: WEEK_DAYS[day.index] && WEEK_DAYS[day.index].source,
            day: WEEK_DAYS[day.index] ? WEEK_DAYS[day.index].day : null,
            active: date.getDay() === day.index,
          }
        })
    },
    get selectedDay() {
      const id = self.rootStore.navigationStore.getIdParam()
      if (!self.hasCurrentWeek) return null
      return self.currentWeekMenu.days.find(day => day.id === id)
    },
    get hasAllIngredients() {
      return (
        self.ingredientsSelected.length ===
        flatten(
          self.nextWeekMenu.shoppingList.map(category => {
            return category.data
          }),
        ).length
      )
    },
  }))
  .actions(self => ({
    addIngredientSelected(ingredient: string) {
      self.ingredientsSelected.replace([...new Set([...self.ingredientsSelected, ingredient])])
    },
    removeIngredientSelected(ingredient: string) {
      self.ingredientsSelected.replace(
        self.ingredientsSelected.filter(ingredientSelected => ingredientSelected !== ingredient),
      )
    },
  }))
  .actions(self => ({
    setData(menus: MenuSnapshot[]) {
      self.menus.replace(menus as any)
    },
    setNextWeek(id: string) {
      self.nextWeekMenuId = id
      self.nextWeekStep = 1
    },
    completeShopping() {
      if (self.nextWeekStep === 1) {
        self.nextWeekStep += 1
      }
    },
    completeCooking() {
      if (self.nextWeekStep === 2) {
        self.nextWeekStep += 1
      }
    },
    completeSteps() {
      self.nextWeekStep = 0
      self.currentWeekMenuId = self.nextWeekMenuId
      self.nextWeekMenuId = ""
    },
  }))
  .actions(self => ({
    async getData() {
      const menusSnapshot = await firestore()
        .collection("menus")
        .where("published", "==", true)
        .get()
      const menus = await Promise.all(
        menusSnapshot.docs.map(async doc => {
          const data = doc.data() as Menu
          data.id = doc.id
          const daysSnapshot = await firestore()
            .collection("menus")
            .doc(data.id)
            .collection("days")
            .get()
          data.days = daysSnapshot.docs.map(doc => {
            const day = doc.data() as Day
            day.id = doc.id
            return day
          })
          try {
            data.image = await storage()
              .refFromURL(data.image)
              .getDownloadURL()
          } catch (e) {
            delete data.image
          }
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
