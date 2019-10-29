import { flatten, mergeAll } from "ramda"
import React from "react"
import { Platform, Text } from "react-native"
// @ts-ignore
const oldRender = Text.render

const settings = [
  {
    fontFamily: "sans-serif-thin",
    fontWeight: "normal",
  },
  {
    fontFamily: "sans-serif-light",
    fontWeight: "normal",
  },
  {
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
  {
    fontFamily: "sans-serif-medium",
    fontWeight: "normal",
  },
  {
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  {
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
  },
]

const defaultIndex = 2
// @ts-ignore
Text.render = (...args) => {
  // @ts-ignore
  const origin = oldRender.call(this, ...args)

  if (Platform.OS === "android") {
    let useIndex = defaultIndex
    if (typeof origin.props.style !== "undefined") {
      const style = mergeAll(flatten([origin.props.style]))
      if (typeof style.fontWeight !== "undefined") {
        const { fontWeight } = style

        if (fontWeight === "100" || fontWeight === "200" || fontWeight === "300") {
          useIndex = 0
        } else if (fontWeight === "400") {
          useIndex = 1
        } else if (fontWeight === "500" || fontWeight === "normal") {
          useIndex = 2
        } else if (fontWeight === "600") {
          useIndex = 3
        } else if (fontWeight === "700" || fontWeight === "bold") {
          useIndex = 4
        } else if (fontWeight === "800" || fontWeight === "900") {
          useIndex = 5
        }
      }
    }

    return React.cloneElement(origin, {
      style: [settings[defaultIndex], origin.props.style, settings[useIndex]],
    })
  }

  return origin
}
