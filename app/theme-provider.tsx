import React from "react"
import { mapping, light as lightTheme } from "@eva-design/eva"
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
