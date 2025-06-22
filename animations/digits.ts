import { Easing, withDelay, withTiming } from "react-native-reanimated"

const DURATION = 150
const TRANSLATE_Y = 40

export const DigitFadeIn =
  (delay: number = 0) =>
  () => {
    "worklet"

    const initialValues = {
      opacity: 0,
      transform: [{ translateY: TRANSLATE_Y }],
    }

    const animations = {
      opacity: withDelay(
        delay,
        withTiming(1, {
          duration: DURATION,
          easing: Easing.out(Easing.ease),
        })
      ),
      transform: [
        {
          translateY: withDelay(
            delay,
            withTiming(0, {
              duration: DURATION,
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

export const DigitFadeOut =
  (delay: number = 0) =>
  () => {
    "worklet"

    const initialValues = {
      opacity: 1,
      transform: [{ translateY: 0 }],
    }

    const animations = {
      opacity: withDelay(
        delay,
        withTiming(0, {
          duration: DURATION,
          easing: Easing.out(Easing.ease),
        })
      ),
      transform: [
        {
          translateY: withDelay(
            delay,
            withTiming(-TRANSLATE_Y, {
              duration: DURATION,
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
