import { Easing, withDelay, withTiming } from "react-native-reanimated"

export const FadeIn =
  ({
    scale = 0.6,
    opacity = 1,
    duration = 200,
    delay = 0,
  }: {
    scale?: number
    opacity?: number
    duration?: number
    delay?: number
  }) =>
  () => {
    "worklet"

    const initialValues = {
      opacity: 0,
      transform: [{ scale }],
    }

    const animations = {
      opacity: withDelay(
        delay,
        withTiming(opacity, {
          duration,
          easing: Easing.out(Easing.ease),
        })
      ),
      transform: [
        {
          scale: withDelay(
            delay,
            withTiming(1, {
              duration,
              easing: Easing.out(Easing.ease),
            })
          ),
        },
      ],
    }

    return {
      initialValues,
      animations,
    }
  }

export const FadeOut =
  ({
    scale = 0.6,
    opacity = 0,
    duration = 200,
    delay = 0,
  }: {
    scale?: number
    opacity?: number
    duration?: number
    delay?: number
  } = {}) =>
  () => {
    "worklet"

    const initialValues = {
      opacity: 1,
      transform: [{ scale: 1 }],
    }

    const animations = {
      opacity: withDelay(
        delay,
        withTiming(opacity, {
          duration,
          easing: Easing.out(Easing.ease),
        })
      ),
      transform: [
        {
          scale: withDelay(
            delay,
            withTiming(scale, {
              duration,
              easing: Easing.out(Easing.ease),
            })
          ),
        },
      ],
    }

    return {
      initialValues,
      animations,
    }
  }
