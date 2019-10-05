import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Alert } from "react-native"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Text } from "../text"
import { ProgressSteps } from "./"
import { Step } from "./progress-steps.props"
const STEPS: Step[] = [
  {
    title: "1. Haz la compra",
    description: "Online con nosotros o en el súper",
    onPress: () => Alert.alert("Prssed"),
    completed: true,
    source: {
      uri:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "2. A cocinar",
    description: "¿La parte más divertida? A meterse en la cocina y ponerla patas arriba",
    onPress: () => Alert.alert("Prssed"),
    source: {
      uri:
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    title: "3. Empezar la semana",
    description: "Nosotros te guiaremos día a día para que cumplas tu objetivo",
    onPress: () => Alert.alert("Prssed"),
    source: {
      uri:
        "https://images.unsplash.com/photo-1519248494489-1e9f5586bf10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
]

function getSteps(completed: number) {
  return STEPS.map((step, index) => ({ ...step, completed: index + 1 <= completed }))
}

function getRandomSteps(completed: number[]) {
  return STEPS.map((step, index) => ({ ...step, completed: completed.includes(index + 1) }))
}

declare var module

storiesOf("ProgressSteps", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="0">
        <ProgressSteps steps={getSteps(0)} />
      </UseCase>
      <UseCase text="1">
        <ProgressSteps steps={getSteps(1)} />
      </UseCase>
      <UseCase text="2">
        <ProgressSteps steps={getSteps(2)} />
      </UseCase>
      <UseCase text="3">
        <ProgressSteps steps={getSteps(3)} />
      </UseCase>
      <UseCase text="[1, 3]">
        <ProgressSteps steps={getRandomSteps([1, 3])} />
      </UseCase>
      <UseCase text="[2]">
        <ProgressSteps steps={getRandomSteps([2])} />
      </UseCase>
      <UseCase text="[3]">
        <ProgressSteps steps={getRandomSteps([3])} />
      </UseCase>
    </Story>
  ))
