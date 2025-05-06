import { LoaderProps } from "@/data/PropTypes";
import { LoaderColors, LoaderSize } from "@/constants/DefaultValues";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";
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
