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
import { ModelChartProps } from "@/data/PropTypes";
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

const ChartViz = (props: ModelChartProps) => {
  const chartDataset = props.xCoords.map((x, i) => ({
    x: x,
    y: props.yCoords[i],
    label: props.yCoords[i].toFixed(3).toString(),
  }));
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  return (
    <VictoryChart
      animate={Platform.OS === "web"}
      containerComponent={
        Platform.OS !== "web" ? (
          <VictoryContainer style={styles.victoryChartContainer} />
        ) : (
          <VictoryZoomVoronoiContainer
            zoomDimension="x"
            style={styles.victoryChartContainer}
          />
        )
      }
      theme={VictoryTheme.clean}
      height={styles.webView.height}
      padding={
        Platform.OS === "web"
          ? { top: 5, bottom: 60, left: 60, right: 60 }
          : { top: 5, bottom: 60, left: 120, right: 80 }
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
        label={props.xLabel}
        axisLabelComponent={<VictoryLabel />}
      />
      <VictoryAxis
        dependentAxis
        label={props.yLabel}
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
      <VictoryLine
        labelComponent={
          <VictoryTooltip
            centerOffset={{ x: 5, y: -5 }}
            cornerRadius={15}
            // flyoutComponent={<Text />}
            flyoutStyle={{
              stroke: theme.colors.secondary,
              strokeWidth: 0.3,
              fill: theme.colors.plainContainer,
              opacity: 0.4,
            }}
            flyoutPadding={10}
          />
        }
        data={chartDataset}
        interpolation="basis"
        style={{
          data: {
            stroke: theme.colors.primary,
            strokeWidth: 2,
          },
        }}
      />
    </VictoryChart>
  );
};

export const DataVizVictory = (props: ModelChartProps) => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const chartDataset = props.xCoords.map((x, i) => ({
    xCoords: x.toString(),
    yCoords: props.yCoords[i],
  }));
  return (
    <View style={styles.chartCardContainer}>
      <Surface elevation={4}>
        <Card style={styles.dataCard}>
          <Card.Title
            title={props.chartLabel}
            titleVariant="titleMedium"
            style={{ alignSelf: "center" }}
            titleStyle={{ textAlign: "center" }}
          />
          <Card.Content>
            <ChartViz {...props} />
          </Card.Content>
        </Card>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  dataCard: {
    width: "100%",
    backgroundColor: theme.colors.plainContainer,
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
    backgroundColor: theme.colors.secondaryContainer,
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
    height: 300,
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

// const SampleViz = (props: ModelChartProps) => {
//   const victory = require("victory-native");
//   const skia = require("@shopify/react-native-skia");
//   const spaceFont = require("../assets/fonts/SpaceMono-Regular.ttf");
//   const { CartesianChart, Line, Area, useChartTransformState } = victory;
//   const { Text, useFont } = skia;
//   const font = useFont(spaceFont, 12);
//   const chartDataset = props.xCoords.map((x, i) => ({
//     xCoords: x,
//     yCoords: props.yCoords[i],
//   }));
//   return (
//     <View style={{ height: 300 }}>
//       <CartesianChart
//         data={chartDataset}
//         xKey="xCoords"
//         yKeys={["yCoords"]}
//         xAxis={{
//           font,
//         }}
//         yAxis={[{ yKeys: ["yCoords"], font }]}
//         padding={20}
//       >
//         {({ points, chartBounds }) => (
//           <>
//             {/* <Line
//              points={points.yCoords}
//              color={theme.colors.primary}
//              strokeWidth={3}
//             animate={{ type: "timing", duration: 300 }}
//            /> */}
//             <Area
//               points={points.yCoords}
//               y0={chartBounds.bottom}
//               color={theme.colors.primary}
//               strokeWidth={3}
//               animate={{ type: "timing", duration: 300 }}
//             />
//             <Text x={70} y={50} text={`xAxis: ${props.xLabel}`} font={font} />
//             <Text x={70} y={70} text={`yAxis: ${props.yLabel}`} font={font} />
//           </>
//         )}
//       </CartesianChart>
//     </View>
//   );
// };
