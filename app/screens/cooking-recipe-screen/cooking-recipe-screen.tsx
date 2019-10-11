import { observer } from "mobx-react"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button } from "react-native-ui-kitten"
import { NavigationScreenProps } from "react-navigation"

import { BulletItem } from "../../components/bullet-item"
import { Header } from "../../components/header"
import { MENU_LIST } from "../../components/menu-list/menu-list.story"
import { MenuSteps } from "../../components/menu-steps"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
// import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

export interface CookingRecipeScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.green,
}

const DESCRIPTION: ViewStyle = {
  paddingTop: spacing[5],
}

const MEAL_LIST: ViewStyle = {
  paddingVertical: spacing[2],
  // paddingLeft: spacing[2],
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

const CONGRATULATIONS: TextStyle = {
  paddingBottom: spacing[2],
}

const END_BUTTON: ViewStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[5],
}

/**
 * TODO: Si ha estado más de 5 minutos y le da atrás sin darle a he terminado, confirmar que no ha terminado
 */
export const CookingRecipeScreen: React.FunctionComponent<CookingRecipeScreenProps> = observer(
  props => {
    // const { someStore } = useStores()
    const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
    return (
      <>
        <Header text="¡A cocinar!" onPress={goBack} />
        <Screen style={ROOT} preset="scroll">
          <Wrapper>
            <Text style={DESCRIPTION}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nibh libero,
              tristique eget euismod a, dapibus a felis. Donec et interdum nulla, non porta mauris.
              Morbi accumsan ipsum libero:
            </Text>
            <View style={MEAL_LIST}>
              {MENU_LIST[0].meals.map(meal => {
                return <BulletItem key={meal} text={meal}></BulletItem>
              })}
            </View>
            <Text text="Preparativos" category="h6" style={TITLE} />
            <Text>Asegúrate de tener esto preparado antes de empezar a cocinar:</Text>
            <View style={MEAL_LIST}>
              {["Cocina limpia", "Horno", "Tabla de cortar", "Ingredientes accesibles"].map(
                meal => {
                  return <BulletItem key={meal} text={meal} color={color.dim}></BulletItem>
                },
              )}
            </View>
            <Text text="Pasos" category="h6" style={TITLE} />
            <MenuSteps
              style={MEAL_LIST}
              steps={[
                "Encender el horno a 180 grados y repartir en una o dos bandejas 10 patatas nuevas medianas, dos berenjenas grandes cortadas por la mitad a lo largo -con la parte de la carne hacia abajo, untada con un poco de aceite- o cuatro pequeñas, 8 o 10 tomates de pera -cortados por la mitad y en una fuente más pequeña, aliñados con un poco de aceite y ajo picado-, dos calabazas violín cortadas a lo largo (unos 750 g cada una).",
                "En otra bandejita, pondremos también dos pimientos rojos y seis zanahorias troceados, aliñados con un poco de ajo, aceite, sal, pimienta y un chorrito de vino blanco",
                "Pasados unos 15 minutos, dar unas vueltas a las zanahorias y los pimientos y a los tomates. 15 minutos después, darles otra vuelta a las zanahorias y los pimientos y poner encima los jureles de ración, sin cabeza ni tripa y aliñados con hierbas al gusto, sal y pimienta: tardarán entre 10 y 12 minutos, dependiendo del tamaño: el jurel con pimientos y zanahoria al horno ya está terminado.",
                "Al poner el jurel mirar si los tomates están listos; si lo están, sacarlos (si no, esperar un poco más, vigilando cada cinco minutos). Las berenjenas pueden tardar unos 40 minutos, las patatas un poco más y las calabazas hasta algo más de una hora. mientras las remolachas y las cebollas pueden estar listas en poco más de una hora. Como siempre, el tiempo concreto depende del tamaño de las verduras y la potencia real del horno, así que lo mejor es vigilarlo de vez en cuando mientras hacemos otras cosas.",
                "Mientras, cortar dos pepinos, cuatro zanahorias y un pimiento en palitos. Estas crudités en un tarro o bolsa de silicona bien cerrada aguantarán bien tres días en la nevera: en ese momento habrá que repetir el proceso con el resto para acompañar el hummus de aguacate el resto de la semana.",
                "Poner en el vaso de la batidora 600 gramos de garbanzos cocidos, dos aguacates pequeños, cuatro cucharadas de tahini -o al gusto-, un diente de ajo, el zumo de un limón, un poco de sal y cuatro cucharadas de agua helada (como el aguacate es bastante graso, no es necesario añadir aceite, pero si queréis ponerle un poco, adelante). Triturar hasta conseguir una pasta fina: el hummus con aguacate ya está listo.",
                "En una olla con un chorrito de aceite, dorar cinco cebollas picadas con un poco de sal. Cuando esté dorada, retirar 4/5 partes de la cebolla y añadir los shiitakes limpios, sin la base y picados gruesos. Dorarlos durante unos cuatro minutos, añadir 1,2 l de caldo de pollo o verdura y una de las mitades de calabaza cortada en daditos o troceada. Darle un hervor, dejar enfriar y refrigerar: en el momento de comerla, llevar a ebullición, añadir los 100 g de fideos de cabello de ángel y cocinarlos el tiempo que indique el fabricante. Dos minutos antes de terminar la cocción, añadir cuatro huevos cascados, con cuidado para que la yema no se rompa. La sopa de shiitake y calabaza asada con fideos y huevo ya está lista.",
                "Poner el brócoli cortado en arbolitos no muy grandes y medio vaso de agua en una olla con una tapa que encaje. Tapar, subir el fuego a medio-alto y esperar dos minutos hasta que el agua se evapore. Destapar, remover y repetir la operación dos veces más. Añadir ¼ de la cebolla reservada, dos patatas troceadas, la leche evaporada, sal y pimienta y dar un hervor, con la olla destapada. Dar unas vueltas, pasar a una bandeja, cubrir con los 80 g de queso azul y los 40 de avellanas picadas y gratinar hasta que se dore bien (también puede dejarse preparado y gratinarse en el momento de comerlo). El brócoli gratinado con patata, leche evaporada y queso azul con avellanas ya está listo.",
                "Cocinar el arroz integral según instrucciones del fabricante, escurrirlo y separarlo en dos mitades. Reservar una para la ensalada de tomate y mango con arroz integral, langostinos y vinagreta de miel: solo quedará trocear los tomates y el mango la noche antes, mezclarlo con los langostinos cocidos y aliñar justo antes de comerlo. Mezclar la otra mitad con ¼ calabaza asada cortada en dados o troceada y 1/3 de la cebolla dorada restante: en el momento de comerlo, saltear antes las espinacas y las salchichas con un poco de aceite, añadir la mezcla de arroz y saltear todo el conjunto un par de minutos: ahí va el arroz integral salteado con calabaza asada, espinacas, cebolla y salchicha.",
                "Aliñar la calabaza restante con especias al gusto y un poco de ajo picado.",
                "Es el momento de hacer las judías verdes, a las que habremos quitado las puntas y cortado en trozos medianos. Hervirlas en agua bastante salada durante tres minutos, cortando la cocción con agua helada y saltearlas con ajo y perejil.",
                "Picar tres dientes de ajo, dorarlos en una sartén con un poco de aceite, añadir las judías y darles vueltas durante unos cinco minutos. Añadir el perejil, rectificar de sal y pimienta y ya estarán listas las judías salteadas.",
                "Para hacer el pollo con peras y manzanas seguir esta receta, añadiendo la mitad de la cebolla dorada que ya tenemos reservada en el paso 3: estará listo en menos de 10 minutos.",
                "Para el pavo en salsa de almendras, triturar muy bien la cebolla que nos queda con 250 ml leche evaporada, 80 gramos de almendras tostadas, sal y pimienta al gusto. Guisar en esta salsa a la pechuga de pavo cortada en daditos a fuego muy lento durante unos 15 minutos desde que arranque el hervor -muy suave-, o hasta que esté tierna. Espolvorear el pavo con salsa rápida de almendras con un poco de perejil fresco picado y ya estará listo.",
                "Es el momento de preparar la vinagreta y la salsa de yogur. Para la vinagreta de albahaca poner en un tarro 180 ml de aceite de oliva virgen extra, vinagre al gusto, sal, pimienta y una cucharadita generosa de albahaca seca. Podemos aliñar los tomates antes, para la ensalada pelar el melocotón y cortarlo en trozos no muy grandes, mezclar con el resto de ingredientes, aliñar bien y romper la burrata. Para la salsa de yogur y limón, rallar la piel de dos limones y mezclarla con dos yogures naturales cremosos, 60 ml de aceite, sal y pimienta (aguanta bien tres días en un tarro cerrado en la nevera). Antes de usarla, añadirle un buen chorro de zumo de limón y mezclar bien para que emulsione.",
              ]}
            />
            <Text text="¡Todo listo!" category="h6" style={TITLE} />
            <Text style={CONGRATULATIONS}>
              ¡Felicidades, has acabado de cocinar! Ahora deja que se enfríe y guardalo todo a buen
              recaudo.
            </Text>
            <Text>Guardar en la nevera:</Text>
            <View style={MEAL_LIST}>
              {["Choco", "Ensalada", "Tabla de cortar", "Ingredientes accesibles"].map(meal => {
                return <BulletItem key={meal} text={meal}></BulletItem>
              })}
            </View>
            <Text>Guardar en la congelador:</Text>
            <View style={MEAL_LIST}>
              {["Potaje de lentejas", "Salmón marinera", "Pollo japonés"].map(meal => {
                return <BulletItem key={meal} text={meal}></BulletItem>
              })}
            </View>
            <Button status="success" style={END_BUTTON}>
              He terminado de cocinar
            </Button>
          </Wrapper>
        </Screen>
      </>
    )
  },
)
