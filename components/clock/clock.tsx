import { useEffect } from "react"
import ClockControls from "./clock-controls"
import TimeText from "./time-text"
import { getPathProps } from "./utils"
import useTimerStore from "@/stores/timer-store"
import { Canvas, Path } from "@shopify/react-native-skia"
import { View } from "react-native"
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import colors from "tailwindcss/colors"

const PATH_COLOR = colors.gray[200]
const STROKE_WIDTH = 12
const SIZE = 300
const ROTATION = "counterclockwise"

export default function Clock() {
  return (
    <View className="flex justify-center items-center gap-8">
      <CountdownClockCircle size={SIZE} />
      <ClockControls />
    </View>
  )
}

function CountdownClockCircle({ size }: { size: number }) {
  const duration = useTimerStore(state => state.totalTime)
  const timeRemaining = useTimerStore(state => state.timeRemaining)
  const elapsedTime = duration - timeRemaining

  const { path } = getPathProps(size, STROKE_WIDTH, ROTATION)

  const progress = useSharedValue(elapsedTime / duration)

  const animatedPathEnd = useDerivedValue(() => {
    return 1 - progress.value
  })

  useEffect(() => {
    progress.value = withTiming(elapsedTime / duration, {
      duration: elapsedTime === 0 ? 300 : 1000,
      easing: Easing.linear,
    })
  }, [elapsedTime, duration, progress])

  return (
    <View className="relative">
      <Canvas
        style={{
          position: "relative",
          width: size,
          height: size,
        }}
      >
        <Path
          path={path}
          color={PATH_COLOR}
          strokeWidth={STROKE_WIDTH}
          style="stroke"
        />

        <Path
          path={path}
          strokeCap="round"
          strokeWidth={STROKE_WIDTH}
          start={0}
          end={animatedPathEnd}
          style="stroke"
          color="#FF4747"
        />
      </Canvas>

      <View className="absolute inset-0 justify-center items-center">
        <TimeText />
      </View>
    </View>
  )
}
