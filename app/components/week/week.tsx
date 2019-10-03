import React from "react"
import { View, ViewStyle } from "react-native"
import { List } from "react-native-ui-kitten"

import { spacing } from "../../theme"
import { Weekday, WEEKDAY_SQUARE_SIZE } from "../weekday"
import { WeekdayProps } from "../weekday/weekday.props"
import { WeekProps } from "./week.props"

const WEEKDAY_SEPARATOR = spacing[3]
const SEPARATOR: ViewStyle = {
  width: WEEKDAY_SEPARATOR,
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
      renderItem={weekday => {
        return <Weekday {...weekday.item} />
      }}
      ItemSeparatorComponent={() => {
        return <View style={SEPARATOR} />
      }}
      style={{ paddingBottom: spacing[4] }}
    />
  )
}
