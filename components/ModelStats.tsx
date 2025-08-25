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
} from "victory";
import { ModelRuns } from "@/data/sample-data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModelRuns } from "@/src/actions";

const ChartViz = (props: ModelChartProps) => {
  const isLargeScreen = isLargeDevice();
  const chartDataset = props.xCoords.map((x, i) => ({
    x: x,
    y: props.yCoords[i],
    label: x,
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
    <VictoryChart
      animate={Platform.OS === "web"}
      // containerComponent={
      //   Platform.OS !== "web" ? (
      //     <VictoryContainer style={styles.victoryChartContainer} />
      //   ) : (
      //     <VictoryZoomVoronoiContainer
      //       zoomDimension="x"
      //       style={styles.victoryChartContainer}
      //     />
      //   )
      // }
      containerComponent={
        <VictoryContainer style={styles.victoryChartContainer} />
      }
      theme={VictoryTheme.clean}
      height={Platform.OS !== "web" || isLargeScreen ? 250 : 400}
      padding={
        Platform.OS === "web"
          ? { top: 20, bottom: 60, left: 60, right: 60 }
          : { top: 20, bottom: 60, left: 120, right: 80 }
      }
      domainPadding={20}
    >
      {/* <VictoryLabel
        text={props.chartLabel}
        x={225}
        y={10}
        textAnchor="middle"
      /> */}
      <VictoryAxis
        crossAxis
        label={xLabel}
        tickFormat={() => ""}
        style={{ tickLabels: { angle: 45 } }}
        // fixLabelOverlap
        // tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
      />
      <VictoryAxis
        dependentAxis
        label={yLabel}
        axisLabelComponent={
          <VictoryLabel
            verticalAnchor="middle"
            x={Platform.OS === "web" ? 10 : 60}
            // y={140}
            // transform="scale(1.0, 0.6)"
          />
        }
        style={{
          grid: {
            stroke: theme.colors.secondary,
            strokeDasharray: "10, 5",
            strokeWidth: 0.4,
          },
        }}
      />
      <VictoryBar
        // labelComponent={
        //   <VictoryTooltip
        //     centerOffset={{ x: 5, y: -5 }}
        //     cornerRadius={15}
        //     // flyoutComponent={<Text />}
        //     flyoutStyle={{
        //       stroke: theme.colors.secondary,
        //       strokeWidth: 0.3,
        //       fill: theme.colors.plainContainer,
        //       opacity: 0.4,
        //     }}
        //     flyoutPadding={10}
        //   />
        // }
        labelComponent={<VictoryLabel style={{ angle: 45 }} />}
        data={chartDataset}
        // labels={({ datum }) => datum.y}
        style={{
          data: {
            stroke: theme.colors.primary,
            fill: theme.colors.primary,
            strokeWidth: 2,
          },
        }}
      />
    </VictoryChart>
  );
};

export const ModelStats = () => {
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
  const runsByID = Object.groupBy(modelRuns, (mod) => mod.modelID);
  const runCountDataset = Object.entries(runsByID).map(
    ([modID, runs]: [string, ModelRunProps[] | undefined]) => {
      return {
        xCoords: modelState.modelsList.find((mod) => mod.modelID === modID)!
          ?.modelName,
        yCoords: !!runs ? runs.length : 0,
      };
    }
  );
  const chartDataset: ModelChartProps = {
    xCoords: runCountDataset.map((run) => run.xCoords),
    yCoords: runCountDataset.map((run) => run.yCoords),
  };
  console.log("runCounts: ", runCountDataset);
  console.log("chartDataset: ", chartDataset);

  return (
    <View style={styles.chartCardContainer}>
      <Surface elevation={4}>
        <Card style={styles.dataCard}>
          <Card.Title
            title={"Models Statistics Overview"}
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
