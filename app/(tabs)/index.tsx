import { CountdownCircleTimer } from "@/components/clock/clock"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function TimerScreen() {
  return (
    <View className="flex-1 bg-gray-700 items-center justify-center">
      <View>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          size={300}
          colors={colors.red[500]}
          rotation="counterclockwise"
          isGrowing
        >
          {({ remainingTime }) => (
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 48,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {remainingTime}
              </Text>
            </View>
          )}
        </CountdownCircleTimer>
      </View>
    </View>
  )
}
