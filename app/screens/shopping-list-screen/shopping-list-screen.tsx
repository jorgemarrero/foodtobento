import { observer } from "mobx-react-lite"
import includes from "ramda/es/includes"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button, CheckBox } from "react-native-ui-kitten"
import { NavigationScreenProps, SectionList } from "react-navigation"

import { Header } from "../../components/header"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
import { useStores } from "../../models/root-store"
import { spacing } from "../../theme"

/********************************/

type ShoppingListCategoryData = string
interface ShoppingListCategory {
  title: string
  data: ShoppingListCategoryData[]
}

/********************************/

export interface ShoppingListScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {}
const SECTION: ViewStyle = {
  paddingBottom: spacing[5] * 4,
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

const CHECK_BOX: ViewStyle = {
  paddingVertical: spacing[2],
}

const END_BUTTON: ViewStyle = {
  bottom: spacing[5],
  left: spacing[7],
  right: spacing[7],
  position: "absolute",
}

const BUTTON_TEXT: TextStyle = {
  textAlign: "center",
}

// TODO: Check Out of Mil
export const ShoppingListScreen: React.FunctionComponent<ShoppingListScreenProps> = observer(
  props => {
    const {
      menuStore: {
        nextWeekMenu,
        hasAllIngredients,
        completeShopping,
        ingredientsSelected,
        addIngredientSelected,
        removeIngredientSelected,
      },
    } = useStores()
    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])

    function renderHeader({ section }: { section: ShoppingListCategory }) {
      return <Text text={section.title} category="h6" style={TITLE} />
    }
    function renderItem({ item }: { item: ShoppingListCategoryData }) {
      return (
        <CheckBox
          style={CHECK_BOX}
          text={item}
          checked={includes(item, ingredientsSelected)}
          onChange={value => {
            if (value) {
              addIngredientSelected(item)
            } else {
              removeIngredientSelected(item)
            }
          }}
        />
      )
    }

    function handleOnPress() {
      // TODO: Show alert to confirm if hasAllIngredients === false
      completeShopping()
      goBack()
    }

    // Little hack to force re-render after `ingredientsSelected` changes
    const extraData = ingredientsSelected.slice()

    return (
      <>
        <Header text="Lista de la compra" onPress={goBack} />
        <Screen preset="fixed" style={ROOT}>
          <Wrapper>
            <SectionList
              sections={nextWeekMenu.shoppingList}
              renderItem={renderItem}
              renderSectionHeader={renderHeader}
              extraData={extraData}
              stickySectionHeadersEnabled={false}
              contentContainerStyle={SECTION}
            />
          </Wrapper>
        </Screen>
        <Button
          status={hasAllIngredients ? "success" : "basic"}
          style={END_BUTTON}
          textStyle={BUTTON_TEXT}
          onPress={handleOnPress}
        >
          Ya tengo todos los ingredientes
        </Button>
      </>
    )
  },
)
