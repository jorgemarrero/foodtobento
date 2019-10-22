import { IngredientModel, Ingredient } from "./ingredient"

test("can be created", () => {
  const instance: Ingredient = IngredientModel.create({})

  expect(instance).toBeTruthy()
})