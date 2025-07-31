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
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ModelChartProps } from "@/data/PropTypes";

export const DataVizRecharts = (props: ModelChartProps) => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const chartDataset = props.xCoords.map((x, i) => ({
    xCoords: x,
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
          />
          <Card.Content>
            <ResponsiveContainer
              width="100%"
              height={Dimensions.get("screen").height * 0.35}
              style={styles.chartPoster}
            >
              <LineChart
                data={chartDataset}
                // width={
                //   isLargeScreen
                //     ? styles.largeScreenChart.width
                //     : styles.mediumScreenChart.width
                // }
                // style={styles.chartPoster}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke={theme.colors.tertiary}
                />
                <Line
                  type="monotone"
                  dataKey="yCoords"
                  stroke={theme.colors.primary}
                  dot={{ stroke: theme.colors.primary, strokeWidth: 2 }}
                />
                <XAxis
                  dataKey="xCoords"
                  label={{
                    value: props.xLabel,
                    position: "left",
                    // offset: -5,
                  }}
                />
                <YAxis
                  dataKey="yCoords"
                  label={{
                    value: props.yLabel,
                    position: "insideBottomLeft",
                    angle: -90,
                  }}
                />
                <Tooltip />
                {/* <Legend /> */}
              </LineChart>
            </ResponsiveContainer>
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
    minHeight: "100%",
    justifyContent: "center",
    height: "100%",
  },
  chartCardContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
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
});
