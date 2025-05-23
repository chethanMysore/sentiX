import React, { FormEvent } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SentixContainer,
  SentixForm,
} from "@/components/Themed-Paper";
import { StyleSheet } from "react-native";
import { loginUser } from "@/src/actions";
import { useDispatch } from "react-redux";
import { Link } from "expo-router";
import { UserProps } from "@/data/PropTypes";
import { Formik } from "formik";
import { initLoginValues, loginSchema } from "@/constants/ValidationSchemas";
import { showLoader } from "@/src/actions/notification";
import { Card } from "react-native-paper";
import { isLargeDevice, isMediumDevice } from "@/src/util";

const LoginPage = () => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
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
    <SentixContainer>
      <SentixForm
        style={
          isLargeScreen
            ? styles.largeDeviceContainer
            : isMediumScreen
            ? styles.mediumDeviceContainer
            : styles.smallDeviceContainer
        }
      >
        <Text style={styles.title}>Welcome to Sentix!</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Card.Content>
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
                  onKeyPress={() => setFieldTouched("password", true, true)}
                  onChange={() => setFieldTouched("password", true, true)}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  disabled={
                    !(
                      Object.keys(errors).length == 0 &&
                      Object.keys(touched).length ==
                        Object.keys(initLoginValues).length
                    )
                  }
                  onPress={(e) =>
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
                  }
                >
                  <Text style={{ color: "#fff" }}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </Card.Content>
        <Link href="/register" style={styles.helpLink}>
          <Text style={styles.helpLinkText} isLink>
            New to SentiX? Register Now!
          </Text>
        </Link>
      </SentixForm>
    </SentixContainer>
  );
};

const styles = StyleSheet.create({
  largeDeviceContainer: {
    margin: "35%",
    minHeight: "50%",
  },
  mediumDeviceContainer: {
    margin: "25%",
    minHeight: "50%",
  },
  smallDeviceContainer: {
    margin: "10%",
    maxHeight: "50%",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 15,
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
    padding: 12,
    borderRadius: 4,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
});

export default LoginPage;
