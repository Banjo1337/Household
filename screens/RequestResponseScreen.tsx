import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function RequestResponseScreen(Props: NativeStackScreenProps<RootStackParamList, "RequestResponse">) {
    return (
        <View>
            <Title>Hello from RequestResponseScreen</Title>
        </View>
    )
}