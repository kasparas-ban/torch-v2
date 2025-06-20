import { useEffect } from "react"
import { useGlobalTimer } from "@/components/clock/useTimer1"
import { View } from "react-native"

export default function TimerScreen() {
  // const { isPlaying, remainingTime, duration } = useTimer()

  const timer = useGlobalTimer()

  console.log(timer.getRemainingTime())

  useEffect(() => {
    timer.start()
  }, [])

  return (
    <View className="flex-1 bg-gray-700 items-center justify-center">
      {/* <Clock /> */}
      {/* <CountdownCircleTimer
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
        </CountdownCircleTimer> */}
    </View>
  )
}
