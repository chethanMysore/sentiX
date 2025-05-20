import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Alert } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ModelList } from "@/components/ModelList";
import { AppStateProps, ModelStateProps } from "@/data/PropTypes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModels } from "@/src/actions/model";

export default function DashboardScreen() {
  const modelState = useSelector((state: AppStateProps) => state.model);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (modelState.modelsList.length == 0) {
      dispatch(fetchAllModels());
    }
  });
  return (
    <View style={styles.container}>
      <Text>Subscribed Models</Text>

      <ModelList modelsList={modelState.modelsList} selectedModel={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
