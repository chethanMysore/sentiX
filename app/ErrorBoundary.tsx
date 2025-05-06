import { Text, TouchableOpacity, View } from "@/components/Themed-Paper";
import { AppStateProps } from "@/data/PropTypes";
import { Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ErrorImage from "../assets/images/Error404.jpg";
import { clearErrors } from "@/src/actions/notification";

export default function ErrorBoundary(props: any) {
  const errorState = useSelector((state: AppStateProps) => state.notification);
  const dispatch = useDispatch();
  const handleRefresh = () => {
    dispatch(clearErrors());
  };
  return errorState.isError ? (
    <View style={styles.container}>
      <Text style={styles.title}>{`Oops! ${
        errorState.notificationMessage != ""
          ? errorState.notificationMessage
          : "Something went wrong"
      }`}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <Text>Details: {errorState.notificationMessage}</Text> */}
      <Image source={ErrorImage} style={styles.errorImage} />
      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Text style={{ color: "#fff" }}>Go Home</Text>
      </TouchableOpacity>
    </View>
  ) : (
    props.children
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorImage: {
    borderWidth: 0,
    height: "50%",
    width: "100%",
    resizeMode: "contain",
  },
  button: {
    marginVertical: 15,
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
});
