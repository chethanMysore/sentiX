import {
  AppStateProps,
  ModalComponentProps,
  ModelChartProps,
  ModelProps,
} from "@/data/PropTypes";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, TouchableOpacity, View } from "./Themed-Paper";
import { FormEvent, useRef, useState } from "react";
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
import { ModelRuns } from "@/data/sample-data";
import { DataVizTableau } from "./DataVizTableau";
// import { ScrollView } from "react-native-gesture-handler";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { PosterCard } from "./PosterCard";
import { DataVizRecharts } from "./DataVizRecharts";

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
  const modelRunLogSample = ModelRuns;
  const createdDateTime = getLocaleDateTime(props.selectedModel?.createdAt!);
  const modifiedDateTime = getLocaleDateTime(props.selectedModel?.modifiedAt!);
  const ref = useRef<ICarouselInstance>(null);
  const imageProgress = useSharedValue<number>(0);
  const chartProgress = useSharedValue<number>(0);
  const onImagePaginationChange = (index: number) => {
    ref.current?.scrollTo({
      count: index - imageProgress.value,
      animated: true,
    });
  };
  const onChartPaginationChange = (index: number) => {
    ref.current?.scrollTo({
      count: index - imageProgress.value,
      animated: true,
    });
  };
  return (
    <TouchableWithoutFeedback>
      <Card style={styles.centeredView}>
        <View style={{ width: "100%", height: "100%" }}>
          <ScrollView nestedScrollEnabled={true}>
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
                      onKeyPress={() =>
                        setFieldTouched("modelName", true, true)
                      }
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
                    {/* <Text style={styles.modalText}>Model Run Details</Text>
                    {modelRunLogSample.map((run) => (
                      <View style={styles.runDetailsContainer} key={run.runID}>
                        <Text style={styles.modalText}>{run.runID}</Text>
                        <Text style={styles.modalText}>{run.nickName}</Text>
                        <Text style={styles.modalText}>{run.execStatus}</Text>
                        <Text style={styles.modalText}>
                          {run.execDuration != 0 ? run.execDuration / 1000 : 0}{" "}
                          .s
                        </Text>
                        {run.outputCharts && run.outputCharts.length > 0 && (
                          <View style={styles.posterCarouselView}>
                            <Carousel
                              ref={ref}
                              width={styles.posterCarousel.width}
                              height={styles.posterCarousel.height}
                              data={run.outputCharts}
                              onProgressChange={chartProgress}
                              renderItem={({ index }) => {
                                const chartDataStr = atob(
                                  run.outputCharts![index]
                                );
                                const chartData: ModelChartProps =
                                  JSON.parse(chartDataStr);
                                return <DataVizRecharts {...chartData} />;
                              }}
                            />
                            <Pagination.Basic
                              progress={chartProgress}
                              data={run.outputCharts}
                              dotStyle={{
                                backgroundColor: "rgba(0,0,0,0.2)",
                                borderRadius: 50,
                              }}
                              containerStyle={{ gap: 5, marginTop: 10 }}
                              onPress={onChartPaginationChange}
                            />
                          </View>
                        )}
                        {run.outputImages && run.outputImages.length > 0 && (
                          <View style={styles.posterCarouselView}>
                            <Carousel
                              ref={ref}
                              width={styles.posterCarousel.width}
                              height={styles.posterCarousel.height}
                              data={run.outputImages}
                              onProgressChange={imageProgress}
                              renderItem={({ index }) => (
                                <PosterCard src={run.outputImages![index]} />
                              )}
                            />
                            <Pagination.Basic
                              progress={imageProgress}
                              data={run.outputImages}
                              dotStyle={{
                                backgroundColor: "rgba(0,0,0,0.2)",
                                borderRadius: 50,
                              }}
                              containerStyle={{ gap: 5, marginTop: 10 }}
                              onPress={onImagePaginationChange}
                            />
                          </View>
                        )}
                      </View>
                    ))} */}

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
            <DataVizTableau />
          </ScrollView>
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
    flexGrow: 1,
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
    height: "20%",
  },
  runDetailsContainer: {
    backgroundColor: theme.colors.secondaryContainer,
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
  posterCarouselView: {
    flex: 1,
    alignItems: "center",
  },
  posterCarousel: {
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.5,
  },
});
