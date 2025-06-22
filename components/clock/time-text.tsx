import { DigitFadeIn, DigitFadeOut } from "@/animations/digits"
import useTimerStore from "@/stores/timer-store"
import { Text, View } from "react-native"
import Animated from "react-native-reanimated"

type SingleDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

export default function TimeText() {
  const timeRemaining = useTimerStore(state => state.timeRemaining)
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining - minutes * 60

  const minutesDigits = minutes.toString().padStart(2, "0").split("")
  const secondsDigits = seconds.toString().padStart(2, "0").split("")

  return (
    <View className="flex-row text-white text-7xl font-bold text-center">
      {minutesDigits.map((digit, index) => (
        <AnimatedDigit key={index} digit={digit as SingleDigit} />
      ))}
      <Text className="text-7xl font-bold text-white px-1">:</Text>
      {secondsDigits.map((digit, index) => (
        <AnimatedDigit key={index} digit={digit as SingleDigit} />
      ))}
    </View>
  )
}

function AnimatedDigit({ digit }: { digit: SingleDigit }) {
  return (
    <Animated.View
      key={`digit-${digit}`}
      className="relative"
      entering={DigitFadeIn(40)}
      exiting={DigitFadeOut()}
    >
      <Text className="text-white text-7xl font-bold">{digit}</Text>
    </Animated.View>
  )
}
