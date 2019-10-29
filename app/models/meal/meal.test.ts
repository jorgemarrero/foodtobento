import { Meal, MealModel } from "./meal"

test("can be created", () => {
  const instance: Meal = MealModel.create({})

  expect(instance).toBeTruthy()
})
