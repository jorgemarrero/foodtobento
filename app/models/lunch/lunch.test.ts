import { LunchModel, Lunch } from "./lunch"

test("can be created", () => {
  const instance: Lunch = LunchModel.create({})

  expect(instance).toBeTruthy()
})