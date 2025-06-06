import React from "react"
import ClockControls from "./clock-controls"
import { Props } from "./types"
import { useCountdown } from "./useCountdown"
import { getWrapperStyle } from "./utils"
import {
  Canvas,
  Circle,
  Mask,
  Path,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia"
import type { StyleProp, ViewStyle } from "react-native"
import { View } from "react-native"
import colors from "tailwindcss/colors"

const CountdownCircleTimer = (props: Props) => {
  const { children, duration, strokeLinecap, trailColor, trailStrokeWidth } =
    props
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown(props)

  // Starting to rotate from -85 degrees
  const rotationAngle =
    (-85 * Math.PI) / 180 + (elapsedTime / duration) * 2 * Math.PI

  return (
    <View>
      <View style={{ position: "relative" }}>
        <Canvas style={getWrapperStyle(size) as StyleProp<ViewStyle>}>
          <Path
            path={path}
            color={trailColor ?? colors.gray[200]}
            strokeWidth={trailStrokeWidth ?? strokeWidth}
            style="stroke"
          />
          {elapsedTime !== duration && (
            <Mask
              mask={
                <Path
                  path={path}
                  strokeCap={strokeLinecap ?? "round"}
                  strokeWidth={strokeWidth}
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
        {typeof children === "function" && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {children({ remainingTime, elapsedTime, color: stroke })}
          </View>
        )}
      </View>

      <View className="pt-8">
        <ClockControls />
      </View>
    </View>
  )
}

CountdownCircleTimer.displayName = "CountdownCircleTimer"

export { CountdownCircleTimer, useCountdown }
