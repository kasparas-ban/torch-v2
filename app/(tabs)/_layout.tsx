import { Tabs } from "expo-router";
import React from "react";

import { NavBar } from "@/components/nav-bar/nav-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 bg-green-500">
      <Tabs
        tabBar={(props) => <NavBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="index"
          options={{ sceneStyle: { backgroundColor: "transparent" } }}
        />
        <Tabs.Screen
          name="plan"
          options={{ sceneStyle: { backgroundColor: "transparent" } }}
        />
      </Tabs>
    </View>
  );
}
