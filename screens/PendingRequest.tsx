import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PendingRequestScreen(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Props: NativeStackScreenProps<RootStackParamList, "PendingRequest">,
) {
  return (
    <View>
      <Title>Hello from PendingRequestScreen</Title>
    </View>
  );
}
