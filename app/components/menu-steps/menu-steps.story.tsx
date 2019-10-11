import { storiesOf } from "@storybook/react-native"
import * as React from "react"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { MenuSteps } from "./"

declare var module

storiesOf("MenuSteps", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MenuSteps steps={["MenuSteps"]} />
      </UseCase>
    </Story>
  ))
