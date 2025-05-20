import { Button, Modal, PaperProvider, Text } from "react-native-paper";
import React, { useState } from "react";
import { View } from "react-native";

const MyComponent = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <View>
        <Button onPress={showModal}>Show Modal</Button>
        <Modal visible={visible} onDismiss={hideModal} transparent={true}>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>This is a transparent modal.</Text>
            <Button onPress={hideModal}>Close</Button>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

export default MyComponent;
