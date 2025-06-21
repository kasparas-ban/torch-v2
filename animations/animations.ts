import { Easing, withTiming } from "react-native-reanimated"

export const FadeIn =
  (scale: number = 0.6, opacity: number = 1, duration: number = 200) =>
  () => {
    "worklet"

    const initialValues = {
      opacity: 0,
      transform: [{ scale }],
    }

    const animations = {
      opacity: withTiming(opacity, {
        duration,
        easing: Easing.out(Easing.ease),
      }),
      transform: [
        {
          scale: withTiming(1, {
            duration,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    }

    return {
      initialValues,
      animations,
    }
  }

export const FadeOut =
  (scale: number = 0.6, opacity: number = 0, duration: number = 200) =>
  () => {
    "worklet"

    const initialValues = {
      opacity: 1,
      transform: [{ scale: 1 }],
    }

    const animations = {
      opacity: withTiming(opacity, {
        duration,
        easing: Easing.out(Easing.ease),
      }),
      transform: [
        {
          scale: withTiming(scale, {
            duration,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    }

    return {
      initialValues,
      animations,
    }
  }
