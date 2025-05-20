import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "@/components/Themed-Paper";
import { theme } from "@/constants/AppTheme";
import {
  iniUserUpdateValues,
  userUpdateSchema,
} from "@/constants/ValidationSchemas";
import { AppStateProps, UserProps } from "@/data/PropTypes";
import { showLoader } from "@/src/actions/notification";
import { updateUserData } from "@/src/actions/user";
import { getCountryNameFromCode, getPhoneCode } from "@/src/util";
import { getLocaleDateTime } from "@/src/util/dateTimeUtil";
import { Formik } from "formik";
import { FormEvent, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const authState = useSelector((state: AppStateProps) => state.auth);
  const { authUser, role } = authState;
  const handleUserUpdate = (values: any) => {
    let user: UserProps = {
      userID: values.userID,
      firstName: values.firstName,
      lastName: values.lastName,
      emailID: values.emailID,
      phone: `${values.phoneCode}${values.phone}`,
      countryCode: values.countryCode,
    };
    dispatch(showLoader());
    dispatch(updateUserData(user));
  };
  const createdDateTime = getLocaleDateTime(authUser?.createdAt!);
  const modifiedDateTime = getLocaleDateTime(authUser?.modifiedAt!);
  return (
    <Card style={styles.centeredView}>
      {/* <ScrollView> */}
      <View style={{ width: "100%", flex: 1 }}>
        {showUpdateForm ? (
          <Text style={styles.title}>Update My Details</Text>
        ) : (
          <Text style={styles.title}>My Details</Text>
        )}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Card.Content style={styles.modalContent}>
          <Formik
            validationSchema={userUpdateSchema}
            initialValues={authUser as UserProps}
            onSubmit={(values) => handleUserUpdate(values)}
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
                  <Text style={styles.modalText}>User ID</Text>
                  <TextInput
                    placeholder="User ID"
                    style={styles.inputField}
                    value={values.userID}
                    disabled
                    aria-disabled
                  />
                  <Text style={styles.modalText}>Username</Text>
                  <TextInput
                    placeholder="Username"
                    style={styles.inputField}
                    value={values.username}
                    disabled
                    aria-disabled
                  />
                  <Text style={styles.modalText}>First Name</Text>
                  <TextInput
                    placeholder="First Name"
                    style={styles.inputField}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    //   onKeyPress={() => setFieldTouched("firstName", true, true)}
                    value={values.firstName}
                    disabled={!showUpdateForm}
                    aria-disabled={!showUpdateForm}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                  <Text style={styles.modalText}>Last Name</Text>
                  <TextInput
                    placeholder="Last Name"
                    style={styles.inputField}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    //   onKeyPress={() => setFieldTouched("lastName", true, true)}
                    value={values.lastName}
                    disabled={!showUpdateForm}
                    aria-disabled={!showUpdateForm}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                  <Text style={styles.modalText}>Email ID</Text>
                  <TextInput
                    placeholder="Email ID"
                    style={styles.inputField}
                    onChangeText={handleChange("emailID")}
                    onBlur={handleBlur("emailID")}
                    //   onKeyPress={() => setFieldTouched("emailID", true, true)}
                    value={values.emailID}
                    disabled={!showUpdateForm}
                    aria-disabled={!showUpdateForm}
                  />
                  {touched.emailID && errors.emailID && (
                    <Text style={styles.errorText}>{errors.emailID}</Text>
                  )}
                  <Text style={styles.modalText}>Phone Code</Text>
                  <TextInput
                    placeholder="Phone Code"
                    style={styles.inputField}
                    //   onChangeText={handleChange("phoneCode")}
                    //   onBlur={handleBlur("phoneCode")}
                    //   onKeyPress={() => setFieldTouched("phoneCode", true, true)}
                    value={getPhoneCode(values.phone!)}
                    //   disabled={!showUpdateForm}
                    //   aria-disabled={!showUpdateForm}
                    disabled
                    aria-disabled
                  />
                  {/* {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )} */}
                  <Text style={styles.modalText}>Phone Number</Text>
                  <TextInput
                    placeholder="Phone Number"
                    style={styles.inputField}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    //   onKeyPress={() => setFieldTouched("phone", true, true)}
                    value={values.phone}
                    disabled={!showUpdateForm}
                    aria-disabled={!showUpdateForm}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                  <Text style={styles.modalText}>Country Code</Text>
                  <TextInput
                    placeholder="Country Code"
                    style={styles.inputField}
                    onChangeText={handleChange("countryCode")}
                    onBlur={handleBlur("countryCode")}
                    //   onKeyPress={() => setFieldTouched("emailID", true, true)}
                    value={values.countryCode}
                    disabled={!showUpdateForm}
                    aria-disabled={!showUpdateForm}
                  />
                  {touched.countryCode && errors.countryCode && (
                    <Text style={styles.errorText}>{errors.countryCode}</Text>
                  )}
                  <Text style={styles.modalText}>Country Name</Text>
                  <TextInput
                    placeholder="Country Name"
                    style={styles.inputField}
                    //   onChangeText={handleChange("countryName")}
                    //   onBlur={handleBlur("countryName")}
                    //   onKeyPress={() => setFieldTouched("countryName", true, true)}
                    value={getCountryNameFromCode(values.countryCode!)}
                    //   disabled={!showUpdateForm}
                    //   aria-disabled={!showUpdateForm}
                    disabled
                    aria-disabled
                  />
                  {/* {touched.countryName && errors.countryName && (
                  <Text style={styles.errorText}>{errors.countryName}</Text>
                )} */}
                  <Text style={styles.modalText}>User Created</Text>
                  <TextInput
                    placeholder="User Created"
                    style={styles.inputField}
                    value={
                      createdDateTime.length == 2 &&
                      createdDateTime[0] !== "Invalid Date" &&
                      createdDateTime[1] !== "Invalid Date"
                        ? `On ${createdDateTime[0]} At ${createdDateTime[1]}`
                        : values.createdAt
                    }
                    aria-disabled
                    disabled
                  />
                  <Text style={styles.modalText}>User Modified</Text>
                  <TextInput
                    placeholder="User Modified"
                    style={styles.inputField}
                    value={
                      modifiedDateTime.length == 2 &&
                      modifiedDateTime[0] !== "Invalid Date" &&
                      modifiedDateTime[1] !== "Invalid Date"
                        ? `On ${modifiedDateTime[0]} At ${modifiedDateTime[1]}`
                        : values.modifiedAt
                    }
                    disabled
                    aria-disabled
                  />
                  <Text style={styles.modalText}>User Role</Text>
                  <TextInput
                    placeholder="User Role"
                    style={styles.inputField}
                    value={role as string}
                    disabled
                    aria-disabled
                  />
                </ScrollView>
                <Card.Actions style={{ alignSelf: "center" }}>
                  {showUpdateForm ? (
                    <>
                      <TouchableOpacity
                        style={styles.button}
                        buttonColor={theme.colors.secondaryContainer}
                        onPress={() => setShowUpdateForm(false)}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        disabled={
                          !(
                            Object.keys(errors).length == 0 &&
                            Object.keys(touched).length ==
                              Object.keys(iniUserUpdateValues).length
                          )
                        }
                        onPress={(e) =>
                          handleSubmit(
                            e as unknown as FormEvent<HTMLFormElement>
                          )
                        }
                      >
                        <Text style={{ color: "#fff" }}>Update</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setShowUpdateForm(true)}
                    >
                      <Text style={{ color: "#fff" }}>Update</Text>
                    </TouchableOpacity>
                  )}
                </Card.Actions>
              </>
            )}
          </Formik>
        </Card.Content>
      </View>
      {/* </ScrollView> */}
    </Card>
  );
}
const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    textAlign: "center",
    marginBottom: 15,
    maxWidth: "100%",
  },
  modalContent: {
    maxWidth: "100%",
    maxHeight: "100%",
    paddingBottom: 20,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    margin: "10%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    marginRight: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
  },
});
