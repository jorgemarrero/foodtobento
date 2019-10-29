import React from "react"
import { ImageBackground, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon as UIIcon, List, ListItem } from "react-native-ui-kitten"

import { color, spacing } from "../../theme"
import { findLastIndex } from "../../utils/findLastIndex"
import { ProgressStepsProps, Step } from "./progress-steps.props"

const IMAGE_SIZE = 80
const ICON_SIZE = 40

const LIST: ViewStyle = {
  backgroundColor: color.transparent,
}
const CONTAINER: ViewStyle = {
  padding: 0,
  paddingHorizontal: 0,
}

const ICON_CONTAINER: ViewStyle = {
  height: "100%",
  width: IMAGE_SIZE,
  alignSelf: "flex-start",
  marginRight: spacing[2],
  marginLeft: 0,
}

const ICON_STEP: ViewStyle = {
  backgroundColor: color.palette.greenTransparent,
  width: ICON_SIZE,
  height: ICON_SIZE,
  borderRadius: ICON_SIZE,
  justifyContent: "center",
  alignItems: "center",
}

const STEP_LINE: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  backgroundColor: "green",
  width: spacing[1],
}

const BACKGROUND: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
}

const ITEM: ViewStyle = {
  paddingVertical: 0,
  paddingHorizontal: 0,
}

const OPACITY: ImageStyle = {
  opacity: 0.4,
}

function isLast(data: any[], index: number) {
  return data.length === index + 1
}

function isNextToComplete(data: any[], index: number) {
  const firstIncompleteIndex = data.findIndex(step => {
    return !step.completed
  })
  return firstIncompleteIndex === index
}

function parseStepsCompleted(data: any[]) {
  const lastCompleteIndex = findLastIndex(data, step => {
    return step.completed
  })

  return data.map((step, index) => {
    const completed = index <= lastCompleteIndex - 1 ? true : step.completed
    return { ...step, completed }
  })
}

/**
 * Stateless functional component for your needs
 */
export function ProgressSteps(props: ProgressStepsProps) {
  // grab the props
  const { steps: defaultSteps } = props
  const steps = parseStepsCompleted(defaultSteps)

  function renderItem({ item, index }: { item: Step; index: number }) {
    function ItemIcon() {
      return (
        <View style={ICON_CONTAINER}>
          <ImageBackground
            source={item.source}
            style={BACKGROUND}
            imageStyle={isNextToComplete(steps, index) ? {} : OPACITY}
          >
            {item.completed && (
              <View style={ICON_STEP}>
                <UIIcon
                  name="checkmark-outline"
                  width={24}
                  height={24}
                  tintColor={color.palette.white}
                />
              </View>
            )}
          </ImageBackground>
          {!isLast(steps, index) && item.completed && <View style={STEP_LINE}></View>}
        </View>
      )
    }

    const textStyle: TextStyle = isNextToComplete(steps, index) ? {} : OPACITY
    return (
      <ListItem
        {...item}
        icon={ItemIcon}
        titleStyle={textStyle}
        descriptionStyle={textStyle}
        style={ITEM}
      />
    )
  }

  return (
    <List
      contentContainerStyle={CONTAINER}
      data={steps}
      renderItem={renderItem}
      style={LIST}
      // keyExtractor: TODO
    />
  )
}
