import {
  AppStateProps,
  ModalComponentProps,
  ModelProps,
} from "@/data/PropTypes";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, TouchableOpacity, View } from "./Themed-Paper";
import { FormEvent, useState } from "react";
import { Formik } from "formik";
import {
  initModelUpdateValues,
  modelUpdateSchema,
} from "@/constants/ValidationSchemas";
import { showLoader } from "@/src/actions/notification";
import { updateModelDetails } from "@/src/actions/model";
import { theme } from "@/constants/AppTheme";
import { Button, Card } from "react-native-paper";
import { getLocaleDateTime } from "@/src/util/dateTimeUtil";

export const ModelDetails = (props: ModalComponentProps) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const handleModelUpdate = (values: any) => {
    let model: ModelProps = {
      modelName: values.modelName,
      modelID: values.modelID,
      createdAt: values.createdAt,
      modifiedAt: values.modifedAt,
      createdBy: values.createdBy,
    };
    dispatch(showLoader());
    dispatch(updateModelDetails(model));
  };
  const createdDateTime = getLocaleDateTime(props.selectedModel?.createdAt!);
  const modifiedDateTime = getLocaleDateTime(props.selectedModel?.modifiedAt!);
  return (
    <TouchableWithoutFeedback>
      <Card style={styles.centeredView}>
        <View style={{ width: "100%" }}>
          {showUpdateForm ? (
            <Text style={styles.title}>Update Model Details</Text>
          ) : (
            <Text style={styles.title}>Model Details</Text>
          )}
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <Card.Content style={styles.modalContent}>
            <Formik
              validationSchema={modelUpdateSchema}
              initialValues={props.selectedModel as ModelProps}
              onSubmit={(values) => handleModelUpdate(values)}
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
                  <Text style={styles.modalText}>Model ID</Text>
                  <TextInput
                    placeholder="Model ID"
                    style={styles.inputField}
                    value={values.modelID}
                    disabled
                    aria-disabled
                  />
                  <Text style={styles.modalText}>Model Name</Text>
                  <TextInput
                    placeholder="Model Name"
                    style={styles.inputField}
                    onChangeText={handleChange("modelName")}
                    onBlur={handleBlur("modelName")}
                    onKeyPress={() => setFieldTouched("modelName", true, true)}
                    value={values.modelName}
                    disabled={!showUpdateForm}
                    aria-disabled={!showUpdateForm}
                  />
                  {touched.modelName && errors.modelName && (
                    <Text style={styles.errorText}>{errors.modelName}</Text>
                  )}
                  <Text style={styles.modalText}>Model Created</Text>
                  <TextInput
                    placeholder="Model Created"
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
                  <Text style={styles.modalText}>Model Modified</Text>
                  <TextInput
                    placeholder="Model Modified"
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
                                Object.keys(initModelUpdateValues).length
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
      </Card>
    </TouchableWithoutFeedback>
  );
};

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
    padding: 35,
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
