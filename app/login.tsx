import React, { useState } from "react";
import { View, Text, TextInput } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "@/src/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    console.log("Chucky inside handleLogin", { username, password });
    onLogin!(username, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sentix!</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="admin"
        value={username}
        onChangeText={setUsername}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={{ color: "#fff" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: "20%",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
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
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  button: {
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "#111233",
    padding: 12,
    borderRadius: 4,
  },
});

export default LoginPage;
