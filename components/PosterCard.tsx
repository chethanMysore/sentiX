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
import { View } from "./Themed-Paper";

export const PosterCard = (props: any) => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();

  return (
    <View style={styles.posterCardContainer}>
      <Surface elevation={4}>
        <Card style={styles.dataCard}>
          <Card.Content>
            <Image
              source={{ uri: `data:image/jpeg;base64,${props.src}` }}
              // style={
              //   isLargeScreen
              //     ? [styles.posterImage, styles.largeScreenImage]
              //     : [styles.posterImage, styles.mediumScreenImage]
              // }
              style={styles.posterImage}
            />
          </Card.Content>
        </Card>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  dataCard: {
    width: "100%",
    backgroundColor: theme.colors.darkContainer,
    textAlign: "center",
    // minHeight: "100%",
    maxHeight: "100%",
    justifyContent: "center",
    // height: "100%",
  },
  posterCardContainer: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    backgroundColor: theme.colors.secondaryContainer,
  },
  posterCardContainerSurface: {
    minHeight: "100%",
    justifyContent: "center",
  },
  largeScreenImage: {
    minWidth: "100%",
  },
  mediumScreenImage: {
    minWidth: "100%",
  },
  posterImage: {
    minWidth: "100%",
    minHeight: 300,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
