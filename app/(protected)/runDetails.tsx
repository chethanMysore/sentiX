// import { DataVizRecharts } from "@/components/DataVizRecharts";
import { PosterCard } from "@/components/PosterCard";
import { SentixContainer, SentixForm, View } from "@/components/Themed-Paper";
import { theme } from "@/constants/AppTheme";
import {
  ModelChartProps,
  ModelRunProps,
  PosterCarouselProps,
  RunSearchParams,
} from "@/data/PropTypes";
import { useLocalSearchParams } from "expo-router";
import { Children, RefObject, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { ModelRuns } from "@/data/sample-data";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { DataVizTableau } from "@/components/DataVizTableau";
import { DataVizVictory } from "@/components/DataVizVictory";
import { isLargeDevice, isMediumDevice, isSmallDevice } from "@/src/util";
import { DataTablePagination, PosterType } from "@/constants/DefaultValues";
import { Card, DataTable, Surface, TextInput, Text } from "react-native-paper";
// import { DataVizVictory } from "@/components/DataVizVictory";
// import { DataVizGifted } from "@/components/DataVizGifted";

const DataRow = ({
  children,
  isSmallScreen,
}: {
  children: any;
  isSmallScreen: boolean;
}) => {
  return !isSmallScreen ? (
    <>{children}</>
  ) : (
    <DataTable.Row>{children}</DataTable.Row>
  );
};

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
      {props.outputPosters.length > 0 ? (
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

export default function RunDetailsPage() {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const isSmallScreen = isSmallDevice();
  const { runID } = useLocalSearchParams<RunSearchParams>();

  const [page, setPage] = useState<number>(0);
  const numItemsPerPage =
    ModelRuns && ModelRuns.length > 0
      ? [
          ...DataTablePagination.numItemsPerPage.filter(
            (num) => num < ModelRuns.length
          ),
          ModelRuns.length,
        ]
      : DataTablePagination.numItemsPerPage;
  const [itemsPerPage, onItemsPerPageChange] = useState(numItemsPerPage[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, ModelRuns.length);
  return (
    <ScrollView nestedScrollEnabled={true}>
      <SentixContainer>
        <DataTable>
          {!!ModelRuns && ModelRuns.length > 0 ? (
            ModelRuns.slice(from, to).map((run) => (
              <Surface elevation={4} key={run.runID}>
                <Card style={styles.dataCard}>
                  <Card.Title title={run.nickName} titleVariant="titleLarge" />
                  <Card.Content
                    style={
                      isLargeScreen
                        ? [styles.largeScreenData, styles.dataCardContent]
                        : [styles.mediumScreenData, styles.dataCardContent]
                    }
                  >
                    <DataRow isSmallScreen={isSmallScreen}>
                      <Surface elevation={2} style={styles.dataCell}>
                        <TextInput
                          label={<Text style={styles.textStyle}>Model ID</Text>}
                          value={run.modelID}
                          contentStyle={styles.dataCell}
                        />
                      </Surface>
                      <Surface elevation={2} style={styles.dataCell}>
                        <TextInput
                          label={<Text style={styles.textStyle}>Run ID</Text>}
                          value={run.runID}
                          contentStyle={styles.dataCell}
                        />
                      </Surface>
                      <Surface elevation={2} style={styles.dataCell}>
                        <TextInput
                          label={<Text style={styles.textStyle}>Status</Text>}
                          value={run.execStatus}
                          contentStyle={styles.dataCell}
                        />
                      </Surface>
                      <Surface elevation={2} style={styles.dataCell}>
                        <TextInput
                          label={<Text style={styles.textStyle}>Duration</Text>}
                          value={`${
                            run.execDuration != 0 ? run.execDuration / 1000 : 0
                          } s`}
                          contentStyle={styles.dataCell}
                        />
                      </Surface>
                    </DataRow>
                    <DataRow isSmallScreen={isSmallScreen}>
                      <Surface elevation={2} style={styles.dataCell}>
                        <Text style={styles.textStyle}>Output Charts</Text>
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
                        <Text style={styles.textStyle}>Output Images</Text>
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
                    </DataRow>
                  </Card.Content>
                </Card>
              </Surface>
            ))
          ) : (
            <Text>No Runs Found!</Text>
          )}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(ModelRuns.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${ModelRuns.length}`}
            numberOfItemsPerPageList={numItemsPerPage}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
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
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.5,
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
