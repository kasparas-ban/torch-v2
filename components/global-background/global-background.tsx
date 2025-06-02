import { ReactNode } from "react"
import { View } from "react-native"

export function GlobalBackground({ children }: { children: ReactNode }) {
  return <View className="flex-1 bg-red-500">{children}</View>
}
