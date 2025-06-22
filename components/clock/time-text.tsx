import useTimerStore from "@/stores/timer-store"
import { Text } from "react-native"

export default function TimeText() {
  const timeRemaining = useTimerStore(state => state.timeRemaining)
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining - minutes * 60

  return (
    <Text className="text-white text-7xl font-bold text-center">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </Text>
  )
}
