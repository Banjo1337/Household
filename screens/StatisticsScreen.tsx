import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function StatisticScreen(Props: NativeStackScreenProps<RootStackParamList, "Statistics">) {
    return (
        <View>
            <Title>Hello from StatisticScreen</Title>
        </View>
    )
}