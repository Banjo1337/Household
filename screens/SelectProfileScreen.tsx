import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function SelectProfileScreen(Props: NativeStackScreenProps<RootStackParamList, "SelectProfile">) {
    return (
        <View>
            <Title>Hello from SelectProfileScreen</Title>
        </View>
    )
}