import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs"
import { PlatformPressable } from "@react-navigation/elements"
import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={ev => {
        if (Platform.OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        } else if (Platform.OS === "android") {
          // Add a medium haptic feedback for Android.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        }
        props.onPressIn?.(ev)
      }}
    />
  )
}
