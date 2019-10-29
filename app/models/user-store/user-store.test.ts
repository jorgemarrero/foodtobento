import { UserStore, UserStoreModel } from "./user-store"

test("can be created", () => {
  const instance: UserStore = UserStoreModel.create({})

  expect(instance).toBeTruthy()
})
