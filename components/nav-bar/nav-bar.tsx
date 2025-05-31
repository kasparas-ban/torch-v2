import { cn } from "@/utils/utils";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { List, Timer } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { gray, rose } from "tailwindcss/colors";

const ROUTES = [
  {
    name: "Timer",
    Icon: Timer,
    path: "index",
  },
  {
    name: "Plan",
    Icon: List,
    path: "plan",
  },
];

export function NavBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row px-[5px] border border-gray-200/40 bg-gray-200/40 border-t overflow-hidden h-16 bottom-10 w-[104px] rounded-full mx-auto">
      <View
        className={cn(
          "absolute w-12 top-2 bottom-2 bg-rose-200 rounded-full",
          state.index === 0 && "left-2",
          state.index === 1 && "right-2"
        )}
      />
      {ROUTES.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.path}
            onPress={() => navigation.navigate(route.path)}
            className="flex-1 items-center justify-center"
          >
            <route.Icon
              color={isFocused ? rose[500] : gray[600]}
              strokeWidth={2.5}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
