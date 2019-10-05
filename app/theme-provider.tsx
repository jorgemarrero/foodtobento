import { light as lightTheme, mapping } from "@eva-design/eva"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import React from "react"
import { ApplicationProvider, IconRegistry } from "react-native-ui-kitten"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        {props.children}
      </ApplicationProvider>
    </>
  )
}
