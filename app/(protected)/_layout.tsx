import React from "react";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { UserRoles } from "@/constants/DefaultValues";
import { Drawer } from "expo-router/drawer";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { AppStateProps, ModelStateProps } from "@/data/PropTypes";
import { theme } from "@/constants/AppTheme";

const LogOutLink = () => (
  <Link href="/logout" asChild>
    <Pressable>
      {({ pressed }) => (
        <AntDesign
          name="logout"
          size={25}
          // color={Colors[colorScheme ?? "light"].text}
          color={theme.colors.primary}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  </Link>
);

const AppLayout = () => {
  const authState = useSelector((state: AppStateProps) => state.auth);
  // const colorScheme = useColorScheme();
  const color = theme.colors.primary;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            headerTitle: "Dashboard",
            drawerLabel: "Dashboard",
            drawerIcon: ({ size }) => (
              <MaterialIcons name="dashboard" color={color} size={size} />
            ),
            headerRight: () => <LogOutLink />,
          }}
          redirect={authState?.isAuthenticated === false}
        />
        <Drawer.Screen
          name="profile"
          options={{
            headerTitle: "My Profile",
            drawerLabel: "Profile",
            drawerIcon: ({ size }) => (
              <AntDesign name="idcard" color={color} size={size} />
            ),
            headerRight: () => <LogOutLink />,
          }}
          redirect={authState?.isAuthenticated === false}
        />
        <Drawer.Screen
          name="runDetails"
          options={{
            headerTitle: "Run Details",
            drawerLabel: "Run Log",
            drawerIcon: ({ size }) => (
              <Octicons name="log" color={color} size={size} />
            ),
            headerRight: () => <LogOutLink />,
          }}
          redirect={authState?.isAuthenticated === false}
        />
        <Drawer.Screen
          name="admin"
          options={{
            headerTitle: "Admin Dashboard",
            drawerLabel: "Admin",
            drawerIcon: ({ size }) => (
              <MaterialIcons name="security" color={color} size={size} />
            ),
            headerRight: () => <LogOutLink />,
          }}
          redirect={authState?.role !== UserRoles.ADMIN}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
