import React, { useState } from "react";
import { ModelProps, ModelStateProps } from "@/data/PropTypes";
import {
  Card,
  Text,
  Button,
  Portal,
  Modal,
  DataTable,
  Surface,
  TextInput,
} from "react-native-paper";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ModelDetails } from "./ModelDetails";
import { View } from "./Themed-Paper";
import { getLocaleDateTime } from "@/src/util/dateTimeUtil";
import { DataTablePagination } from "@/constants/DefaultValues";
import { isLargeDevice, isMediumDevice } from "@/src/util";
import { theme } from "@/constants/AppTheme";

export const ModelList = (props: ModelStateProps) => {
  const isLargeScreen = isLargeDevice();
  const isMediumScreen = isMediumDevice();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelProps>({});
  const handleShowDetails = (model: ModelProps) => {
    setSelectedModel(model);
    setModalVisible(true);
  };
  const [page, setPage] = React.useState<number>(0);
  const numItemsPerPage =
    props.modelsList && props.modelsList.length > 0
      ? [
          ...DataTablePagination.numItemsPerPage.filter(
            (num) => num < props.modelsList.length
          ),
          props.modelsList.length,
        ]
      : DataTablePagination.numItemsPerPage;
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numItemsPerPage[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, props.modelsList.length);
  return !!props.modelsList && props.modelsList.length > 0 ? (
    <>
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
            style={{ cursor: "auto" }}
          >
            <ModelDetails
              selectedModel={selectedModel}
              setModalVisible={setModalVisible}
            />
          </TouchableOpacity>
        </Modal>
      </Portal>
      <DataTable>
        {props.modelsList.slice(from, to).map((item) => (
          // <DataTable.Row key={item.modelID}>
          <Surface elevation={4} key={item.modelID}>
            <Card style={styles.dataCard}>
              <Card.Title title={item.modelName} titleVariant="titleLarge" />
              <Card.Content
                style={
                  isLargeScreen
                    ? [styles.dataCardContent, styles.largeScreenData]
                    : [styles.dataCardContent, styles.smallScreenData]
                }
              >
                <Surface style={styles.dataCell} elevation={2}>
                  <TextInput
                    label={<Text style={styles.textStyle}>Model ID</Text>}
                    value={item.modelID}
                    contentStyle={[styles.dataCell]}
                  />
                </Surface>
                <Surface style={styles.dataCell} elevation={2}>
                  <TextInput
                    label={<Text style={styles.textStyle}>Created</Text>}
                    value={`On ${getLocaleDateTime(item.createdAt!)[0]} At ${
                      getLocaleDateTime(item.createdAt!)[1]
                    }`}
                    contentStyle={styles.dataCell}
                  />
                </Surface>
                <Surface style={styles.dataCell} elevation={2}>
                  <TextInput
                    label={<Text style={styles.textStyle}>Modified</Text>}
                    value={`On ${getLocaleDateTime(item.modifiedAt!)[0]} At ${
                      getLocaleDateTime(item.modifiedAt!)[1]
                    }`}
                    contentStyle={styles.dataCell}
                  />
                </Surface>
              </Card.Content>
              <Card.Actions style={{ alignSelf: "center" }}>
                <Button onPress={() => handleShowDetails(item)}>Details</Button>
              </Card.Actions>
            </Card>
          </Surface>
          // </DataTable.Row>
        ))}
        {/* <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(props.modelsList.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${props.modelsList.length}`}
          numberOfItemsPerPageList={numItemsPerPage}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      {/* {isLargeScreen ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Model ID</DataTable.Title>
            <DataTable.Title>Model Name</DataTable.Title>
            <DataTable.Title>Created At</DataTable.Title>
            <DataTable.Title>Created On</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          {props.modelsList.slice(from, to).map((item) => (
            <DataTable.Row key={item.modelID}>
              <DataTable.Cell>{item.modelID}</DataTable.Cell>
              <DataTable.Cell>{item.modelName}</DataTable.Cell>
              <DataTable.Cell>
                {getLocaleDateTime(item.createdAt!)[0]}
              </DataTable.Cell>
              <DataTable.Cell>
                {getLocaleDateTime(item.createdAt!)[1]}
              </DataTable.Cell>
              <DataTable.Cell>
                <Card.Actions>
                  <Button onPress={() => handleShowDetails(item)}>
                    Details
                  </Button>
                </Card.Actions>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(props.modelsList.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${props.modelsList.length}`}
            numberOfItemsPerPageList={numItemsPerPage}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      ) : (
        <>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Model ID</DataTable.Title>
              <DataTable.Title>Model Name</DataTable.Title>
            </DataTable.Header>

            {props.modelsList.slice(from, to).map((item) => (
              <DataTable.Row key={item.modelID}>
                <DataTable.Cell>{item.modelID}</DataTable.Cell>
                <DataTable.Cell>{item.modelName}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Created At</DataTable.Title>
              <DataTable.Title>Created On</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>

            {props.modelsList.slice(from, to).map((item) => (
              <DataTable.Row key={item.modelID}>
                <DataTable.Cell>
                  {getLocaleDateTime(item.createdAt!)[0]}
                </DataTable.Cell>
                <DataTable.Cell>
                  {getLocaleDateTime(item.createdAt!)[1]}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Card.Actions>
                    <Button onPress={() => handleShowDetails(item)}>
                      Details
                    </Button>
                  </Card.Actions>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(props.modelsList.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${props.modelsList.length}`}
              numberOfItemsPerPageList={numItemsPerPage}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </>
      )} */}

      {/* <ScrollView>
        {props.modelsList.map((model, key) => (
          <React.Fragment key={key}>
            <Card>
              <Card.Title title={model.modelName} />
              <Card.Content>
                <Text variant="bodyMedium">{`Created at ${model.createdAt} by ${model.createdBy}`}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleShowDetails(model)}>
                  Details
                </Button>
              </Card.Actions>
            </Card>
            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </React.Fragment>
        ))}
      </ScrollView> */}
    </>
  ) : (
    <Card>
      <Card.Content>
        <Text variant="bodyMedium">No models subscribed</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
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
  },
  dataCardContent: {
    flex: 1,
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
});
