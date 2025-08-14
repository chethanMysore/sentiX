// import { DataVizRecharts } from "@/components/DataVizRecharts";
import { PosterCard } from "@/components/PosterCard";
import {
  Dropdown,
  SentixContainer,
  SentixForm,
  View,
} from "@/components/Themed-Paper";
import { theme } from "@/constants/AppTheme";
import {
  AppStateProps,
  AuthStateProps,
  ModelChartProps,
  ModelRunProps,
  PosterCarouselProps,
  RunSearchParams,
} from "@/data/PropTypes";
import { useLocalSearchParams } from "expo-router";
import { Children, RefObject, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { DataVizTableau } from "@/components/DataVizTableau";
import { DataVizVictory } from "@/components/DataVizVictory";
import { isLargeDevice, isMediumDevice, isSmallDevice } from "@/src/util";
import { DataTablePagination, PosterType } from "@/constants/DefaultValues";
import {
  Card,
  DataTable,
  Surface,
  TextInput,
  Text,
  Menu,
  Button,
  TouchableRipple,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRunFilters,
  fetchAllModelRuns,
  fetchAllModels,
  fetchModelRunsByModelID,
  setSelectedModelID,
  setSelectedRunID,
} from "@/src/actions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { DataVizVictory } from "@/components/DataVizVictory";
// import { DataVizGifted } from "@/components/DataVizGifted";

const PosterCarousel = (props: PosterCarouselProps) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPaginationChange = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View style={styles.posterCarouselView}>
      {!!props.outputPosters && props.outputPosters.length > 0 ? (
        <>
          <Carousel
            ref={ref}
            width={props.width}
            height={styles.posterCarousel.height}
            data={props.outputPosters}
            onProgressChange={progress}
            renderItem={({ index }) => {
              switch (props.posterType) {
                case PosterType.CHART: {
                  const chartDataStr = atob(props.outputPosters[index]);
                  const chartData: ModelChartProps = JSON.parse(chartDataStr);
                  return <DataVizVictory {...chartData} />;
                }
                default: {
                  return <PosterCard src={props.outputPosters[index]} />;
                }
              }
            }}
          />
          <Pagination.Basic
            progress={progress}
            data={props.outputPosters}
            dotStyle={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 50,
            }}
            containerStyle={{ gap: 5, marginTop: 10 }}
            onPress={onPaginationChange}
          />
        </>
      ) : (
        <Text>No Posters Yet!</Text>
      )}
    </View>
  );
};

