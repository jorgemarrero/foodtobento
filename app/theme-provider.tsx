import { light as lightTheme, mapping } from "@eva-design/eva"
import React from "react"
import { ApplicationProvider } from "react-native-ui-kitten"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      {props.children}
    </ApplicationProvider>
  )
}
