import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/src/AuthContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme";

const StackLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";
    console.log("authState, segments", { authState, segments });

    if (!!authState && !!authState.authenticated) {
      router.replace("/(protected)");
    } else {
      router.replace("/login");
    }

    // if (!authState?.authenticated && inAuthGroup) {
    //   router.push("/login");
    // } else if (!authState?.authenticated === true) {
    //   router.push("/(protected)");
    // }
  }, [authState]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
};

export default RootLayoutNav;
