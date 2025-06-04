import { CountdownCircleTimer } from "@/components/clock/clock"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function TimerScreen() {
  return (
    <View className="flex-1 bg-blue-100 items-center justify-center">
      <View>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          size={300}
          colors={colors.red[500]}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
      </View>
    </View>
  )
}
