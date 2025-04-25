import React, { FormEvent } from "react";
import { View, Text, TextInput } from "@/components/Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { registerUser } from "@/src/actions";
import { useDispatch } from "react-redux";
import {
  initRegistrationValues,
  registrationSchema,
} from "@/constants/ValidationSchemas";
import { UserProps } from "@/data/PropTypes";
import { Formik } from "formik";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const handleRegistration = async (values: any) => {
    let newUser: UserProps = {
      firstName: values.firstname,
      lastName: values.lastName,
      emailID: values.emailID,
      phone: `${values.phoneCode} ${values.phone}`,
      countryCode: values.countryCode,
      username: values.username,
      password: values.password,
    };
    alert(JSON.stringify(newUser));
    dispatch(registerUser(newUser));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sentix!</Text>
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
          isValid,
        }) => (
          <>
            <TextInput
              placeholder="emailID"
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
              placeholder="firstName"
              style={styles.inputField}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
            <TextInput
              placeholder="lastName"
              style={styles.inputField}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
            <TextInput
              placeholder="phoneCode"
              style={styles.inputField}
              onChangeText={handleChange("phoneCode")}
              onBlur={handleBlur("phoneCode")}
              value={values.phoneCode}
            />
            {touched.phoneCode && errors.phoneCode && (
              <Text style={styles.errorText}>{errors.phoneCode}</Text>
            )}
            <TextInput
              placeholder="phone"
              style={styles.inputField}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
            <TextInput
              placeholder="countryCode"
              style={styles.inputField}
              onChangeText={handleChange("countryCode")}
              onBlur={handleBlur("countryCode")}
              value={values.countryCode}
            />
            {touched.countryCode && errors.countryCode && (
              <Text style={styles.errorText}>{errors.countryCode}</Text>
            )}
            <TextInput
              placeholder="countryName"
              style={styles.inputField}
              onChangeText={handleChange("countryName")}
              onBlur={handleBlur("countryName")}
              value={values.countryName}
            />
            {touched.countryName && errors.countryName && (
              <Text style={styles.errorText}>{errors.countryName}</Text>
            )}
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
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              placeholder="retypePassword"
              style={styles.inputField}
              onChangeText={handleChange("retypePassword")}
              onBlur={handleBlur("retypePassword")}
              onKeyPress={() => setFieldTouched("retypePassword", true, true)}
              value={values.retypePassword}
              secureTextEntry
            />
            {touched.retypePassword && errors.retypePassword && (
              <Text style={styles.errorText}>{errors.retypePassword}</Text>
            )}
            <TouchableOpacity
              style={
                Object.keys(errors).length == 0 &&
                Object.keys(touched).length ==
                  Object.keys(initRegistrationValues).length
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
  errorText: {
    fontSize: 10,
    color: "red",
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
  buttonDisabled: {
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "#787775",
    padding: 12,
    borderRadius: 4,
  },
});

export default RegisterPage;
