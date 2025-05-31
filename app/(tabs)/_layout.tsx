import { Tabs } from "expo-router";
import React from "react";

import { NavBar } from "@/components/nav-bar/nav-bar";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <NavBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
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
  );
}
