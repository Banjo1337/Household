import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function PendingRequestScreen(Props: NativeStackScreenProps<RootStackParamList, "PendingRequest">) {
    return (
        <View>
            <Title>Hello from PendingRequestScreen</Title>
        </View>
    )
}