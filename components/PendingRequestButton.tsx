import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";
interface Props {
  pendingRequestCount: number;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
export default function PendingRequestButton({ pendingRequestCount, navigation }: Props) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PendingRequest")}
      style={styles.pendingRequestContainer}
    >
      <View style={styles.pendingRequestCountBubble}>
        <Text style={styles.pendingRequestCount}>{pendingRequestCount}</Text>
      </View>
      <Text style={styles.pendingRequests}>⌛</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pendingRequests: {
    fontSize: 50,
  },
  pendingRequestContainer: {
    position: "relative",
  },
  pendingRequestCountBubble: {
    position: "absolute",
    top: -5,
    left: 45,
    backgroundColor: "#ff2b6e",
    borderRadius: 20,
    width: 22,
    height: 22,
    justifyContent: "center",
  },
  pendingRequestCount: {
    textAlign: "center",
    fontSize: 15,
    color: "#f2ebed",
    zIndex: 5,
    elevation: 5,
  },
});
