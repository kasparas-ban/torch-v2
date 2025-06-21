import AnimatedButton from "../animated-button/animated-button"
import { getPathProps, linearEase } from "./utils"
import useTimerStore from "@/stores/timer-store"
import {
  Canvas,
  Circle,
  Mask,
  Path,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia"
import { Text, View } from "react-native"
import colors from "tailwindcss/colors"

// const CountdownCircleTimer = (props: Props) => {
//   const { children, duration, strokeLinecap, trailColor, trailStrokeWidth } =
//     props
//   const {
//     path,
//     pathLength,
//     stroke,
//     strokeDashoffset,
//     remainingTime,
//     elapsedTime,
//     size,
//     strokeWidth,
//   } = useCountdown(props)

//   // Starting to rotate from -85 degrees
//   const rotationAngle =
//     (-85 * Math.PI) / 180 + (elapsedTime / duration) * 2 * Math.PI

//   return (
//     <View>
//       <View style={{ position: "relative" }}>
//         <Canvas style={getWrapperStyle(size) as StyleProp<ViewStyle>}>
//           <Path
//             path={path}
//             color={trailColor ?? colors.gray[200]}
//             strokeWidth={trailStrokeWidth ?? strokeWidth}
//             style="stroke"
//           />
//           {elapsedTime !== duration && (
//             <Mask
//               mask={
//                 <Path
//                   path={path}
//                   strokeCap={strokeLinecap ?? "round"}
//                   strokeWidth={strokeWidth}
//                   start={0}
//                   end={1 - strokeDashoffset / pathLength}
//                   style="stroke"
//                 />
//               }
//             >
//               <Circle
//                 cx={size / 2}
//                 cy={size / 2}
//                 r={size / 2}
//                 transform={[{ rotate: rotationAngle }]}
//                 origin={vec(size / 2, size / 2)}
//               >
//                 <SweepGradient
//                   c={vec(size / 2, size / 2)}
//                   colors={["#06b6d4", "#f59e42"]}
//                   start={270}
//                   end={360}
//                 />
//               </Circle>
//             </Mask>
//           )}
//         </Canvas>
//         {typeof children === "function" && (
//           <View
//             style={{
//               ...StyleSheet.absoluteFillObject,
//               justifyContent: "center",
//               alignItems: "center",
//               pointerEvents: "none",
//             }}
//           >
//             {children({ remainingTime, elapsedTime, color: stroke })}
//           </View>
//         )}
//       </View>

//       <View className="pt-8">
//         <ClockControls />
//       </View>
//     </View>
//   )
// }

// CountdownCircleTimer.displayName = "CountdownCircleTimer"

const PATH_COLOR = colors.gray[200]
const STROKE_WIDTH = 12
const SIZE = 300
const ROTATION = "counterclockwise"

export default function Clock() {
  return (
    <View className="flex justify-center items-center gap-8">
      <CountdownClockCircle size={SIZE} />
      <TimerControls />
    </View>
  )
}

function CountdownClockCircle({ size }: { size: number }) {
  const duration = useTimerStore(state => state.initialWorkTime)
  const elapsedTime = useTimerStore(state => state.timeRemaining)
  const { path, strokeDashoffset, pathLength } = useTimerPath({
    elapsedTime,
    duration,
  })

  console.log("PATH", path)

  // Starting to rotate from -85 degrees
  const rotationAngle =
    (-85 * Math.PI) / 180 + (elapsedTime / duration) * 2 * Math.PI

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
        {elapsedTime !== duration && (
          <Mask
            mask={
              <Path
                path={path}
                strokeCap="round"
                strokeWidth={STROKE_WIDTH}
                start={0}
                end={1 - strokeDashoffset / pathLength}
                style="stroke"
              />
            }
          >
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2}
              transform={[{ rotate: rotationAngle }]}
              origin={vec(size / 2, size / 2)}
            >
              <SweepGradient
                c={vec(size / 2, size / 2)}
                colors={["#06b6d4", "#f59e42"]}
                start={270}
                end={360}
              />
            </Circle>
          </Mask>
        )}
      </Canvas>

      <View className="absolute inset-0 justify-center items-center">
        <TimerTime />
      </View>
    </View>
  )
}

function TimerTime() {
  const timeRemaining = useTimerStore(state => state.timeRemaining)

  return (
    <Text className="text-white text-7xl font-bold text-center">
      {timeRemaining}
    </Text>
  )
}

function TimerControls() {
  const timerState = useTimerStore(state => state.timerState)
  const startTimer = useTimerStore(state => state.startTimer)
  const pauseTimer = useTimerStore(state => state.pauseTimer)
  const stopTimer = useTimerStore(state => state.endTimer)

  return (
    <View className="flex-row gap-4">
      {timerState !== "running" && (
        <AnimatedButton
          className="bg-white px-6 py-3 rounded-full w-[112px] items-center"
          onPress={startTimer}
        >
          <Text className="text-gray-800 text-lg tracking-wider font-[500]">
            {timerState === "idle" ? "Start" : "Continue"}
          </Text>
        </AnimatedButton>
      )}
      {timerState === "running" && (
        <AnimatedButton
          className="bg-white px-6 py-3 rounded-full w-[112px] items-center"
          onPress={pauseTimer}
        >
          <Text className="text-gray-800 text-lg tracking-wider font-[500]">
            Pause
          </Text>
        </AnimatedButton>
      )}
      {timerState === "paused" && (
        <AnimatedButton
          className="bg-white px-6 py-3 rounded-full w-[112px] items-center"
          onPress={stopTimer}
        >
          <Text className="text-gray-800 text-lg tracking-wider font-[500]">
            Stop
          </Text>
        </AnimatedButton>
      )}
    </View>
  )
}

type UseTimerPathProps = {
  elapsedTime: number
  duration: number
  isGrowing?: boolean
  size?: number
  maxStrokeWidth?: number
  rotation?: "clockwise" | "counterclockwise"
}

function useTimerPath({
  elapsedTime,
  duration,
  isGrowing = true,
  size = SIZE,
  maxStrokeWidth = STROKE_WIDTH,
  rotation = ROTATION,
}: UseTimerPathProps) {
  const { path, pathLength } = getPathProps(size, maxStrokeWidth, rotation)

  const strokeDashoffset = linearEase(
    elapsedTime,
    0,
    pathLength,
    duration,
    isGrowing
  )

  return { path, strokeDashoffset, pathLength }
}
