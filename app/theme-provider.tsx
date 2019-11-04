import { light as lightTheme, mapping } from "@eva-design/eva"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import React from "react"
import { ApplicationProvider, IconRegistry } from "react-native-ui-kitten"

import { color } from "./theme/color"

interface ThemeProviderProps {
  children: React.ReactNode
}

const customTheme = {
  ...lightTheme,
  "color-success-500": color.palette.green,
  "color-success-600": color.palette.greenDark,
}

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={customTheme}>
        {props.children}
      </ApplicationProvider>
    </>
  )
}
