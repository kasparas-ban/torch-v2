import { useCountdown } from "./useCountdown"
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

function CountdownCircleTimer({
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
        <TimerTime time={10} />
      </View>
    </View>
  )
}

function TimerTime({ time }: { time: number }) {
  return (
    <Text
      style={{
        color: "white",
        fontSize: 48,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {time}
    </Text>
  )
}

function useTimerPath() {
  return { path: "", strokeDashoffset: 10, pathLength: 10 }
}

export { CountdownCircleTimer, useCountdown }
