import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View, TouchableOpacity } from "@/components/Themed-Paper";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/src/actions";
import { hideLoader } from "@/src/actions/notification";

export default function LogoutScreen() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(hideLoader());
    dispatch(logoutUser());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you Sure?</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    marginVertical: 15,
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
});
