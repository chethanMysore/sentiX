import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Alert } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ModelList } from "@/components/ModelList";
import { AppStateProps, ModelStateProps } from "@/data/PropTypes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModels } from "@/src/actions/model";
import { SentixContainer, SentixForm } from "@/components/Themed-Paper";
import { ScrollView } from "react-native-gesture-handler";

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
    <ScrollView>
      <SentixContainer>
        <SentixForm>
          <Text style={styles.title}>Subscribed Models</Text>

          <ModelList modelsList={modelState.modelsList} selectedModel={null} />
        </SentixForm>
      </SentixContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
