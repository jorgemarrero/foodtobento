import { Conservation, ConservationModel } from "./conservation"

test("can be created", () => {
  const instance: Conservation = ConservationModel.create({})

  expect(instance).toBeTruthy()
})
