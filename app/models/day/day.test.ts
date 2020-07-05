import { Day, DayModel } from "./day"

test("can be created", () => {
  const instance: Day = DayModel.create({})

  expect(instance).toBeTruthy()
})
