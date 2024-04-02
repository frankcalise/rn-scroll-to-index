import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, Pressable, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"

// data array with id and title props of 0-50, with a random height property
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  title: `Item ${i}`,
  height: Math.floor(Math.random() * 250) + 50,
}))

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const ref = React.useRef<FlatList>(null)
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    ref.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
  }, [index])

  const renderItem = React.useCallback(({ item }) => {
    return (
      <Pressable onPress={() => setIndex(item.id)}>
        <View style={[$item, { height: item.height }]}>
          <Text>{item.title}</Text>
        </View>
      </Pressable>
    )
  }, [])

  return (
    <Screen safeAreaEdges={["top", "bottom"]} style={$container}>
      <View style={$controls}>
        <Button text="Scroll to Index 10" onPress={() => setIndex(10)} />
        <Button text="Scroll to Index 20" onPress={() => setIndex(25)} />
      </View>
      <FlatList
        ref={ref}
        renderItem={renderItem}
        data={data}
        initialScrollIndex={index}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $controls: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.secondary300,
  borderWidth: 1,
  borderColor: colors.palette.neutral100,
}
