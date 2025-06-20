import AnimatedButton from "../animated-button/animated-button"
import useTimerStore from "@/stores/timer-store"
import {
  Canvas,
  Circle,
  Mask,
  Path,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia"
import { StyleSheet, Text, View } from "react-native"
import colors from "tailwindcss/colors"

const DURATION = 10
const SIZE = 300
const rotation = "counterclockwise"

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

type CountdownCircleTimerProps = {
  size: number
  duration: number
  elapsedTime: number
}

const PATH_COLOR = colors.gray[200]
const STROKE_WIDTH = 12

export default function Clock() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CountdownClockCircle size={SIZE} duration={DURATION} elapsedTime={0} />
      <TimerControls />
    </View>
  )
}

function CountdownClockCircle({
  size,
  duration,
  elapsedTime,
}: CountdownCircleTimerProps) {
  const { path, strokeDashoffset, pathLength } = useTimerPath()

  // Starting to rotate from -85 degrees
  const rotationAngle =
    (-85 * Math.PI) / 180 + (elapsedTime / duration) * 2 * Math.PI

  return (
    <View style={{ position: "relative" }}>
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
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <TimerTime />
      </View>
    </View>
  )
}

function TimerTime() {
  const timeRemaining = useTimerStore(state => state.timeRemaining)

  return (
    <Text
      style={{
        color: "white",
        fontSize: 48,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
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
          className="bg-white px-6 py-3 rounded-full w-min"
          onPress={startTimer}
        >
          <Text className="text-gray-800 text-lg tracking-wider">
            {timerState === "idle" ? "Start" : "Resume"}
          </Text>
        </AnimatedButton>
      )}
      {timerState === "running" && (
        <AnimatedButton
          className="bg-white px-6 py-3 rounded-full w-min"
          onPress={pauseTimer}
        >
          <Text className="text-gray-800 text-lg tracking-wider">Pause</Text>
        </AnimatedButton>
      )}
      {timerState === "paused" && (
        <AnimatedButton
          className="bg-white px-6 py-3 rounded-full w-min"
          onPress={stopTimer}
        >
          <Text className="text-gray-800 text-lg tracking-wider">Reset</Text>
        </AnimatedButton>
      )}
    </View>
  )
}

function useTimerPath() {
  return { path: "", strokeDashoffset: 10, pathLength: 10 }
}
