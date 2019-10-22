import { storiesOf } from "@storybook/react-native"
import * as React from "react"

import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { MenuList } from "."
import { MenuProps } from "./menu-list.props"

declare var module

export const MENU_LIST: MenuProps[] = [
  {
    name: "Tentación marina",
    source: {
      uri:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    },
    meals: [
      "Potaje de lentejas",
      "Pollo al limón",
      "Ceviche",
      "Caracoles en salsa",
      "Berenjenas asiáticas",
    ],
    rating: 5,
    id: "wejfniweofnewifnew",
  },
  {
    name: "De la tierra al plato",
    source: {
      uri:
        "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    },
    vegan: true,
    rating: 4.3,
    id: "owefeowkfwefewf",
  },
]

storiesOf("MenuList", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Examples", () => (
    <Story>
      <UseCase text="List example" style={{ backgroundColor: color.storybookDarkBg }}>
        <MenuList menus={MENU_LIST} />
      </UseCase>
    </Story>
  ))
