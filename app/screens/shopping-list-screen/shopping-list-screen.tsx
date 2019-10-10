import { observer } from "mobx-react"
import append from "ramda/es/append"
import flatten from "ramda/es/flatten"
import includes from "ramda/es/includes"
import React, { useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { CheckBox } from "react-native-ui-kitten"
import { NavigationScreenProps, SectionList } from "react-navigation"

import { Header } from "../../components/header"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
// import { useStores } from "../../models/root-store"
import { spacing } from "../../theme"

/********************************/

type ShoppingListCategoryData = string
interface ShoppingListCategory {
  title: string
  data: ShoppingListCategoryData[]
}

const SHOPPING_LIST: ShoppingListCategory[] = [
  {
    title: "Verduleria",
    data: [
      "5 cebollas",
      "10 patatas nuevas medianas",
      "8 o10 tomates de pera",
      "4 tomates para ensalada",
      "2 cabezas de ajos",
      "4 limones",
      "14 zanahorias",
      "600 g de espinacas",
      "4 pimientos",
      "4 pepinos",
      "2 calabazas violín",
      "300 g de shiitake",
      "2 aguacates",
      "1 k de judías verdes",
      "1 brócoli mediano (unos 800 g)",
      "2 mangos medianos (800 g aproximadamente)",
      "perejil",
      "1 manzana reineta",
      "1 pera conferencia",
      "2 melocotones",
      "150 g de rúcula",
    ],
  },
  {
    title: "Aves",
    data: ["8 contramuslos de pollo limpios", "12 huevos", "600 g de pechuga de pavo en dados"],
  },
  {
    title: "Pescado",
    data: [
      "4 raciones de bonito (fresco o congelado)",
      "4 jureles de ración",
      "300 g de langostinos cocidos pelados (pueden ser congelados o sustituirse con alguna proteína vegetal como tofu duro).",
    ],
  },
  {
    title: "Lácteos",
    data: [
      "2 yogures naturales",
      "1 burrata de 250 g o dos pequeñas",
      "500 ml de leche evaporada",
      "80 g de queso azul",
    ],
  },
  {
    title: "Además",
    data: [
      "1,5 l de caldo de pollo o verduras",
      "100 g de fideos finos para sopa",
      "40 g de avellanas",
      "600 g de garbanzos cocidos",
      "800 g de judías cocidas",
      "mostaza",
      "80 g de almendras tostadas",
      "sal",
      "pimienta",
      "500 g de arroz integral",
      "albahaca seca pimentón",
      "alcaparras",
      "mostaza",
      "miel",
      "semillas de hinojo",
      "aceite",
      "vinagre.",
    ],
  },
]

/********************************/

export interface ShoppingListScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.green,
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

const CHECK_BOX: ViewStyle = {
  paddingVertical: spacing[2],
}

function getList(list: ShoppingListCategory[]): string[] {
  return flatten(
    list.map(category => {
      return category.data
    }),
  )
}
// TODO: Check Out of Mil
export const ShoppingListScreen: React.FunctionComponent<ShoppingListScreenProps> = observer(
  props => {
    // const { someStore } = useStores()
    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
    const [uncheckedList, setUncheckedList] = useState(getList(SHOPPING_LIST))
    function renderHeader({ section }: { section: ShoppingListCategory }) {
      return <Text text={section.title} category="h6" style={TITLE} />
    }
    function renderItem({ item }: { item: ShoppingListCategoryData }) {
      // const [checked, setChecked] = useState(false)
      return (
        <CheckBox
          style={CHECK_BOX}
          text={item}
          checked={!includes(item, uncheckedList)}
          onChange={value => {
            if (value) {
              setUncheckedList(currentList => {
                return currentList.filter(element => {
                  return element !== item
                })
              })
            } else {
              setUncheckedList(currentList => {
                console.tron.log(currentList)
                return append(item, currentList)
              })
            }
          }}
        />
      )
    }
    return (
      <>
        <Header text="Lista de la compra" onPress={goBack} />
        <Screen style={ROOT} preset="scroll">
          <Wrapper>
            <SectionList
              sections={SHOPPING_LIST}
              renderItem={renderItem}
              renderSectionHeader={renderHeader}
            />
          </Wrapper>
        </Screen>
      </>
    )
  },
)
