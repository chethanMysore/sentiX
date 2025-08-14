import { theme } from "@/constants/AppTheme";
import { isLargeDevice, isMediumDevice } from "@/src/util";
import WebView from "react-native-webview";
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Card, Surface } from "react-native-paper";
import { View } from "./Themed-Paper";

const WebViz = (props: any) => {
  const tableau = require("@tableau/embedding-api-react");
  return (
    <View style={styles.webView}>
      <tableau.TableauViz
        src={props.src}
        toolbar="hidden"
        hideTabs
        // height={600}
        width={"100%"}
      />
    </View>
  );
};

const NativeViz = (props: any) => {
  return (
    <WebView
      source={{
        uri: props.src,
      }}
      style={styles.nativeView}
      nestedScrollEnabled
    />
  );
};

type VizTableauProps = {
  style?: StyleProp<ViewStyle>;
};

export const DataVizTableau = (props: VizTableauProps) => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const src =
    "https://public.tableau.com/views/DS6_17530937979340/OverviewDashboard?:embed=y&:tooltip=n&:toolbar=n&:showVizHome=no&:mobile=y&:showAppBanner=n";

  return (
    // <View style={styles.chartCardContainer}>
    // <Surface elevation={4} style={{ backgroundColor: "red" }}>
    <Card style={!!props.style ? props.style : styles.dataCard}>
      <Card.Title
        title="Runs Viz"
        titleVariant="titleLarge"
        titleStyle={styles.dataCardTitle}
      />
      <Card.Content
        style={
          isLargeScreen
            ? [styles.dataCardContent, styles.largeScreenData]
            : [styles.dataCardContent, styles.smallScreenData]
        }
      >
        {Platform.OS === "web" ? <WebViz src={src} /> : <NativeViz src={src} />}
      </Card.Content>
    </Card>
    // </Surface>
    // </View>
  );
};

const styles = StyleSheet.create({
  dataCard: {
    width: "100%",
    backgroundColor: theme.colors.plainContainer,
    textAlign: "center",
    maxHeight: "100%",
  },
  dataCardContent: {
    flex: 1,
    width: "100%",
  },
  dataCardTitle: {
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
  nativeView: {
    flex: 1,
    height: 600,
    // height: Dimensions.get("window").height * 0.5,
  },
  webView: {
    flex: 1,
    width: Dimensions.get("screen").width * 0.8,
    // width: "auto",
    // margin: "2%",
    marginLeft: "auto",
    // marginRight: "auto",
    backgroundColor: theme.colors.plainContainer,
    // maxHeight: "100%",
  },
});
