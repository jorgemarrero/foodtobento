import { Menu, MenuModel } from "./menu"

test("can be created", () => {
  const instance: Menu = MenuModel.create({})

  expect(instance).toBeTruthy()
})
