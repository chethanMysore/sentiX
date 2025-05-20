import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserRoles } from "@/constants/DefaultValues";
import { Drawer } from "expo-router/drawer";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { AppStateProps, ModelStateProps } from "@/data/PropTypes";

const AppLayout = () => {
  const authState = useSelector((state: AppStateProps) => state.auth);
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Dashboard",
            drawerLabel: "Dashboard",
            drawerIcon: ({ size, color }) => (
              <FontAwesome name="dashboard" color={color} size={size} />
            ),
            headerRight: () => (
              <Link href="/logout" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="sign-out"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
          redirect={authState?.isAuthenticated === false}
        />
        <Drawer.Screen
          name="profile"
          options={{
            headerTitle: "My Profile",
            drawerLabel: "Profile",
            drawerIcon: ({ size, color }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
          redirect={authState?.isAuthenticated === false}
        />
        <Drawer.Screen
          name="admin"
          options={{
            headerTitle: "Admin Dashboard",
            drawerLabel: "Admin",
            drawerIcon: ({ size, color }) => (
              <FontAwesome name="cog" color={color} size={size} />
            ),
          }}
          redirect={authState?.role !== UserRoles.ADMIN}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
