import AnimatedButton from "../animated-button/animated-button"
import { FadeIn, FadeOut } from "@/animations/animations"
import useTimerStore from "@/stores/timer-store"
import { Text, View } from "react-native"
import Animated, { Easing, LinearTransition } from "react-native-reanimated"

const CustomFadeIn = FadeIn(0.7)
const CustomFadeOut = FadeOut(0.7)

const LayoutAnim = LinearTransition.easing(Easing.out(Easing.ease)).duration(
  150
)

export default function ClockControls() {
  const timerState = useTimerStore(state => state.timerState)
  const startTimer = useTimerStore(state => state.startTimer)
  const pauseTimer = useTimerStore(state => state.pauseTimer)
  const stopTimer = useTimerStore(state => state.endTimer)

  return (
    <View className="flex-row gap-4">
      {timerState !== "running" && (
        <Animated.View
          layout={LayoutAnim}
          entering={CustomFadeIn}
          exiting={CustomFadeOut}
        >
          <AnimatedButton
            className="bg-white px-6 py-3 rounded-full w-[112px] items-center"
            onPress={startTimer}
          >
            <Text className="text-gray-800 text-lg tracking-wider font-[500]">
              {timerState === "idle" ? "Start" : "Continue"}
            </Text>
          </AnimatedButton>
        </Animated.View>
      )}
      {timerState === "running" && (
        <Animated.View
          layout={LayoutAnim}
          entering={CustomFadeIn}
          exiting={CustomFadeOut}
        >
          <AnimatedButton
            className="bg-white px-6 py-3 rounded-full w-[112px] items-center"
            onPress={pauseTimer}
          >
            <Text className="text-gray-800 text-lg tracking-wider font-[500]">
              Pause
            </Text>
          </AnimatedButton>
        </Animated.View>
      )}
      {timerState === "paused" && (
        <Animated.View
          layout={LayoutAnim}
          entering={CustomFadeIn}
          exiting={CustomFadeOut}
        >
          <AnimatedButton
            className="bg-white px-6 py-3 rounded-full w-[112px] items-center"
            onPress={stopTimer}
          >
            <Text className="text-gray-800 text-lg tracking-wider font-[500]">
              Stop
            </Text>
          </AnimatedButton>
        </Animated.View>
      )}
    </View>
  )
}
