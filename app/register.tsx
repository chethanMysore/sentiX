import React, { FormEvent } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "@/components/Themed-Paper";
import { ScrollView, StyleSheet } from "react-native";
import { registerUser } from "@/src/actions";
import { useDispatch } from "react-redux";
import {
  initRegistrationValues,
  registrationSchema,
} from "@/constants/ValidationSchemas";
import { UserProps } from "@/data/PropTypes";
import { Formik } from "formik";
import { showLoader } from "@/src/actions/notification";
import { isLargeDevice, isMediumDevice } from "@/src/util";
import { Card } from "react-native-paper";
import { theme } from "@/constants/AppTheme";

const RegisterPage = () => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const dispatch = useDispatch();
  const handleRegistration = async (values: any) => {
    let newUser: UserProps = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailID: values.emailID,
      phone: `${values.phoneCode}${values.phone}`,
      countryCode: values.countryCode,
      username: values.username,
      password: values.password,
    };
    dispatch(showLoader());
    dispatch(registerUser(newUser));
  };
  return (
    <View style={styles.container}>
      <Card
        style={
          isLargeScreen
            ? [styles.centeredView, styles.largeDeviceContainer]
            : isMediumScreen
            ? [styles.centeredView, styles.mediumDeviceContainer]
            : [styles.centeredView, styles.smallDeviceContainer]
        }
      >
        <Text style={styles.title}>Welcome to Sentix!</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Card.Content style={{ maxHeight: "90%" }}>
          <Formik
            validationSchema={registrationSchema}
            initialValues={initRegistrationValues}
            onSubmit={(values) => handleRegistration(values)}
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
                <ScrollView>
                  <TextInput
                    placeholder="Email ID*"
                    style={styles.inputField}
                    onChangeText={handleChange("emailID")}
                    onBlur={handleBlur("emailID")}
                    value={values.emailID}
                    keyboardType="email-address"
                  />
                  {touched.emailID && errors.emailID && (
                    <Text style={styles.errorText}>{errors.emailID}</Text>
                  )}
                  <TextInput
                    placeholder="First Name*"
                    style={styles.inputField}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                  <TextInput
                    placeholder="Last Name*"
                    style={styles.inputField}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                  <TextInput
                    placeholder="Phone Code*"
                    style={styles.inputField}
                    onChangeText={handleChange("phoneCode")}
                    onBlur={handleBlur("phoneCode")}
                    value={values.phoneCode}
                  />
                  {touched.phoneCode && errors.phoneCode && (
                    <Text style={styles.errorText}>{errors.phoneCode}</Text>
                  )}
                  <TextInput
                    placeholder="Phone*"
                    style={styles.inputField}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                  <TextInput
                    placeholder="Country Code*"
                    style={styles.inputField}
                    onChangeText={handleChange("countryCode")}
                    onBlur={handleBlur("countryCode")}
                    value={values.countryCode}
                  />
                  {touched.countryCode && errors.countryCode && (
                    <Text style={styles.errorText}>{errors.countryCode}</Text>
                  )}
                  <TextInput
                    placeholder="Country Name*"
                    style={styles.inputField}
                    onChangeText={handleChange("countryName")}
                    onBlur={handleBlur("countryName")}
                    value={values.countryName}
                  />
                  {touched.countryName && errors.countryName && (
                    <Text style={styles.errorText}>{errors.countryName}</Text>
                  )}
                  <TextInput
                    placeholder="Username*"
                    style={styles.inputField}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                  <TextInput
                    placeholder="Password*"
                    style={styles.inputField}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <TextInput
                    placeholder="Retype Password*"
                    style={styles.inputField}
                    onChangeText={handleChange("retypePassword")}
                    onBlur={handleBlur("retypePassword")}
                    onKeyPress={() =>
                      setFieldTouched("retypePassword", true, true)
                    }
                    value={values.retypePassword}
                    secureTextEntry
                  />
                  {touched.retypePassword && errors.retypePassword && (
                    <Text style={styles.errorText}>
                      {errors.retypePassword}
                    </Text>
                  )}
                </ScrollView>
                <TouchableOpacity
                  style={styles.button}
                  onPress={(e) =>
                    handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
                  }
                  disabled={
                    !(
                      Object.keys(errors).length == 0 &&
                      Object.keys(touched).length ==
                        Object.keys(initRegistrationValues).length
                    )
                  }
                >
                  <Text style={{ color: "#fff" }}>Register</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.plainContainer,
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  largeDeviceContainer: {
    margin: "35%",
    minHeight: "80%",
  },
  mediumDeviceContainer: {
    margin: "25%",
    minHeight: "80%",
  },
  smallDeviceContainer: {
    margin: "10%",
    maxHeight: "80%",
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
  errorText: {
    fontSize: 10,
    color: "red",
  },
  separator: {
    marginVertical: 15,
    // marginBottom: 10,
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
    padding: 12,
    borderRadius: 4,
  },
});

export default RegisterPage;
