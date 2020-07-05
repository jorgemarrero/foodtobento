import { storiesOf } from "@storybook/react-native"
import * as React from "react"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Header } from "./"

declare let module

storiesOf("Header", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <Header text="Header" />
      </UseCase>
    </Story>
  ))
