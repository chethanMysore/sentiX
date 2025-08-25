import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, Alert, ScrollView, Platform } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ModelList } from "@/components/ModelList";
import { AppStateProps, ModelStateProps } from "@/data/PropTypes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModels } from "@/src/actions/model";
import { SentixContainer, SentixForm } from "@/components/Themed-Paper";
// import { ScrollView } from "react-native-gesture-handler";
// import { DataVizTableau } from "@/components/DataVizTableau";
import { DataTable, Surface } from "react-native-paper";
import { ModelStats } from "@/components/ModelStats";
import { isLargeDevice, isSmallDevice } from "@/src/util";
import { RunStats } from "@/components/RunStats";

export default function DashboardScreen() {
  const modelState = useSelector((state: AppStateProps) => state.model);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const isSmallScreen = isSmallDevice();
  useEffect(() => {
    if (modelState.modelsList.length == 0) {
      dispatch(fetchAllModels());
    }
  });
  return (
    <ScrollView nestedScrollEnabled={true}>
      <SentixContainer>
        <SentixForm>
          <Text style={styles.title}>Subscribed Models</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />

          {isSmallScreen || Platform.OS !== "web" ? (
            <DataTable>
              <ModelList
                modelsList={modelState.modelsList}
                selectedModel={null}
              />
              <RunStats />
              <ModelStats />
            </DataTable>
          ) : (
            <DataTable>
              <DataTable.Row>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <ModelList
                    modelsList={modelState.modelsList}
                    selectedModel={null}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <RunStats />
                </View>
              </DataTable.Row>
              <DataTable.Row>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <ModelStats />
                </View>
              </DataTable.Row>
            </DataTable>
          )}

          {/* <DataVizTableau /> */}
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
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
  },
});
