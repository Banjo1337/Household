import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function ChoreDetailsScreen(Props: NativeStackScreenProps<RootStackParamList, "ChoreDetails">) {
    return (
        <View>
            <Title>Hello from ChoreDetailsScreen</Title>
        </View>
    )
}