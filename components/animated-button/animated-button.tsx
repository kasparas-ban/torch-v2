import React, { useCallback } from "react"
import { GestureResponderEvent, Pressable, PressableProps } from "react-native"
import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const DEFAULT_SCALE = 0.92
const DEFAULT_OPACITY = 0.7

type Props = AnimatedProps<PressableProps> &
  PressableProps & {
    scale?: number
    opacity?: number
  }

export default function AnimatedButton(props: Props) {
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  // Cache the scale and opacity values to avoid prop access in animations
  const targetScale = props.scale ?? DEFAULT_SCALE
  const targetOpacity = props.opacity ?? DEFAULT_OPACITY

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(targetScale, {
      duration: 100,
    })
    opacity.value = withTiming(targetOpacity, {
      duration: 100,
    })
  }, [targetScale, targetOpacity])

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, {
      duration: 100,
    })
    opacity.value = withTiming(1, {
      duration: 100,
    })
  }, [])

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      props.onPress?.(e)
    },
    [props.onPress]
  )

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  return (
    <AnimatedPressable
      {...props}
      style={[props.style, animatedStyles]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    />
  )
}
