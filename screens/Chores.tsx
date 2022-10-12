import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function ChoresScreen(Props: NativeStackScreenProps<RootStackParamList, "Chores">) {
    return (
        <View>
            <Title>Hello from ChoresScreen</Title>
        </View>
    )
}