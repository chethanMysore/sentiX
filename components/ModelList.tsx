import React, { useState } from "react";
import { ModelProps, ModelStateProps } from "@/data/PropTypes";
import {
  Card,
  Text,
  Button,
  Portal,
  Modal,
  DataTable,
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
      {isLargeScreen ? (
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
                  {/* <Button>Cancel</Button> */}
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
                    {/* <Button>Cancel</Button> */}
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
      )}

      <ScrollView>
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
      </ScrollView>
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
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "10%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {},
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

// import React, { useState } from "react";
// import { ModelProps, ModelStateProps } from "@/data/PropTypes";
// import { Card, Text, Button, Portal } from "react-native-paper";
// import { ScrollView, StyleSheet, Alert, Modal, Pressable } from "react-native";
// import { View } from "./Themed-Paper";
// import { ModelDetails } from "./ModelDetails";

// export const ModelList = (props: ModelStateProps) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedModel, setSelectedModel] = useState<ModelProps>({});
//   const handleShowDetails = (model: ModelProps) => {
//     setSelectedModel(model);
//     setModalVisible(true);
//   };
//   return !!props.modelsList && props.modelsList.length > 0 ? (
//     <>
//       <Portal>
//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <Pressable
//             style={styles.overlay}
//             onPress={() => setModalVisible(false)}
//           >
//             <View style={styles.overlayContent}>
//               <ModelDetails
//                 selectedModel={selectedModel}
//                 setModalVisible={setModalVisible}
//               />
//             </View>
//           </Pressable>
//         </Modal>
//       </Portal>
//       <ScrollView>
//         {props.modelsList.map((model, key) => (
//           <React.Fragment key={key}>
//             <Card>
//               <Card.Title
//                 title={model.modelName}
//                 // subtitle={`Created at ${model.createdAt} by ${model.createdBy}`}
//               />
//               <Card.Content>
//                 <Text variant="bodyMedium">{`Created at ${model.createdAt} by ${model.createdBy}`}</Text>
//               </Card.Content>
//               {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
//               <Card.Actions>
//                 {/* <Button>Cancel</Button> */}
//                 <Button onPress={() => handleShowDetails(model)}>
//                   Details
//                 </Button>
//               </Card.Actions>
//             </Card>
//             <View
//               style={styles.separator}
//               lightColor="#eee"
//               darkColor="rgba(255,255,255,0.1)"
//             />
//           </React.Fragment>
//         ))}
//       </ScrollView>
//     </>
//   ) : (
//     <Card>
//       <Card.Content>
//         <Text variant="bodyMedium">No models subscribed</Text>
//       </Card.Content>
//       <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
//       <Card.Actions>
//         <Button>Cancel</Button>
//         <Button>Ok</Button>
//       </Card.Actions>
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   separator: {
//     marginVertical: 5,
//     height: 1,
//     width: "80%",
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   overlayContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: "10%",
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     // alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalView: {},
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });
