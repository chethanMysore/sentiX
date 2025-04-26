import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "@/src/store";
import { useColorScheme } from "@/components/useColorScheme";
import { AppStateProps } from "@/data/PropTypes";
import { Loader } from "@/components/Loader";

const StackLayout = () => {
  const authState = useSelector((state: AppStateProps) => state.auth);
  const notificationState = useSelector(
    (state: AppStateProps) => state.notification
  );
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "register";

    if (!!authState && !!authState.isAuthenticated) {
      router.replace("/(protected)");
    } else if (inAuthGroup) {
      router.replace("/register");
    } else {
      router.replace("/login");
    }
  }, [authState]);

  return notificationState.showLoader ? (
    <Loader />
  ) : (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <StackLayout />
    </Provider>
  );
};

export default RootLayoutNav;
