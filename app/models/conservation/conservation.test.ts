import { ConservationModel, Conservation } from "./conservation"

test("can be created", () => {
  const instance: Conservation = ConservationModel.create({})

  expect(instance).toBeTruthy()
})