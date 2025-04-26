import React, { FormEvent } from "react";
import { View, Text, TextInput } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { loginUser } from "@/src/actions";
import { useDispatch } from "react-redux";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { UserProps } from "@/data/PropTypes";
import { Formik } from "formik";
import { initLoginValues, loginSchema } from "@/constants/ValidationSchemas";
import { showLoader } from "@/src/actions/notification";

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleLogin = async (values: any) => {
    let user: UserProps = {
      username: values.username,
      password: values.password,
    };
    dispatch(showLoader());
    dispatch(loginUser(user));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sentix!</Text>
      <Formik
        validationSchema={loginSchema}
        initialValues={initLoginValues}
        onSubmit={(values) => handleLogin(values)}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldTouched,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="username"
              style={styles.inputField}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
              placeholder="password"
              style={styles.inputField}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              onKeyPress={() => setFieldTouched("retypePassword", true, true)}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={
                Object.keys(errors).length == 0 &&
                Object.keys(touched).length ==
                  Object.keys(initLoginValues).length
                  ? styles.button
                  : styles.buttonDisabled
              }
              onPress={(e) =>
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
              }
              disabled={!(Object.keys(errors).length == 0)}
            >
              <Text style={{ color: "#fff" }}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
  buttonDisabled: {
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "#787775",
    padding: 12,
    borderRadius: 4,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
});

export default LoginPage;