type RunFilterMenuProps = {
  filters: {
    label: string;
    value: string | undefined;
    onSelect: (value: string) => void;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  filtered: boolean;
  onClearFilters: () => void;
  onApplyFilters: () => void;
};

const RunFilterMenu = (props: RunFilterMenuProps) => {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  return (
    <Menu
      visible={filterMenuVisible}
      onDismiss={() => setFilterMenuVisible(false)}
      anchor={
        // <Surface elevation={4} style={styles.button}>
        //   <Button onPress={() => setFilterMenuVisible(true)}>
        //     <Text>Run Filters</Text>
        //   </Button>

        // </Surface>
        <Pressable onPress={() => setFilterMenuVisible(true)}>
          {({ pressed }) => (
            <MaterialCommunityIcons
              name={props.filtered ? "filter-menu" : "filter-menu-outline"}
              size={25}
              color={theme.colors.primary}
              style={{
                marginRight: 15,
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      }
      anchorPosition="bottom"
      contentStyle={{
        padding: 0,
        marginRight: 20,
        borderRadius: 20,
      }}
    >
      <Card
        style={{
          padding: 0,
          marginTop: -10,
          borderRadius: 20,
          minHeight: "100%",
        }}
      >
        <Card.Content>
          {props.filters.map((filter) => (
            <Dropdown
              key={filter.label}
              label={filter.label}
              placeholder={`Select ${filter.label}`}
              options={filter.options}
              value={filter.value}
              onSelect={(value) => {
                filter.onSelect(value!);
              }}
            />
          ))}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => {
              setFilterMenuVisible(false), props.onClearFilters();
            }}
          >
            Clear
          </Button>
          <Button
            onPress={() => {
              setFilterMenuVisible(false), props.onApplyFilters();
            }}
          >
            Apply
          </Button>
        </Card.Actions>
      </Card>
    </Menu>
  );
};

const VizModalMenu = (props: any) => {
  const [vizMenuVisible, setVizMenuVisible] = useState(false);
  return (
    <Menu
      visible={vizMenuVisible}
      onDismiss={() => setVizMenuVisible(false)}
      anchor={
        <Pressable onPress={() => setVizMenuVisible(true)}>
          {({ pressed }) => (
            <Ionicons
              name="logo-tableau"
              size={25}
              color={theme.colors.primary}
              style={{
                marginRight: 15,
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      }
      contentStyle={{
        minWidth: "90%",
        marginLeft: -20,
        borderRadius: 20,
        padding: 0,
        // backgroundColor: "red",
      }}
    >
      {/* <Card
        style={{
          padding: 0,
          marginTop: -10,
          borderRadius: 20,
          minHeight: "100%",
        }}
      >
        <Card.Content>
          <DataVizTableau />
        </Card.Content>
      </Card> */}
      <DataVizTableau
        style={{
          padding: 0,
          // margin: 0,
          marginTop: -10,
          borderRadius: 20,
          minHeight: "100%",
          // backgroundColor: "red"
        }}
      />
    </Menu>
  );
};

export default function RunDetailsPage() {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const isSmallScreen = isSmallDevice();
  // const { runID, modelID } = useLocalSearchParams<RunSearchParams>();

  const model = useSelector((state: AppStateProps) => state.model);
  const modelRunLog = useSelector((state: AppStateProps) => state.modelRunLog);

  const [modelID, setModelID] = useState("");
  const [runID, setRunID] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (modelRunLog.modelRuns.length == 0) {
      dispatch(fetchAllModelRuns());
    }
  });

  const { modelRuns, filteredRuns, selectedRunID, selectedModelID, filtered } =
    modelRunLog;
  const runLogs =
    !!selectedModelID || !!selectedRunID ? filteredRuns : modelRuns;

  const { modelsList } = model;
  const modelIDs =
    !!modelsList && modelsList.length > 0
      ? modelsList.map((mod) => {
          return { label: mod.modelID!, value: mod.modelID! };
        })
      : [];

  const runIDs = !!selectedModelID
    ? modelRuns
        .filter((run) => run.modelID === selectedModelID)
        .map((run) => {
          return { label: run.runID, value: run.runID };
        })
    : modelRuns.map((run) => {
        return { label: run.runID, value: run.runID };
      });
  const runIDs1 =
    runLogs.length > 0
      ? runLogs.map((run) => {
          return { label: run.runID, value: run.runID };
        })
      : [];

  const onModelIDsRefresh = () => {
    // dispatch(fetchAllModels());
  };

  const onModelIDSelection = (modID: string) => {
    // dispatch(fetchModelRunsByModelID(modID));
    dispatch(setSelectedModelID(modID));
  };

  const onRunIDSelection = (rID: string) => {
    dispatch(setSelectedRunID(rID));
  };

  const onApplyFilters = () => {
    if (selectedModelID !== modelID) {
      dispatch(fetchModelRunsByModelID(modelID));
      dispatch(setSelectedModelID(modelID));
    }
    if (selectedRunID !== runID) {
      dispatch(setSelectedRunID(runID));
    }
  };

  const onClearFilters = () => {
    setModelID("");
    setRunID("");
    dispatch(clearRunFilters());
  };

  const [page, setPage] = useState<number>(0);
  const numItemsPerPage =
    runLogs.length > 0
      ? [
          ...DataTablePagination.numItemsPerPage.filter(
            (num) => num < runLogs.length
          ),
          runLogs.length,
        ]
      : DataTablePagination.numItemsPerPage;
  const [itemsPerPage, onItemsPerPageChange] = useState(numItemsPerPage[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, runLogs.length);
  const runFilters: RunFilterMenuProps = {
    filters: [
      {
        label: "Model ID",
        value: modelID,
        onSelect: setModelID,
        options: modelIDs,
      },
      {
        label: "Run ID",
        value: runID,
        onSelect: setRunID,
        options: runIDs,
      },
    ],
    filtered: !!modelID || !!runID,
    onClearFilters,
    onApplyFilters,
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <SentixContainer>
        <DataTable>
          <>
            <DataTable.Header>
              <RunFilterMenu {...runFilters} />
              <VizModalMenu />
            </DataTable.Header>
            {itemsPerPage > 2 && (
              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(runLogs.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${runLogs.length}`}
                numberOfItemsPerPageList={numItemsPerPage}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={"Rows per page"}
              />
            )}
            {runLogs.length > 0 ? (
              runLogs.slice(from, to).map((run) => (
                <Surface elevation={4} key={run.runID}>
                  <Card style={styles.dataCard}>
                    <Card.Title
                      title={run.nickName}
                      titleVariant="titleLarge"
                    />
                    <Card.Content
                      style={
                        isLargeScreen
                          ? [styles.largeScreenData, styles.dataCardContent]
                          : [styles.mediumScreenData, styles.dataCardContent]
                      }
                    >
                      {isSmallScreen || Platform.OS !== "web" ? (
                        <>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Model ID</Text>
                                }
                                value={run.modelID}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                          </DataTable.Row>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Run ID</Text>
                                }
                                value={run.runID}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                          </DataTable.Row>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Status</Text>
                                }
                                value={run.execStatus}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                          </DataTable.Row>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Duration</Text>
                                }
                                value={`${
                                  run.execDuration != 0
                                    ? run.execDuration / 1000
                                    : 0
                                } s`}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                          </DataTable.Row>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <Text style={styles.textStyle}>
                                Output Charts
                              </Text>
                              <PosterCarousel
                                width={
                                  isLargeScreen
                                    ? styles.largeScreenPoster.width
                                    : isMediumScreen
                                    ? styles.mediumScreenPoster.width
                                    : styles.smallScreenPoster.width
                                }
                                outputPosters={run.outputCharts!}
                                posterType={PosterType.CHART}
                              />
                            </Surface>
                          </DataTable.Row>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <Text style={styles.textStyle}>
                                Output Images
                              </Text>
                              <PosterCarousel
                                width={
                                  isLargeScreen
                                    ? styles.largeScreenPoster.width
                                    : isMediumScreen
                                    ? styles.mediumScreenPoster.width
                                    : styles.smallScreenPoster.width
                                }
                                outputPosters={run.outputImages!}
                                posterType={PosterType.IMAGE}
                              />
                            </Surface>
                          </DataTable.Row>
                        </>
                      ) : (
                        <>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Model ID</Text>
                                }
                                value={run.modelID}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Run ID</Text>
                                }
                                value={run.runID}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Status</Text>
                                }
                                value={run.execStatus}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                            <Surface elevation={2} style={styles.dataCell}>
                              <TextInput
                                label={
                                  <Text style={styles.textStyle}>Duration</Text>
                                }
                                value={`${
                                  run.execDuration != 0
                                    ? run.execDuration / 1000
                                    : 0
                                } s`}
                                contentStyle={styles.dataCell}
                              />
                            </Surface>
                          </DataTable.Row>
                          <DataTable.Row>
                            <Surface elevation={2} style={styles.dataCell}>
                              <Text style={styles.textStyle}>
                                Output Charts
                              </Text>
                              <PosterCarousel
                                width={
                                  isLargeScreen
                                    ? styles.largeScreenPoster.width
                                    : isMediumScreen
                                    ? styles.mediumScreenPoster.width
                                    : styles.smallScreenPoster.width
                                }
                                outputPosters={run.outputCharts!}
                                posterType={PosterType.CHART}
                              />
                            </Surface>
                            <Surface elevation={2} style={styles.dataCell}>
                              <Text style={styles.textStyle}>
                                Output Images
                              </Text>
                              <PosterCarousel
                                width={
                                  isLargeScreen
                                    ? styles.largeScreenPoster.width
                                    : isMediumScreen
                                    ? styles.mediumScreenPoster.width
                                    : styles.smallScreenPoster.width
                                }
                                outputPosters={run.outputImages!}
                                posterType={PosterType.IMAGE}
                              />
                            </Surface>
                          </DataTable.Row>
                        </>
                      )}
                    </Card.Content>
                  </Card>
                </Surface>
              ))
            ) : (
              <Text style={styles.textStyle}>No Runs Found!</Text>
            )}
            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(runLogs.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${runLogs.length}`}
              numberOfItemsPerPageList={numItemsPerPage}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            ></DataTable.Pagination>
          </>
        </DataTable>
      </SentixContainer>
    </ScrollView>
    // <ScrollView nestedScrollEnabled={true}>
    //   <SentixContainer>
    //     {!!modelRun ? (
    //       <SentixForm>
    //         <Text style={styles.modalText}>{runID}</Text>
    //         <Text style={styles.modalText}>{modelRun.nickName}</Text>
    //         <Text style={styles.modalText}>{modelRun.execStatus}</Text>
    //         <Text style={styles.modalText}>
    //           {modelRun.execDuration != 0 ? modelRun.execDuration / 1000 : 0} .s
    //         </Text>
    //         {modelRun.outputCharts && modelRun.outputCharts.length > 0 && (
    //           <View style={styles.posterCarouselView}>
    //             <Carousel
    //               ref={ref}
    //               width={
    //                 isLargeScreen
    //                   ? styles.largeScreenPoster.width
    //                   : styles.mediumScreenPoster.width
    //               }
    //               height={styles.posterCarousel.height}
    //               data={modelRun.outputCharts}
    //               onProgressChange={chartProgress}
    //               renderItem={({ index }) => {
    //                 const chartDataStr = atob(modelRun.outputCharts![index]);
    //                 const chartData: ModelChartProps = JSON.parse(chartDataStr);
    //                 return <DataVizVictory {...chartData} />;
    //               }}
    //             />
    //             <Pagination.Basic
    //               progress={chartProgress}
    //               data={modelRun.outputCharts}
    //               dotStyle={{
    //                 backgroundColor: "rgba(0,0,0,0.2)",
    //                 borderRadius: 50,
    //               }}
    //               containerStyle={{ gap: 5, marginTop: 10 }}
    //               onPress={onChartPaginationChange}
    //             />
    //           </View>
    //         )}
    //         {modelRun.outputImages && modelRun.outputImages.length > 0 && (
    //           <View style={styles.posterCarouselView}>
    //             <Carousel
    //               ref={ref}
    //               width={
    //                 isLargeScreen
    //                   ? styles.largeScreenPoster.width
    //                   : styles.mediumScreenPoster.width
    //               }
    //               height={styles.posterCarousel.height}
    //               data={modelRun.outputImages}
    //               onProgressChange={imageProgress}
    //               renderItem={({ index }) => (
    //                 <PosterCard src={modelRun.outputImages![index]} />
    //               )}
    //             />
    //             <Pagination.Basic
    //               progress={imageProgress}
    //               data={modelRun.outputImages}
    //               dotStyle={{
    //                 backgroundColor: "rgba(0,0,0,0.2)",
    //                 borderRadius: 50,
    //               }}
    //               containerStyle={{ gap: 5, marginTop: 10 }}
    //               onPress={onImagePaginationChange}
    //             />
    //           </View>
    //         )}

    //         <DataVizTableau />
    //       </SentixForm>
    //     ) : (
    //       <SentixForm>
    //         <Text>No runs found</Text>
    //       </SentixForm>
    //     )}
    //   </SentixContainer>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  dataCard: {
    width: "100%",
    backgroundColor: theme.colors.plainContainer,
  },
  dataCardContent: {
    flex: 1,
  },
  dataCell: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.secondaryContainer,
    textAlign: "center",
  },
  largeScreenData: {
    flexDirection: "column",
  },
  mediumScreenData: {
    flexDirection: "column",
  },
  smallScreenData: {
    flexDirection: "column",
  },
  button: {
    borderRadius: 20,
    borderColor: theme.colors.tertiary,
    borderWidth: 1,
    elevation: 2,
    borderStyle: "solid",
    boxSizing: "border-box",
  },
  textStyle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterCarouselView: {
    flex: 1,
    alignItems: "center",
    // paddingBottom: "3%",
    marginBottom: "5%",
    backgroundColor: theme.colors.secondaryContainer,
  },
  posterCarousel: {
    height: Dimensions.get("screen").height * 0.4,
  },
  largeScreenPoster: {
    width: Dimensions.get("screen").width * 0.4,
  },
  mediumScreenPoster: {
    width: Dimensions.get("screen").width * 0.4,
  },
  smallScreenPoster: {
    width: Dimensions.get("screen").width * 0.8,
  },
});
