import React, { useState } from "react";
import { View, Text, TextInput } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { loginUser } from "@/src/actions";
import { useDispatch } from "react-redux";
import { UserRoles } from "@/constants/DefaultValues";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // if (
    //   (password === UserRoles.ADMIN || password === UserRoles.USER) &&
    //   (username === UserRoles.USER || username === UserRoles.ADMIN)
    // ) {
    dispatch(loginUser({ username, password }));
    // } else {
    //   alert("Invalid Username or password");
    // }
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
      <Link href="/register" style={styles.helpLink}>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          New to SentiX? Register Now!
        </Text>
      </Link>
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
  helpLink: {
    paddingVertical: 15,
    textAlign: "center",
  },
  helpLinkText: {
    textAlign: "center",
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
