import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function SignUpScreen(Props: NativeStackScreenProps<RootStackParamList, "SignUp">) {
    return (
        <View>
            <Title>Hello from SignUpScreen</Title>
        </View>
    )
}