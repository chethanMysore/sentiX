// import { DataVizRecharts } from "@/components/DataVizRecharts";
import { PosterCard } from "@/components/PosterCard";
import {
  SentixContainer,
  SentixForm,
  Text,
  View,
} from "@/components/Themed-Paper";
import { theme } from "@/constants/AppTheme";
import { ModelChartProps, ModelRunProps } from "@/data/PropTypes";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
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
import { isLargeDevice, isMediumDevice } from "@/src/util";
// import { DataVizVictory } from "@/components/DataVizVictory";
// import { DataVizGifted } from "@/components/DataVizGifted";

type SearchParams = {
  runID: string;
};

export default function RunDetailsPage() {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const { runID } = useLocalSearchParams<SearchParams>();
  // const runID = ModelRuns[0].runID;
  const modelRun = ModelRuns.find((run) => run.runID === runID);
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
    <ScrollView nestedScrollEnabled={true}>
      <SentixContainer>
        {!!modelRun ? (
          <SentixForm>
            <Text style={styles.modalText}>{runID}</Text>
            <Text style={styles.modalText}>{modelRun.nickName}</Text>
            <Text style={styles.modalText}>{modelRun.execStatus}</Text>
            <Text style={styles.modalText}>
              {modelRun.execDuration != 0 ? modelRun.execDuration / 1000 : 0} .s
            </Text>
            {modelRun.outputCharts && modelRun.outputCharts.length > 0 && (
              <View style={styles.posterCarouselView}>
                <Carousel
                  ref={ref}
                  width={
                    isLargeScreen
                      ? styles.largeScreenPoster.width
                      : styles.mediumScreenPoster.width
                  }
                  height={styles.posterCarousel.height}
                  data={modelRun.outputCharts}
                  onProgressChange={chartProgress}
                  renderItem={({ index }) => {
                    const chartDataStr = atob(modelRun.outputCharts![index]);
                    const chartData: ModelChartProps = JSON.parse(chartDataStr);
                    return <DataVizVictory {...chartData} />;
                  }}
                />
                <Pagination.Basic
                  progress={chartProgress}
                  data={modelRun.outputCharts}
                  dotStyle={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: 50,
                  }}
                  containerStyle={{ gap: 5, marginTop: 10 }}
                  onPress={onChartPaginationChange}
                />
              </View>
            )}
            {modelRun.outputImages && modelRun.outputImages.length > 0 && (
              <View style={styles.posterCarouselView}>
                <Carousel
                  ref={ref}
                  width={
                    isLargeScreen
                      ? styles.largeScreenPoster.width
                      : styles.mediumScreenPoster.width
                  }
                  height={styles.posterCarousel.height}
                  data={modelRun.outputImages}
                  onProgressChange={imageProgress}
                  renderItem={({ index }) => (
                    <PosterCard src={modelRun.outputImages![index]} />
                  )}
                />
                <Pagination.Basic
                  progress={imageProgress}
                  data={modelRun.outputImages}
                  dotStyle={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: 50,
                  }}
                  containerStyle={{ gap: 5, marginTop: 10 }}
                  onPress={onImagePaginationChange}
                />
              </View>
            )}

            <DataVizTableau />
          </SentixForm>
        ) : (
          <SentixForm>
            <Text>No runs found</Text>
          </SentixForm>
        )}
      </SentixContainer>
    </ScrollView>
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
    flexDirection: "row",
  },
  mediumScreenData: {
    flexDirection: "column",
  },
  smallScreenData: {
    flexDirection: "column",
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
    padding: "1%",
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
    // paddingBottom: "3%",
  },
  posterCarousel: {
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.5,
  },
  largeScreenPoster: {
    width: Dimensions.get("screen").width * 0.5,
  },
  mediumScreenPoster: {
    width: Dimensions.get("screen").width * 0.8,
  },
});
