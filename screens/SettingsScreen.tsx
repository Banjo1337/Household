import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function SettingsScreen(Props: NativeStackScreenProps<RootStackParamList, "Settings">) {
    return (
        <View>
            <Title>Hello from SettingsScreen</Title>
        </View>
    )
}