import { MealStore, MealStoreModel } from "./meal-store"

test("can be created", () => {
  const instance: MealStore = MealStoreModel.create({})

  expect(instance).toBeTruthy()
})
