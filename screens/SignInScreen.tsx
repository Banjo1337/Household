import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { RootStackParamList } from "../NavContainer";

export default function SignInScreen(Props: NativeStackScreenProps<RootStackParamList, "SignIn">) {
    return (
        <View>
            <Title>Hello from SignInScreen</Title>
        </View>
    )
}