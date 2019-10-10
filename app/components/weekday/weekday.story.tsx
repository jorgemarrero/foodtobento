import { storiesOf } from "@storybook/react-native"
import React from "react"
import { Alert } from "react-native"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Weekday } from "./"

declare var module

storiesOf("Weekday", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Active">
        <Weekday
          text="Lunes"
          active
          day="monday"
          source={{
            uri:
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
          }}
        />
      </UseCase>
      <UseCase text="No active">
        <Weekday
          text="Martes"
          source={{
            uri:
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
          }}
          day="tuesday"
        />
      </UseCase>
    </Story>
  ))
