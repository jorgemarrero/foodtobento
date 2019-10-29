import React from "react"
import { ViewStyle } from "react-native"
import { List } from "react-native-ui-kitten"

import { color, spacing } from "../../theme"
import { Weekday, WEEKDAY_SQUARE_SIZE } from "../weekday"
import { WeekdayProps } from "../weekday/weekday.props"
import { WeekProps } from "./week.props"

const WEEKDAY_SEPARATOR = spacing[3]
const TRANSPARENT: ViewStyle = {
  backgroundColor: color.transparent,
}

function isFirst(index: number) {
  return index === 0
}
function isLast(length: number, index: number) {
  return length - 1 === index
}

function getDayActive(weekdays: WeekdayProps[]) {
  return weekdays.findIndex(day => day.active)
}

export function Week(props: WeekProps) {
  const { weekdays } = props
  return (
    <List
      horizontal
      data={weekdays}
      initialScrollIndex={getDayActive(weekdays)}
      getItemLayout={(data, index) => {
        return {
          length: WEEKDAY_SQUARE_SIZE,
          offset: (WEEKDAY_SQUARE_SIZE + WEEKDAY_SEPARATOR) * index,
          index,
        }
      }}
      onScroll={() => {}}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: weekday, index }: { item: WeekdayProps; index: number }) => {
        return (
          <Weekday {...weekday} isFirst={isFirst(index)} isLast={isLast(weekdays.length, index)} />
        )
      }}
      style={TRANSPARENT}
    />
  )
}
