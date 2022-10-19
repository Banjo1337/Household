import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function FinalizeProfileScreen(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Props: NativeStackScreenProps<RootStackParamList, "FinalizeProfile">
) {
  return (
    <View>
      <Title>Hello from FinalizeProfileScreen</Title>
    </View>
  );
}
