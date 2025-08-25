import { theme } from "@/constants/AppTheme";
import { isLargeDevice, isMediumDevice } from "@/src/util";
import WebView from "react-native-webview";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
} from "react-native";
import { Card, Surface } from "react-native-paper";
import { Text, View } from "./Themed-Paper";
import {
  AppStateProps,
  ModelChartProps,
  ModelRunProps,
} from "@/data/PropTypes";
import {
  VictoryChart,
  VictoryLine,
  VictoryLabel,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryVoronoiContainer,
  VictoryContainer,
  VictoryAxis,
  createContainer,
  VictoryTooltip,
  VictoryBar,
  Rect,
  VictoryPie,
  LineSegment,
} from "victory";
import { ModelRuns } from "@/data/sample-data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModelRuns } from "@/src/actions";
import { ModelRunExecStatusColor } from "@/constants/DefaultValues";

const ChartViz = (props: ModelChartProps) => {
  const isLargeScreen = isLargeDevice();
  const chartDataset = props.xCoords.map((x, i) => ({
    x: x,
    y: props.yCoords[i],
    // label: x,
    fill: !!x ? ModelRunExecStatusColor[x] : "#FFF",
  }));
  const xLabel = "Quarter";
  const yLabel = "Units";
  // const chartDataset = [
  //   { x: "2023 Q1", y: 1, label: "2023 Q1" },
  //   { x: "2023 Q2", y: 2, label: "2023 Q2" },
  //   { x: "2023 Q3", y: 3, label: "2023 Q3" },
  //   { x: "2023 Q4", y: 2, label: "2023 Q4" },
  // ];
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  return (
    <VictoryPie
      // innerRadius={Platform.OS !== "web" || isLargeScreen ? 30 : 80}
      // innerRadius={({ datum }) => datum.y * 5}
      // innerRadius={30}
      labels={({ datum }) => datum.x}
      cornerRadius={({ datum }) => datum.y * 5}
      radius={({ datum }) => 20 + datum.y * 15}
      labelRadius={({ datum }) => datum.y * 10 + 60}
      padAngle={({ datum }) => datum.y}
      labelPosition={"centroid"}
      // labelIndicatorComponent={<LineSegment />}
      // labelIndicator
      // labelIndicator={
      //   <LineSegment
      //     style={{
      //       stroke: "red",
      //       strokeDasharray: 1,
      //       fill: "blue",
      //     }}
      //   />
      // }
      // labelIndicatorInnerOffset={360}
      // labelIndicatorOuterOffset={20}
      // labelRadius={65}
      startAngle={0}
      endAngle={360}
      // labelPosition={"startAngle"}
      data={chartDataset}
      theme={VictoryTheme.material}
      colorScale={chartDataset.map((data) => data.fill)}
      height={200}
      padding={
        Platform.OS === "web"
          ? { top: 30, bottom: 60, left: 60, right: 60 }
          : { top: 30, bottom: 60, left: 120, right: 80 }
      }
    />
  );
};

export const RunStats = () => {
  const modelRunState = useSelector(
    (state: AppStateProps) => state.modelRunLog
  );
  const modelState = useSelector((state: AppStateProps) => state.model);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!!modelRunState.modelRuns && modelRunState.modelRuns.length == 0) {
      dispatch(fetchAllModelRuns());
    }
  });

  const { modelRuns } = modelRunState;
  const runsByStatus = Object.groupBy(modelRuns, (run) => run.execStatus);
  const runCountDataset = Object.entries(runsByStatus).map(
    ([status, runs]: [string, ModelRunProps[] | undefined]) => {
      return {
        xCoords: status,
        yCoords: !!runs ? runs.length : 0,
      };
    }
  );
  const chartDataset: ModelChartProps = {
    xCoords: runCountDataset.map((run) => run.xCoords),
    yCoords: runCountDataset.map((run) => run.yCoords),
  };

  return (
    <View style={styles.chartCardContainer}>
      <Surface elevation={4}>
        <Card style={styles.dataCard}>
          <Card.Title
            title={"Runs Status Overview"}
            titleVariant="titleMedium"
            style={{ alignSelf: "center" }}
            titleStyle={{ textAlign: "center" }}
          />
          <Card.Content>
            <ChartViz {...chartDataset} />
          </Card.Content>
        </Card>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  dataCard: {
    width: "100%",
    backgroundColor: theme.colors.secondaryContainer,
    textAlign: "center",
    // minHeight: "100%",
    maxHeight: "100%",
    justifyContent: "center",
    // height: "100%",
  },
  chartCardContainer: {
    flex: 1,
    justifyContent: "center",
    maxHeight: "100%",
    width: "100%",
    backgroundColor: theme.colors.plainContainer,
    padding: "3%",
  },
  chartContainerSurface: {
    minHeight: "100%",
    justifyContent: "center",
  },
  largeScreenChart: {
    width: Dimensions.get("screen").width * 0.4,
  },
  mediumScreenChart: {
    width: Dimensions.get("screen").width * 0.4,
  },
  chartPoster: {
    margin: "1%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  webView: {
    height: 400,
  },
  chartTooltip: {
    opacity: 30,
  },
  victoryChartContainer: {
    alignSelf: "center",
    // marginTop: "1%",
    height: "100%",
  },
});
