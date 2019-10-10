import { observer } from "mobx-react"
import * as React from "react"
import { ViewStyle } from "react-native"
import { Button } from "react-native-ui-kitten"
import { NavigationScreenProps } from "react-navigation"

import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
// import { useStores } from "../../models/root-store"
import { color } from "../../theme"

export interface CookingRecipeScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.green,
}

export const CookingRecipeScreen: React.FunctionComponent<CookingRecipeScreenProps> = observer(
  props => {
    // const { someStore } = useStores()
    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
    return (
      <Screen style={ROOT}>
        <Text text="CookingRecipeScreen" />
        <Button onPress={goBack}>Go back</Button>
      </Screen>
    )
  },
)
