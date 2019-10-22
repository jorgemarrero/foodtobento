import { MenuStore, MenuStoreModel } from "./menu-store"

test("can be created", () => {
  const instance: MenuStore = MenuStoreModel.create({})

  expect(instance).toBeTruthy()
})
