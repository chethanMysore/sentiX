import React from "react";
import { ModelStateProps } from "@/data/PropTypes";
import { Card, Text, Button } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "./Themed-Paper";

export const ModelList = (props: ModelStateProps) => {
  return !!props.modelsList && props.modelsList.length > 0 ? (
    <ScrollView>
      {props.modelsList.map((model, key) => (
        <React.Fragment key={key}>
          <Card>
            <Card.Title
              title={model.modelName}
              // subtitle={`Created at ${model.createdAt} by ${model.createdBy}`}
            />
            <Card.Content>
              <Text variant="bodyMedium">{`Created at ${model.createdAt} by ${model.createdBy}`}</Text>
            </Card.Content>
            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
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
});
