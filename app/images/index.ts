export const images = {
  step1: require("./step1.jpeg"),
  step2: require("./step2.jpeg"),
  step3: require("./step3.jpeg"),
  weekdays: {
    monday: require("./monday.jpeg"),
    tuesday: require("./tuesday.jpeg"),
    wednesday: require("./wednesday.jpeg"),
    thursday: require("./thursday.jpeg"),
    friday: require("./friday.jpeg"),
  },
}

export type ImagesTypes = keyof typeof images
