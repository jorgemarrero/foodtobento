import { storiesOf } from "@storybook/react-native"
import * as React from "react"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { WeekdayProps } from "../weekday/weekday.props"
import { Week } from "./"

const WEEK_LIST = [
  {
    text: "Lunes",
    source: {
      uri:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    text: "Martes",
    source: {
      uri:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    text: "Miércoles",
    source: {
      uri:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    text: "Jueves",
    source: {
      uri:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    text: "Viernes",
    source: {
      uri:
        "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    text: "Sábado",
    source: {
      uri:
        "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
  {
    text: "Domingo",
    source: {
      uri:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=80",
    },
  },
]

function getWeekList(active: number): WeekdayProps[] {
  return WEEK_LIST.map((day, index) => ({ ...day, active: active === index }))
}

declare var module

storiesOf("Week", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Use cases", () => (
    <Story>
      <UseCase text="First active">
        <Week weekdays={getWeekList(0)} />
      </UseCase>
      <UseCase text="Fourth active">
        <Week weekdays={getWeekList(3)} />
      </UseCase>
    </Story>
  ))
