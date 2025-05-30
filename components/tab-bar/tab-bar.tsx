import { cn } from "@/utils/utils";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { List, Timer } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

const ROUTES = [
  {
    name: "Timer",
    Icon: Timer,
    path: "index",
  },
  {
    name: "Goals",
    Icon: List,
    path: "plan",
  },
];

export function TabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row bg-orange-500 border-t overflow-hidden border-gray-200 h-16 bottom-10 w-36 rounded-full mx-auto">
      {ROUTES.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.path}
            onPress={() => navigation.navigate(route.path)}
            className={cn("flex-1 items-center justify-center")}
          >
            <route.Icon color={isFocused ? "#2563eb" : "#4b5563"} />
            <Text className={isFocused ? "text-blue-600" : "text-gray-600"}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
