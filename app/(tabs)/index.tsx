import Clock from "@/components/clock/clock"
import { View } from "react-native"

export default function TimerScreen() {
  // const { isPlaying, remainingTime, duration } = useTimer()

  // console.log(timer.getRemainingTime())

  // useEffect(() => {
  //   timer.start()
  // }, [])

  return (
    <View className="flex-1 bg-gray-700 items-center justify-center">
      <Clock />
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
