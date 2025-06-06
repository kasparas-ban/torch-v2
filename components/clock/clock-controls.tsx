import AnimatedButton from "../animated-button/animated-button"
import { Text, View } from "react-native"

export default function ClockControls() {
  return (
    <View className="flex-row items-center justify-center">
      <AnimatedButton className="bg-white px-6 py-3 rounded-full w-min">
        <Text className="text-gray-800 text-lg tracking-wider">Start</Text>
      </AnimatedButton>
    </View>
  )
}
