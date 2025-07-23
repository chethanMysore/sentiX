import { theme } from "@/constants/AppTheme";
import { isLargeDevice, isMediumDevice } from "@/src/util";
import WebView from "react-native-webview";
import { Dimensions, Platform, StyleSheet } from "react-native";
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
        // height="100%"
        width="100%"
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

export const DataVizTableau = () => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const src =
    "https://public.tableau.com/views/DS6_17530937979340/OverviewDashboard?:embed=y&:tooltip=n&:toolbar=n&:showVizHome=no&:mobile=y&:showAppBanner=n";

  return (
    <Surface elevation={4}>
      <Card style={styles.dataCard}>
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
          {Platform.OS === "web" ? (
            <WebViz src={src} />
          ) : (
            <NativeViz src={src} />
          )}
        </Card.Content>
      </Card>
    </Surface>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
  dataCard: {
    width: "100%",
    backgroundColor: theme.colors.plainContainer,
    textAlign: "center",
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
  dataCell: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.secondaryContainer,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    paddingTop: 25,
    flex: 1,
  },
  nativeView: {
    flex: 1,
    height: 600,
    // height: Dimensions.get("window").height * 0.5,
  },
  webView: {
    flex: 1,
    // height: 600,
    width: "100%",
    // margin: "2%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: theme.colors.plainContainer,
    alignItems: "center",
  },
});
