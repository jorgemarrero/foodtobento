import * as React from "react"
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"

import { color, spacing } from "../../theme"
import { Text } from "../text"
import { MenuListProps, MenuProps } from "./menu-list.props"

const veganImage = require("./vegan-friendly.png")

const ROOT: ViewStyle = {
  marginBottom: spacing[4],
}
const FOOTER: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[3],
}
const IMAGE: ImageStyle = {
  width: "100%",
  height: 164,
}

const VEGAN: ViewStyle = {
  width: 72,
  height: 72,
  position: "absolute",
  top: spacing[2],
  right: spacing[2],
  justifyContent: "center",
  alignItems: "center",
}

const VEGAN_IMAGE: ImageStyle = {
  width: "100%",
  height: "100%",
}

const TITLE: TextStyle = {
  fontWeight: "bold",
}

const INGREDIENTS: TextStyle = {
  paddingTop: spacing[1],
}

const DESCRIPTION: ViewStyle = {
  flexDirection: "row",
  alignItems: "baseline",
}

function joinMeals(meals: string[]) {
  if (!meals || meals.length === 0) return ""
  return meals.join(" · ")
}

function getRating(rating: number) {
  if (rating >= 4.5) return { text: `${rating.toFixed(1)} Excelente`, color: color.palette.green }
  if (rating >= 4.2)
    return { text: `${rating.toFixed(1)} Muy bueno`, color: color.palette.blueGreen }
  if (rating >= 3.8) return { text: `${rating.toFixed(1)} Bueno`, color: color.palette.blueGreen }
  if (rating >= 3) return { text: `${rating.toFixed(1)} Normal`, color: color.palette.orangeDarker }
  return { text: `${rating.toFixed(1)} Malo`, color: color.palette.angry }
}

/**
 * Component description here for TypeScript tips.
 */
export function MenuList(props: MenuListProps) {
  // grab the props
  // const { tx, text, style, vegan } = props
  // const rootStyle = { ...ROOT, ...style }
  const { menus } = props

  function renderMenu({ item }: { item: MenuProps }) {
    const { nameTx, name, style, vegan, source, meals, rating: defaultRating, onPress } = item
    const rootStyle = { ...ROOT, ...style }
    const rating = getRating(defaultRating)
    const actualSource: ImageSourcePropType = source || {
      uri:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    }
    return (
      <TouchableOpacity style={rootStyle} onPress={onPress}>
        <ImageBackground source={actualSource} style={IMAGE}>
          {vegan && (
            <View style={VEGAN}>
              <Image source={veganImage} style={VEGAN_IMAGE} />
            </View>
          )}
        </ImageBackground>
        <View style={FOOTER}>
          <View style={DESCRIPTION}>
            <Text tx={nameTx} text={name} style={TITLE} category="p2" />
            <Text text={" - "} category="p2" />
            <Text text={`★ ${rating.text}`} style={{ color: rating.color }} category="p2" />
          </View>
          <Text
            text={joinMeals(meals)}
            style={INGREDIENTS}
            category="p2"
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
      </TouchableOpacity>
    )
  }

  return <FlatList renderItem={renderMenu} data={menus} />
}
