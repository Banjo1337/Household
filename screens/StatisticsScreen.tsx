import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { TopTabParamsList } from "../navigation/TopTabsNavigator";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StatisticScreen(
  Props: NativeStackScreenProps<TopTabParamsList, "Statistics">
) {
  return (
    <View>
      <Title>Hello from StatisticScreen</Title>
    </View>
  );
}