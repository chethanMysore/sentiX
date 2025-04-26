import { LoaderColors, LoaderProps, LoaderSize } from "@/data/PropTypes";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "./Themed";

export const Loader = (props: LoaderProps) => (
  <View style={styles.container}>
    <ActivityIndicator
      size={props.size ?? LoaderSize.LARGE}
      color={props.color ?? LoaderColors.INFO}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
